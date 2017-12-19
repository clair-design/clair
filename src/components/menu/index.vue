<template lang="pug">
.c-menu(:class="classNames")
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
    theme: String
  },
  provide () {
    return { $menu: this }
  },
  computed: {
    classNames () {
      const classNames = []
      if (this.mode) classNames.push(`c-menu--${this.mode}`)
      if (this.theme) classNames.push(`c-menu--${this.theme}`)
      return classNames
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
