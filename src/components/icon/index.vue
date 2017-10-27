<template lang="pug">
  i(class="c-icon" :class="classNames")
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
    }
  },

  data () {
    return {}
  },

  computed: {
    classNames () {
      return `${this.type} fa-${this.name}`
    }
  }
}
</script>
