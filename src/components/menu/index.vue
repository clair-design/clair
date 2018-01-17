<template lang="pug">
.c-menu(:class="classNames" :style="styles")
  slot
</template>

<script>
import './index.css'

export default {
  name: 'c-menu',
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    },
    width: {
      type: String,
      default: '20em'
    },
    collapsed: Boolean,
    theme: String
  },
  provide () {
    return { $menu: this }
  },
  computed: {
    styles () {
      if (this.isVertical && !this.collapsed) {
        return {
          width: this.width
        }
      }
    },
    isVertical () {
      return this.mode === 'vertical'
    },
    classNames () {
      const classNames = []
      const { mode, theme, isVertical, collapsed } = this
      if (mode) classNames.push(`c-menu--${mode}`)
      if (theme) classNames.push(`c-menu--${theme}`)
      if (isVertical && collapsed) classNames.push('c-menu--collapsed')
      return classNames
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
