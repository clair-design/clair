<template lang="pug">
  .c-box(:style="style" :class="classNames")
    slot
</template>

<script>
import { multiply } from './util'
import { breakpoints } from '../../scripts/config'
import './index.css'

const props = {
  gap: String,
  justify: String,
  align: String,
  fillHeight: Boolean
}
const breakpointProps = breakpoints
  .map(bp => `${bp}Only`)
  .concat(breakpoints)
  .reduce((props, bp) => {
    props[bp] = String
    return props
  }, {})

Object.assign(props, breakpointProps)

export default {
  props,
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
