<template lang="pug">
  color-picker(
    :color="value"
    @change="handleChange"
    v-if="inline"
  )
  .color-picker__wrapper(v-else)
    c-portal
      transition(
        @before-enter="beforeEnter",
        @enter="enter",
        @after-enter="afterEnter",
        @leave="leave",
        @after-leave="afterLeave"
      )
        color-picker(
          ref="panel",
          v-show="panelVisible",
          :color="value"
          @change="handleChange"
          class="color-picker__pane--portal"
        )
    .color-picker__trigger(
      ref="trigger"
      :style="triggerStyle"
      @click="showColorPane"
    )
</template>

<script>
import VueTypes from 'vue-types'
import throttle from 'lodash/throttle'
import ColorPicker from 'v-color'

import { contains } from '../../scripts/utils/index'
import zIndex from '../../scripts/utils/zIndexManager'
import resettable from '../../scripts/mixins/resettable'

import './index.css'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const sizeMap = {
  'xs': 12,
  'sm': 18,
  'md': 24,
  'lg': 28,
  'xl': 36
}

export default {
  name: 'c-color-picker',
  props: {
    value: VueTypes.string.def('#ff0000'),
    mode: VueTypes.oneOf([
      'rgb',
      'hsl',
      'hex'
    ]).def('hex'),
    inline: VueTypes.bool.def(false),
    size: VueTypes.oneOf(sizes)
  },
  inject: {
    $form: { default: null }
  },
  mixins: [resettable],
  model: {
    event: 'change'
  },

  components: {
    'color-picker': ColorPicker
  },

  data () {
    return {
      color: this.value,
      rgba: [],
      panelVisible: false,
      tidIn: null,
      tidOut: null
    }
  },

  computed: {
    triggerStyle () {
      const { size, $form, literal, borderColor } = this
      const sz = size || ($form && $form.size) || 'md'
      const s = `${sizeMap[sz]}px`

      return {
        width: s,
        height: s,
        backgroundColor: literal,
        borderColor
      }
    },
    borderColor () {
      const [r, g, b] = this.rgba
      if ((r + g + b) / 3 > 235) {
        return `rgba(160,160,160,0.8)`
      }
      return 'transparent'
    }
  },

  watch: {
    mode (newVal) {
      if (this.__val) {
        this.handleChange(this.__val)
      }
    }
  },

  methods: {
    handleChange (e) {
      const { rgba, hex, hsla } = e
      const { mode } = this
      let val = ''

      if (mode === 'hex') {
        val = hex
      } else if (mode === 'hsl') {
        val = `hsla(${hsla.join(', ')})`
      } else {
        val = `rgba(${rgba.join(', ')})`
      }

      this.__val = e
      this.rgba = rgba
      this.literal = val
      this.$emit('change', val)
    },

    showColorPane () {
      this.clearTimeout()
      this.panelVisible = true
    },

    hideColorPane () {
      this.clearTimeout()
      this.tidOut = setTimeout(() => {
        this.panelVisible = false
      }, 100)
    },

    resize () {
      if (this.inline === false) {
        this.handleResize(this.$refs.panel.$el)
      }
    },

    beforeEnter ({ style }) {
      style.display = 'block'
      style.visibility = 'hidden'
      style.zIndex = zIndex.next()
    },

    enter ({ style }, done) {
      style.opacity = 0

      this.tidIn = setTimeout(() => {
        style.visibility = 'visible'
        style.opacity = 1
        this.$nextTick(done)
      }, 100)
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
      const { style } = el
      const { scrollLeft, scrollTop } = document.scrollingElement || document.body

      const { trigger } = this.$refs
      const triggerRect = trigger.getBoundingClientRect()

      const left = scrollLeft + triggerRect.left -
        triggerRect.width / 2
      const top = scrollTop + triggerRect.top + triggerRect.height

      style.position = 'absolute'
      style.marginTop = '6px'
      style.top = `${top}px`
      style.left = `${left}px`
    },

    clickOutside ({ target }) {
      if (this.inline || !this.panelVisible) {
        return
      }

      const { trigger, panel } = this.$refs
      const isOutside = !contains(trigger, target) &&
        !contains(panel.$el, target)

      if (isOutside) {
        this.hideColorPane()
      }
    }
  },

  mounted () {
    this.resize = this.resize.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime)
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
