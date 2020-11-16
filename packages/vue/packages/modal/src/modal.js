/* eslint-disable multiline-ternary */
import { AutoIncreasingCounter, isNumber, modalService } from '@clair/helpers'
import { createPortal, destroyPortal } from 'src/utils'
import { IconClose, IconStatus } from 'packages/icon'
import { ConfirmButton } from './confirmButton'
import { CancelButton } from './cancelButton'

export const modalTypes = ['success', 'warning', 'error', 'info']

export let modalStack = []

const toCSSLengthValue = function (val, unit = 'px') {
  if (isNumber(val)) {
    return `${val}${unit}`
  }
  return val
}

/** helps to identify each modal instance */
const counter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CModal',

  model: {
    prop: 'visible',
    event: 'update:visible'
  },

  provide() {
    return {
      $modal: this
    }
  },

  props: {
    // 控制显示隐藏
    visible: {
      type: Boolean,
      default: false
    },

    // 是否可以通过点击遮罩层关闭模态框
    maskClosable: {
      type: Boolean,
      default: true
    },

    // 关闭后是否销毁实例
    destroyAfterClose: {
      type: Boolean,
      default: false
    },

    /** 位置相关 */
    // 顶部距离
    top: {
      type: [String, Number],
      default: '15%'
    },

    // 内容宽度
    width: {
      type: [String, Number],
      default: '50%'
    },

    // 是否居中
    center: {
      type: Boolean,
      default: false
    },

    // 标题可以通过文本传递
    // 也可以通过 `v-slot:header` 传递
    title: {
      type: String,
      default: ''
    },

    content: {
      // here `Object` refers to VNode
      type: [String, Object],
      default: ''
    },

    light: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      validator(val) {
        return modalTypes.includes(val)
      }
    },

    customClass: [String, Array, Object],

    customStyle: [String, Array, Object]
  },

  data() {
    return {
      disappeared: true,
      uid: counter.next(),
      focusedBeforeVisible: null,
      confirmButtonInstance: null
    }
  },

  computed: {
    contentStyle() {
      const width = toCSSLengthValue(this.width, 'px')

      if (!this.center) {
        return {
          width,
          top: toCSSLengthValue(this.top, 'px')
        }
      }

      return {
        width,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    },

    shouldDestroy() {
      const { visible, disappeared, destroyAfterClose } = this
      return destroyAfterClose && !visible && disappeared
    },

    listeners() {
      return {
        beforeEnter: this.onBeforeEnter,
        afterEnter: this.onAfterEnter,
        beforeLeave: this.onBeforeLeave,
        afterLeave: this.onAfterLeave
      }
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          modalStack.push(this)
        } else {
          modalStack = modalStack.filter(modal => modal !== this)
        }
      }
    },
    shouldDestroy(value) {
      if (value) this.$destroy()
    }
  },

  mounted() {
    document.addEventListener('keydown', this.keydownHandler)
  },

  beforeDestroy() {
    // destroyed by cases like diffing or navigation
    if (this.visible) {
      modalService.onLeave(this.$refs.modalWrapper)
      modalService.onAfterLeave()
    }
    document.removeEventListener('keydown', this.keydownHandler)
    modalStack = modalStack.filter(modal => modal !== this)
    destroyPortal(this)
  },

  methods: {
    cancel(e, detail) {
      this.$emit('cancel', { detail, nativeEvent: e })
      this.$emit('update:visible', false)
    },

    confirm(e) {
      this.$emit('confirm', { nativeEvent: e })
      this.$emit('update:visible', false)
    },

    onConfirm(e) {
      this.confirm(e)
    },

    onCancel(e) {
      this.cancel(e, { sourceType: 'cancel' })
    },

    onClose(e) {
      this.cancel(e, { sourceType: 'close' })
    },

    onMaskClick(e) {
      // `@click.self`
      if (e.target === e.currentTarget) {
        if (this.maskClosable) {
          this.cancel(e, { sourceType: 'mask' })
        }
      }
    },

    onBeforeEnter() {
      this.$emit('before-enter')
      this.disappeared = false

      modalService.onEnter(this.$refs.modalWrapper)
    },

    onAfterEnter() {
      this.$emit('after-enter')
      this.focusedBeforeVisible = document.activeElement
      this.$nextTick(() => {
        const elems = this.getFocusableElems()
        const focusElem = this.confirmButtonInstance?.$el || elems?.[0]
        // do not scroll into viewport
        // which would cause confusion
        focusElem?.focus({
          preventScroll: true
        })
      })
    },

    onBeforeLeave() {
      this.$emit('before-leave')
      modalService.onLeave(this.$refs.modalWrapper)
    },

    onAfterLeave() {
      this.$emit('close')
      this.disappeared = true
      modalService.onAfterLeave()
      this.focusedBeforeVisible && this.focusedBeforeVisible.focus()
    },

    keydownHandler(e) {
      if (this.disappeared || !e) return

      const topModal = modalStack[modalStack.length - 1]

      if (topModal !== this) return

      const { code } = e

      if (code === 'Escape') {
        this.cancel(e, { sourceType: 'esc' })
      }

      if (code === 'Tab') {
        e.preventDefault()
        this.tabHandler(e.shiftKey)
      }
    },

    setConfirmButtonInstance(vm) {
      this.confirmButtonInstance = vm
    },

    getFocusableElems() {
      const selectors = `input, button, textarea, select, a[href], [tabindex]`
      return (
        this.qsa(selectors)
          .filter(el => !el.disabled && el.type !== 'hidden')
          // this line makes it hard to test with jsdom
          .filter(el => el.offsetWidth > 0 && el.offsetHeight > 0)
      )
    },

    qsa(selectors) {
      const list = this.$refs.modalWrapper.querySelectorAll(selectors)
      return Array.from(list)
    },

    tabHandler(shiftKey) {
      const elems = this.getFocusableElems()
      let nextFocusIndex = elems.length - 1
      const direction = shiftKey ? -1 : 1
      const activeElem = document.activeElement
      if (activeElem) {
        const index = elems.indexOf(activeElem)

        if (index > -1) {
          const next = index + direction
          if (next > -1) {
            nextFocusIndex = next % elems.length
          }
        }
      }

      const nextElem = elems[nextFocusIndex]
      nextElem && nextElem.focus()
    },

    titleSlot() {
      return this.$scopedSlots.title?.(this) ?? this.title
    },

    contentSlot() {
      return this.$scopedSlots.default?.(this) ?? this.content
    },

    footerSlot() {
      if (this.$scopedSlots.footer) {
        return this.renderFooterSlot()
      }
      return this.renderDefaultFooter()
    },

    renderFooterSlot() {
      const option = {
        ...this,
        confirm: ConfirmButton,
        cancel: CancelButton
      }
      return this.$scopedSlots.footer(option)
    },

    renderDefaultFooter() {
      return [<CancelButton />, <ConfirmButton />]
    },

    renderModal() {
      const { uid, light, type, customClass, customStyle } = this
      const modalID = `c-modal-${uid}`
      const headerID = `c-modal-header-${uid}`
      const contentID = `c-modal-content-${uid}`
      const classes = ['c-modal', light ? 'c-modal--light' : null, customClass]

      const header = (
        <div class="c-modal__header" id={headerID}>
          {type ? (
            <IconStatus
              type={type}
              class={`c-modal__title-type c-icon--${this.type}`}
            />
          ) : null}
          {this.titleSlot()}
          {light ? null : (
            <button class="c-modal__closeBtn" onClick={this.onClose}>
              <IconClose class="c-icon--close" />
            </button>
          )}
        </div>
      )
      const content = (
        <div class="c-modal__body" id={contentID}>
          {this.contentSlot()}
        </div>
      )
      const footer = <div class="c-modal__footer">{this.footerSlot()}</div>

      const modalBody = (
        <div
          style={[this.contentStyle, ...[].concat(customStyle)]}
          class={classes}
          ref="modalBody"
        >
          {header}
          {content}
          {footer}
        </div>
      )

      return (
        <transition appear name="c-modal" on={this.listeners}>
          <div
            class="c-modal__container"
            ref="modalWrapper"
            v-show={this.visible}
            onmousedown={this.onMaskClick}
            role="dialog"
            id={modalID}
            aria-labelledby={headerID}
            aria-describedby={contentID}
            aria-modal="true"
          >
            {modalBody}
          </div>
        </transition>
      )
    }
  },

  render(h) {
    return createPortal(this.renderModal, this)
  }
}
