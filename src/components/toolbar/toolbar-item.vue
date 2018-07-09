<template lang="pug">
  .c-toolbar__item(:class="{'is-flex': flex}")
    slot
</template>

<script>
export default {
  props: {
    flex: Boolean
  },
  name: 'c-toolbar-item'
}
</script>
