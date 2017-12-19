<template lang="pug">
  .c-toolbar(
    :style="style"
    :class="{'is-primary': primary}"
  )
    slot
</template>

<script>
  import './index.css'

  export default {
    props: {
      height: String,
      background: String,
      color: String,
      primary: Boolean
    },
    computed: {
      style () {
        const style = {}
        const { height, background, color } = this
        if (height) style.lineHeight = height
        if (background) style.background = background
        if (color) style.color = color
        return style
      }
    },
    name: 'c-toolbar'
  }
</script>
