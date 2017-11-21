<template lang="pug">
  i(
    class="c-icon",
    :class="classNames",
    :style="{ color: color, fontSize: size, verticalAlign: valign }"
  )
</template>

<script>
import './index.css'

export default {
  name: 'c-icon',
  props: {
    type: {
      type: String,
      default: 'fa'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'inherit'
    },
    size: {
      type: String,
      default: '1em'
    },
    valign: {
      type: String,
      default: 'baseline'
    }
  },

  data () {
    return {}
  },

  computed: {
    classNames () {
      const prefix = this.type !== '' ? `${this.type}-` : ''
      return `${this.type} ${prefix}${this.name}`
    }
  }
}
</script>
