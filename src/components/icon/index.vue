<template lang="pug">
  i(:class="classNames")
</template>

<script>

export default {
  name: 'c-icon',
  props: {
    type: String
  },

  data () {
    return {}
  },

  computed: {
    classNames () {
      const names = {
        fa: true
      }
      names[`fa-${this.type}`] = true
      return names
    }
  }
}
</script>
