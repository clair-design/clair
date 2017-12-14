<template lang="pug">
  .c-box(:style="style" :class="classNames")
    slot
</template>

<script>
import { multiply } from './util.js'

export default {
  props: {
    gap: String,
    justify: String,
    align: String,
    fillHeight: Boolean
  },
  name: 'c-box',
  computed: {
    margin () {
      return this.gap ? multiply(this.gap, -0.5) : ''
    },
    style () {
      const style = {}
      // margin for gap
      if (this.margin) {
        style.marginLeft = this.margin
        style.marginRight = this.margin
      }
      return style
    },
    classNames () {
      const classNames = []
      const { justify, align, fillHeight } = this
      if (justify) classNames.push(`is-justify-${justify}`)
      if (align) classNames.push(`is-align-${align}`)
      if (fillHeight) classNames.push(`is-fill-height`)
      return classNames
    }
  }
}
</script>
