<template lang="pug">
  div.nav-bar__active(
    :style="barStyle"
    ref="bar"
  )
</template>

<script>
import { VueTypes } from '@util'
export default {
  name: 'c-tab-bar',
  inject: ['rootTabs'],
  props: {
    activeIndex: VueTypes.number.def(1),
    position: VueTypes.string.def('top')
  },
  data () {
    return {
      barWidth: 0,
      barOffset: 0,
      barHeight: 0
    }
  },
  mounted () {
    this.styleBar(this.activeIndex)
  },
  computed: {
    barStyle () {
      if (['top', 'bottom'].indexOf(this.position) >= 0) {
        return {
          width: `${this.barWidth}px`,
          transform: `translateX(${this.barOffset}px)`
        }
      }
      if (['left', 'right'].indexOf(this.position) >= 0) {
        return {
          top: 0,
          height: `${this.barHeight}px`,
          transform: `translateY(${this.barOffset}px)`
        }
      }
      return null
    }
  },

  methods: {
    styleBar (index = this.activeIndex) {
      this.resetBarStyle()
      const horizontal = this.position === 'top' || this.position === 'bottom'
      if (this.$parent.$refs && this.$parent.$refs[`tabs${this.activeIndex - 1}`]) {
        const curTab = this.$parent.$refs[`tabs${this.activeIndex - 1}`].$el
        this.barOffset = horizontal ? curTab.offsetLeft : curTab.offsetTop
        if (horizontal) {
          this.barWidth = curTab.offsetWidth
        } else {
          this.barHeight = curTab.offsetHeight
        }
      }
    },
    resetBarStyle () {
      this.barWidth = this.barHeight = this.barOffset = 0
    }
  },
  watch: {
    activeIndex (newIdx) {
      this.styleBar(newIdx)
    }
  }
}
</script>
