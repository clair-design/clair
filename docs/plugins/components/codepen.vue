<template>
  <form :action="action" method="POST" target="_blank" style="display: none;">
    <input type="hidden" v-if="type !== 'codesandbox'" name="data" :value="config">
    <input type="hidden" v-else name="parameters" :value="config" />
    <input type="submit" value="submit">
  </form>
</template>

<script>
export default {
  name: 'codepen',
  props: {
    type: {
      type: String,
      default: 'codepen'
    },
    config: {
      type: String,
      required: true
    }
  },
  computed: {
    action () {
      return this.type === 'codesandbox'
        ? 'https://codesandbox.io/api/v1/sandboxes/define'
        : 'https://codepen.io/pen/define'
    }
  }
}
</script>>
