<template lang="pug">
.c-tip(
  @mouseenter="show",
  @mouseleave="hide",
  @focus.capture="show",
  @blur.capture="hide",
  @click="show"
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
        :class="theme === 'light' && 'c-tip__container--light'"
        ref="tip",
        v-show="visible",
        @mouseenter="show",
        @mouseleave="hide"
      )
        i.c-tip__arrow(:class="arrowClass")
        div(v-if="content") {{ content }}
        slot(name="content")
</template>

<script>
import VueTypes from 'vue-types'
import throttle from 'lodash/throttle'

import './index.css'
import zIndex from '../../js/utils/zIndexManager'

const OPPOSITE_DIRECTION = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

const SHOW_MATCH_MAP = {
  hover: 'mouseenter',
  focus: 'focus',
  click: 'click'
}

const HIDE_MATCH_MAP = {
  hover: 'mouseleave',
  focus: 'blur',
  click: 'click'
}

const defaultDelayTime = 100
const defaultThrottleTime = 150

const contains = (elem, target) => !!elem && elem.contains(target)

export default {
  name: 'c-tip',
  props: {
    theme: VueTypes.oneOf(['dark', 'light']).def('dark'),
    trigger: VueTypes.oneOf(['hover', 'click', 'focus']).def('hover'),
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

  methods: {
    show ({ type }) {
      if (SHOW_MATCH_MAP[this.trigger] === type) {
        this.clearTimeout()
        this.visible = true
      }
    },

    hide ({ type = 'click' } = {}) {
      if (HIDE_MATCH_MAP[this.trigger] === type) {
        this.clearTimeout()
        this.tidOut = setTimeout(() => {
          this.visible = false
        }, this.hideDelay)
      }
    },

    resize () {
      this.handleResize(this.$refs.tip)
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

    afterEnter (el) {
      this.handleResize(el)
    },

    leave ({ style }) {
      style.opacity = 0
      style.visibility = 'hidden'
      this.clearTimeout()
    },

    afterLeave ({ style }) {
      style.cssText = ''
      style.display = 'none'
    },

    clearTimeout () {
      clearTimeout(this.tidOut)
      clearTimeout(this.tidIn)
    },

    handleResize (el) {
      if (!el || !el.style) {
        return
      }
      const { style } = el
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

    clickOutside ({ target }) {
      const el = this.$el
      const tip = this.$refs.tip
      const isOutside = !contains(el, target) && !contains(tip, target)
      if (isOutside && this.visible) {
        this.hide()
      }
    }
  },

  updated () {
    if (this.visible) {
      this.$nextTick(this.resize)
    }
  },

  mounted () {
    this.resize = this.resize.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
    this.winResize = throttle(this.resize, defaultThrottleTime)
    window.addEventListener('resize', this.winResize)
    document.body.addEventListener('click', this.clickOutside)
  },

  beforeDestroy () {
    this.clearTimeout()
    window.removeEventListener('resize', this.winResize)
    document.body.removeEventListener('click', this.clickOutside)
  }
}
</script>
