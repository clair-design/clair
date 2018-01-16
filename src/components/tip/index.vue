<template lang="pug">
.c-tip(
  @mouseenter="handleIn",
  @mouseleave="handleOut"
)
  slot
  c-portal(role="tooltip", :aria-hidden="'' + visible")
    transition(
      v-if="!disabled",
      @before-enter="beforeEnter",
      @enter="enter",
      @after-enter="afterEnter",
      @leave="leave",
      @after-leave="afterLeave"
    )
      .c-tip__container(
        ref="tip",
        v-show="visible",
        @mouseenter="handleIn",
        @mouseleave="handleOut"
      )
        i.c-tip__arrow(:class="arrowClass")
        div(v-if="content") {{ content }}
        slot(name="content")
</template>

<script>
import VueTypes from 'vue-types'

import './index.css'
import zIndex from '../../js/utils/zIndexManager'

const OPPOSITE_DIRECTION = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}
const defaultDelayTime = 100

export default {
  name: 'c-tip',
  props: {
    disabled: VueTypes.bool.def(false),
    content: VueTypes.string.def(''),
    maxWidth: VueTypes.string.def('300px'),
    showDelay: VueTypes.number.def(defaultDelayTime),
    hideDelay: VueTypes.number.def(defaultDelayTime),
    position: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('bottom')
  },

  data () {
    return {
      visible: false,
      zIndex: zIndex.next(),
      tidIn: null,
      tidOut: null
    }
  },

  computed: {
    arrowClass () {
      const position = OPPOSITE_DIRECTION[this.position]
      return `c-tip__arrow--${position}`
    }
  },

  watch: {
    position () {
      if (this.visible) {
        this.$nextTick(() => this.afterEnter(this.$refs.tip))
      }
    }
  },

  methods: {
    handleIn () {
      this.clean()
      this.visible = true
    },

    handleOut () {
      this.clean()
      this.tidOut = setTimeout(() => {
        this.visible = false
      }, this.hideDelay)
    },

    beforeEnter ({ style }) {
      style.display = 'block'
      style.visibility = 'hidden'
      style.zIndex = this.zIndex
    },

    enter ({ style }, done) {
      style.opacity = 0

      this.tidIn = setTimeout(() => {
        style.maxWidth = this.maxWidth
        style.visibility = 'visible'
        style.opacity = 1
        this.$nextTick(done)
      }, this.showDelay)
    },

    afterEnter ({ style }) {
      const { scrollLeft, scrollTop } = document.documentElement
      const elRect = this.$el.getBoundingClientRect()
      const tipRect = this.$refs.tip.getBoundingClientRect()

      // eslint-disable-next-line
      switch (this.position) {
        case 'top':
          style.top = `${scrollTop + elRect.top - tipRect.height}px`
          style.left = `${scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2}px`
          style.marginTop = '-10px'
          style.marginLeft = ''
          return

        case 'bottom':
          style.top = `${scrollTop + elRect.top + elRect.height}px`
          style.left = `${scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2}px`
          style.marginTop = '10px'
          style.marginLeft = ''
          return

        case 'left':
          style.top = `${scrollTop + elRect.top - (tipRect.height - elRect.height) / 2}px`
          style.left = `${scrollLeft + elRect.left - tipRect.width}px`
          style.marginLeft = '-10px'
          style.marginTop = ''
          return

        case 'right':
          style.top = `${scrollTop + elRect.top - (tipRect.height - elRect.height) / 2}px`
          style.left = `${scrollLeft + elRect.left + elRect.width}px`
          style.marginLeft = '10px'
          style.marginTop = ''
      }
    },

    leave ({ style }) {
      style.opacity = 0
      style.visibility = 'hidden'
      this.clean()
    },

    afterLeave ({ style }) {
      style.cssText = ''
      style.display = 'none'
    },

    clean () {
      clearTimeout(this.tidOut)
      clearTimeout(this.tidIn)
    }
  },

  beforeDestroy () {
    this.clean()
  }
}
</script>
