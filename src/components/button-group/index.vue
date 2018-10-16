<template lang="pug">
  .c-button-group(:class="className")
    slot
</template>

<script>
import './index.css'
export default {
  name: 'c-button-group',
  props: {
    size: String
  },

  data () {
    return {}
  },

  computed: {
    className () {
      const { size } = this
      return size ? `is-${size}` : ''
    }
  }
}
</script>
