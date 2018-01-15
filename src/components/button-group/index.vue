<template lang="pug">
  .c-button-group
    slot
</template>

<script>

export default {
  name: 'c-button-group',
  props: {
    size: String
  },
  provide () {
    return {
      '$buttonGroup': this
    }
  },

  data () {
    return {}
  },

  methods: {}
}
</script>
