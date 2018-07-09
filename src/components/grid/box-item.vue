<template lang="pug">
  .c-box__item(:class="classNames" :style="style")
    slot
</template>

<script>
import { multiply } from './util'
import { breakpoints } from '../../scripts/config'

const props = breakpoints
  .map(bp => `${bp}-only`)
  .concat(breakpoints)
  .concat(['order', 'span', 'offset', 'width', 'narrow'])

const getClassName = (values, media) => {
  if (!values) return []
  return values.split(/\s+/)
    .map(val => {
      const prefix = /^offset/.test(val) ? 'has' : 'is'
      return `${prefix}-${val}-${media}`
    })
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
     * set box item gap
     */
    style () {
      const style = {}
      if (this.$parent.gap) {
        style.padding = multiply(this.$parent.gap, 0.5)
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
