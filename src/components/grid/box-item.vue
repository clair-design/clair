<template lang="pug">
  .c-box__item(:class="classNames" :style="style")
    slot
</template>

<script>
import { multiply } from './util.js'
import { breakpoints } from '../../js/config.js'

const props = breakpoints
  .map(bp => `${bp}-only`)
  .concat(breakpoints)
  .concat(['order', 'span', 'offset', 'width', 'narrow'])

const getClassName = (values, media) => {
  if (!values) return []
  return values.split(/\s+/)
    .map(val => `${media}-${val}`)
}

export default {
  name: 'c-box-item',
  props,
  computed: {

    /**
     * get class name list of the box item
     */
    classNames () {
      const classNames = breakpoints
        .reduce((classNames, bp) => {
          classNames.push(...getClassName(this[bp], bp))
          classNames.push(...getClassName(this[`${bp}Only`], `${bp}-only`))
          return classNames
        }, [])
      if (this.span) classNames.push(`is-${this.span}`)
      if (this.offset) classNames.push(`is-offset-${this.offset}`)
      if (this.width || this.narrow !== void 0) classNames.push(`is-narrow`)
      return classNames
    },

    /**
     * set gap of parent
     */
    padding () {
      return this.$parent.gap ? multiply(this.$parent.gap, 0.5) : ''
    },

    /**
     * set box item gap
     */
    style () {
      const style = {}
      if (this.padding) {
        style.paddingLeft = this.padding
        style.paddingRight = this.padding
      }
      if (this.order) {
        style.order = this.order
      }
      if (this.width) {
        style.width = this.width
      }
      return style
    }

  },
  methods: {
  }
}
</script>
