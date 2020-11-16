import { throttle } from 'lodash-es'
import { createPortal, destroyPortal } from 'src/utils/createPortal'
import {
  AutoIncreasingCounter,
  calcPopoverPosition,
  zIndexManager
} from '@clair/helpers'
import { props } from './props'
import { __TEST__ } from 'src/utils/constant'
const CodeMap = {
  esc: 'Escape',
  tab: 'Tab'
}
const waitTime = 200
const idGen = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CPopover',
  model: {
    prop: 'visible',
    event: 'update:visible'
  },
  inheritAttrs: false,
  props,

  data() {
    return {
      zIndex: -1,
      timers: [],
      isVisible: Boolean(this.visible),
      ownId: `c-popover-${idGen.next()}`,
      mainDirection: '',
      secondaryDirection: '',
      resizeObserver: null
    }
  },

  computed: {
    uid() {
      return this.$attrs.id ?? this.ownId
    },
    triggerTypes() {
      return [].concat(this.trigger)
    },
    isManual() {
      return (
        this.triggerTypes.length === 0 ||
        this.triggerTypes.some(item => item === 'none')
      )
    },
    isSelfControlled() {
      return typeof this.visible !== 'boolean'
    },
    eventsToShow() {
      if (this.isManual) return []
      return this.triggerTypes.map(t => {
        if (t === 'hover') {
          return 'mouseenter'
        }
        return t
      })
    },
    eventsToHide() {
      if (this.isManual) return []
      return this.triggerTypes
        .map(t => {
          switch (t) {
            case 'hover':
              return 'mouseleave'
            case 'focus':
              return 'blur'
            case 'click':
              return false
            default:
              return false
          }
        })
        .filter(Boolean)
    },
    eventsToBind() {
      const hide = this.hidePopover
      const show = this.showPopover
      const events = []
      this.eventsToShow.forEach(event => {
        events.push([event, show, event === 'focus'])
      })
      this.eventsToHide.forEach(event => {
        events.push([event, hide, event === 'blur'])
      })
      return events
    },
    hidePopoverWhenLeave() {
      if (this.isManual) return false
      return this.triggerTypes.some(item => item === 'hover')
    },
    updatePosThrottle() {
      return throttle(this.handleUpdatePosition, waitTime)
    },
    isFocusATrigger() {
      return [].concat(this.trigger).includes('focus')
    },
    panelAttrs() {
      // make sure panel can receive focus so that user can
      // click or select text on panel
      return {
        tabindex: this.isFocusATrigger ? '-1' : null
      }
    },
    $panelListeners() {
      const {
        hidePopoverWhenLeave,
        showPopover,
        hidePopover,
        isFocusATrigger
      } = this
      // expose all event listeners
      let extra = {}
      if (hidePopoverWhenLeave) {
        extra = {
          mouseenter: e => {
            this.$listeners.mouseenter?.(e)
            showPopover(e)
          },
          mouseleave: e => {
            this.$listeners.mouseleave?.(e)
            hidePopover(e)
          }
        }
      }
      if (isFocusATrigger) {
        extra = {
          ...extra,
          [`!focus`]: e => {
            this.$listeners[`!focus`]?.(e)
            showPopover(e)
          },
          [`!blur`]: e => {
            this.$listeners[`!blur`]?.(e)
            hidePopover(e)
          }
        }
      }
      return {
        ...this.$listeners,
        ...extra
      }
    },
    // make sure all test cases still work after switching to mousedown
    clickOutsideEvent() {
      return __TEST__ ? 'click' : 'mousedown'
    }
  },

  watch: {
    visible: {
      handler(visible) {
        this.isVisible = Boolean(visible)
      }
    },
    isVisible: {
      immediate: true,
      handler(visible) {
        if (visible) {
          this.zIndex = zIndexManager.next()
          this.$nextTick(this.handleUpdatePosition)
        }
        this.handleGlobalEvents(visible)
      }
    },
    trigger: {
      handler() {
        // 每次trigger发生变化，无法得知之前绑定的是什么事件，把所有事件全部解绑一遍。
        this.unbindListeners()
        this.$nextTick(this.bindListeners)
      }
    },
    appendTarget(val, oldVal) {
      const observer = this.createObserver()
      if (oldVal) {
        observer?.unobserve(oldVal)
      }
      if (this.isAppendTargetBody()) {
        return
      }
      observer?.observe(val)
    }
  },

  mounted() {
    // 目前没有实现directive，简单要求必须传入默认slot，且必须为元素类型。
    if (!this.$scopedSlots.default || this.$el.nodeType !== Node.ELEMENT_NODE) {
      return
    }
    this.setAriaAttrs()
    this.bindListeners()
    this.assignDirections()
    this.$nextTick(this.handleResize)
  },

  beforeDestroy() {
    this.unbindListeners()
    this.handleGlobalEvents(false)
    this.disconnectObserver()
  },

  destroyed() {
    destroyPortal(this)
  },

  updated() {
    if (this.$refs.content) {
      this.$nextTick(this.handleUpdatePosition)
    }
  },

  methods: {
    renderPopover() {
      const {
        isVisible,
        zIndex,
        customStyle,
        handleAfterEnter,
        handleAfterLeave
      } = this
      const style = { zIndex, ...customStyle }
      const content = (
        <div
          ref="content"
          v-show={isVisible}
          class={[
            'c-popover',
            this.customClass,
            this.showTriangle ? '' : 'c-popover--no-triangle'
          ]}
          style={style}
          attrs={Object.assign({}, this.panelAttrs, this.$attrs)}
          x-placement={`${this.mainDirection}-${this.secondaryDirection}`}
          id={this.uid}
          role={this.$attrs.role ?? 'tooltip'}
          aria-hidden={String(!isVisible)}
          on={this.$panelListeners}
        >
          <div class="c-popover__container">
            {this.$scopedSlots.content?.() ?? this.content}
          </div>
        </div>
      )
      if (this.transition !== 'none') {
        return (
          <transition
            name={this.transition}
            onAfterLeave={handleAfterLeave}
            onAfterEnter={handleAfterEnter}
          >
            {content}
          </transition>
        )
      }
      return content
    },
    handleUpdatePosition() {
      if (!this.isVisible) return
      const { top, left, direction } = calcPopoverPosition(
        this.$el,
        this.$refs.content,
        this.placement
      )
      this.mainDirection = direction
      Object.assign(this.$refs.content.style, {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`
      })
    },
    updatePosWithRaf() {
      requestAnimationFrame(this.handleUpdatePosition)
    },
    updatePosition(e) {
      const { target, type } = e
      if (type !== 'scroll') {
        return this.updatePosThrottle()
      }

      const isGlobalScrolling = target === document
      if (isGlobalScrolling) {
        return this.updatePosThrottle()
      }

      // caveat, or to say a choice
      // scrolling in non-container & non-window won't trigger positioning
      // since it *should* be unnecessary
      const isTargetContainer = target.contains(this.$refs.content)
      if (isTargetContainer) {
        this.updatePosWithRaf()
      }
    },
    clearTimers() {
      this.timers.forEach(t => clearTimeout(t))
      this.timers = []
    },
    updateVisibility(visibility) {
      if (this.isSelfControlled) {
        this.isVisible = visibility
      }
      this.$emit('update:visible', visibility)
      this.$emit('visibility-change', { detail: { visible: visibility } })
    },
    showPopover(e) {
      this.clearTimers()
      if (!this.isVisible) {
        this.timers.push(
          setTimeout(() => this.updateVisibility(true), this.showDelay)
        )
      } else if (e.type === 'click' && this.clickToggle) {
        // click toggle效果。展示状态的click事件，且clickToggle为true，将popover隐藏。
        this.hidePopover()
      }
    },
    hidePopover() {
      this.clearTimers()
      if (this.isVisible) {
        this.timers.push(
          setTimeout(() => this.updateVisibility(false), this.hideDelay)
        )
      }
    },
    handleKeydown(e) {
      if (e.code === CodeMap.esc || e.code === CodeMap.tab) {
        this.hidePopover()
        e.target.blur()
      }
    },
    createObserver() {
      if (this.resizeObserver) {
        return this.resizeObserver
      }
      if (!window || !window.ResizeObserver) {
        return null
      }
      this.resizeObserver = new ResizeObserver(this.handleUpdatePosition)
      return this.resizeObserver
    },
    handleResize() {
      this.getObserverTargets()
        .filter(Boolean)
        .forEach(target => this.createObserver()?.observe(target))
    },
    isAppendTargetBody() {
      return [null, document.body].some(target => target === this.appendTarget)
    },
    getObserverTargets() {
      const targets = [this.$refs.content, this.$el]
      // for `appendTarget` equals to document.body
      // delegate observation to `resize` event
      if (!this.isAppendTargetBody()) {
        targets.push(this.appendTarget)
      }
      return targets
    },
    disconnectObserver() {
      this.resizeObserver?.disconnect()
    },
    bindListeners() {
      this.eventsToBind.forEach(([event, handler, capture]) => {
        this.$el.addEventListener(event, handler, capture)
      })
      if (!this.isManual) {
        this.$el.addEventListener('keydown', this.handleKeydown)
      }
    },
    unbindListeners() {
      if (this.$el) {
        const hide = this.hidePopover
        const show = this.showPopover
        const fullEvents = [
          ['mouseenter', show],
          ['mouseleave', hide],
          ['focus', show, true],
          ['blur', hide, true],
          ['click', show]
        ]
        fullEvents.forEach(([event, handler, useCapture = false]) => {
          this.$el.removeEventListener(event, handler, useCapture)
        })
        this.$el.removeEventListener('keydown', this.handleKeydown)
      }
    },
    handleClickOutside(e) {
      if (
        this.$el.contains(e.target) ||
        this.$refs.content.contains(e.target)
      ) {
        return
      }
      this.hidePopover(e)
    },
    handleGlobalEvents(bind = false) {
      if (this.$isServer) return
      const update = this.updatePosition
      if (bind) {
        window.addEventListener('scroll', update, {
          capture: true,
          passive: true
        })
        window.addEventListener('resize', update)
        if (!this.isManual) {
          // About why not using click event:
          // For some webkit UA, like Safari,
          // when user click on the panel, and the panel size get updated,
          // observer callback would execute before the click callback,
          // which cause updating panel's position (sync update).
          // When click finish, the EventTarget of click callback
          // may change since the cursor is no longer pointing at the panel.
          // |---|
          // | . |
          // |---|
          // ->
          //  .
          // |---|
          // |---|
          // Use mousedown and capture here
          // to ensure event callback get executed first
          // so that the EventTarget would stay within the panel.
          window.addEventListener(
            this.clickOutsideEvent,
            this.handleClickOutside,
            true
          )
        }
      } else {
        window.removeEventListener('scroll', update, {
          capture: true,
          passive: true
        })
        window.removeEventListener('resize', update)
        window.removeEventListener(
          this.clickOutsideEvent,
          this.handleClickOutside,
          true
        )
      }
    },
    handleAfterEnter() {
      this.$emit('after-enter')
    },
    handleAfterLeave() {
      this.$emit('after-leave')
    },
    setAriaAttrs() {
      const {
        $attrs: { role = 'tooltip' }
      } = this
      if (role === 'tooltip') {
        this.$el.setAttribute('aria-describedby', this.uid)
      } else {
        this.$el.setAttribute('aria-owns', this.uid)
        this.$el.setAttribute('aria-haspopup', role)
      }
    },
    assignDirections() {
      ;[
        this.mainDirection,
        this.secondaryDirection = 'center'
      ] = this.placement.split('-')
    }
  },

  render() {
    if (!this.$scopedSlots.default) return null
    createPortal(this.renderPopover, this, this.appendTarget)
    const children = this.$scopedSlots.default()
    if (children.length === 1) {
      // 对文本节点进行处理
      const [$el] = children
      if (!$el.tag) return <span>{$el}</span>
      return $el
    }
    return <span style={{ display: 'inline-block' }}>{children}</span>
  }
}
