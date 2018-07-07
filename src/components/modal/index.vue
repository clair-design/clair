<template lang="pug">
c-portal(:aria-hidden="'' + !visible")
  transition(
    appear,
    name="modal",
    mode="out-in",
    @before-enter="beforeEnter",
    @after-leave="afterLeave"
  )
    .c-modal(
      ref="dom"
      :style="{ zIndex: zIndex }"
      v-show="visible",
      @click.self="maskClosable ? $emit('close') : noop()"
    )
      .c-modal__wrapper(:style="styleObj")
        .c-modal__header
          c-button.c-modal__close(
            v-if="closable"
            @click="$emit('close')"
            icon="x"
            flat
          )
          slot(name="header")
            div {{title}}
        .c-modal__body
          slot
            div
        .c-modal__footer
          slot(name="footer")
            c-button(outline, @click="$emit('cancel')") 取消
            c-button(primary, @click="$emit('confirm')") 确认
</template>

<script>
import './index.css'
import { getScrollBarSize } from '../../js/utils'
import zIndex from '../../js/utils/zIndexManager'

let uid = 0
const overflowController = {
  map: {},
  modalCount: 0,
  oldOverflow: '',
  oldPaddingRight: '',

  start (uid) {
    this.map[uid] = 1

    this.modalCount += 1

    if (this.modalCount !== 1) {
      return
    }

    const hasScrollbar = document.documentElement.clientWidth < window.innerWidth
    const { style } = document.body

    this.oldOverflow = style.overflow
    this.oldPaddingRight = style.paddingRight

    if (hasScrollbar) {
      style.paddingRight = `${getScrollBarSize()}px`
    }

    // always make `body` hidden
    // when modal shown
    style.overflow = 'hidden'
  },

  reset (uid) {
    if (this.map[uid] !== 1) {
      return
    }

    this.map[uid] = 0
    this.modalCount -= 1

    if (this.modalCount !== 0) {
      return
    }

    const { style } = document.body
    style.overflow = this.oldOverflow
    style.paddingRight = this.oldPaddingRight
    this.isHidden = false
  }
}

export default {
  name: 'c-modal',
  props: {
    visible: Boolean,
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    title: String,
    top: [String, Number],
    width: [String, Number],
    center: Boolean
  },

  data () {
    return {
      uid: uid++,
      zIndex: zIndex.next()
    }
  },

  computed: {
    styleObj () {
      let { top, width } = this
      top = typeof top === 'number' ? `${top}px` : top
      width = typeof width === 'number' ? `${width}px` : width

      if (!this.center) {
        return { top, width }
      }

      return {
        width,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }
  },

  methods: {
    qsa (selectors) {
      const list = this.$refs.dom.querySelectorAll(selectors)
      return Array.prototype.slice.call(list)
    },

    handleTab (shiftKey) {
      const selectors = `input, button, textarea, select, a[href]`
      const elems = this.qsa(selectors)
        .filter(el =>
          !el.disabled && el.type !== 'hidden'
        ).filter(el =>
          el.offsetWidth > 0 && el.offsetHeight > 0
        )

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

    handleKeydown (e) {
      const { visible, closable } = this

      if (visible === false) {
        return
      }

      const { keyCode, shiftKey } = e

      // Tab or Shift+Tab
      if (keyCode === 9) {
        e.preventDefault()
        return this.handleTab(shiftKey)
      }

      // ESC
      if (closable && keyCode === 27) {
        // close modal
        return this.$emit('close')
      }
    },

    beforeEnter () {
      overflowController.start(this.uid)
    },

    afterLeave () {
      overflowController.reset(this.uid)

      // why?
      this.$emit('after-leave')
    }
  },

  mounted () {
    this.handleKeydown = this.handleKeydown.bind(this)
    document.addEventListener('keydown', this.handleKeydown)
  },

  beforeDestroy () {
    overflowController.reset(this.uid)
    document.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>
