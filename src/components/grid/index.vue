<template lang="pug">
  .c-box(:style="style" :class="classNames")
    slot
</template>

<script>
import { multiply } from './util.js'
import { breakpoints } from '../../js/config'
import './index.css'

const breakpointProps = breakpoints
  .map(bp => `${bp}Only`)
  .concat(breakpoints)
  .reduce((props, bp) => {
    props[bp] = String
    return props
  }, {})

export default {
  props: {
    gap: String,
    justify: String,
    align: String,
    fillHeight: Boolean,
    ...breakpointProps
  },
  name: 'c-box',
  computed: {
    style () {
      const margin = this.gap ? multiply(this.gap, -0.5) : ''
      return { margin }
    },
    classNames () {
      const classNames = []
      const { justify, align, fillHeight } = this
      breakpoints.forEach(bp => {
        if (this[bp]) classNames.push(`has-${this[bp]}-${bp}`)
        const prop = `${bp}Only`
        if (this[prop]) classNames.push(`has-${this[prop]}-${bp}-only`)
      })
      if (justify) classNames.push(`is-justify-${justify}`)
      if (align) classNames.push(`is-align-${align}`)
      if (fillHeight) classNames.push(`is-fill-height`)
      return classNames
    }
  }
}
</script>
