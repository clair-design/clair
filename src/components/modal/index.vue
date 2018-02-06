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

const slice = Array.prototype.slice

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
      bdOvf: '',
      bdPdr: '',
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
    noop () {},

    qsa (selectors) {
      const list = this.$refs.dom.querySelectorAll(selectors)
      return slice.call(list)
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

      if (keyCode === 9) {
        e.preventDefault()
        return this.handleTab(shiftKey)
      }

      if (closable && keyCode === 27) {
        // close modal
        return this.$emit('close')
      }
    },

    beforeEnter () {
      const hasScrollbar = document.documentElement.clientWidth < window.innerWidth
      const style = document.body.style
      this.bdOvf = style.overflow
      this.bdPdr = style.paddingRight

      if (hasScrollbar) {
        style.overflow = 'hidden'
        style.paddingRight = `${getScrollBarSize()}px`
      }
    },

    afterLeave () {
      this.reset()
      this.$emit('after-leave')
    },

    reset () {
      const style = document.body.style
      style.overflow = this.bdOvf
      style.paddingRight = this.bdPdr
    }
  },

  mounted () {
    const handleKeydown = this.handleKeydown.bind(this)
    this.handleKeydown = handleKeydown
    document.addEventListener('keydown', handleKeydown)
  },

  beforeDestroy () {
    this.reset()
    document.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>
