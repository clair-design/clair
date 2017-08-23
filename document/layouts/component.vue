<template lang="pug">
  #app
    c-header
    nuxt
</template>

<style>
@import '../assets/demo-block.css';
.markdown-body {
  max-width: 1000px;
  margin: 100px auto;
}
</style>

<script>
import header from './includes/header.vue'

export default {
  components: {
    'c-header': header
  }
}
</script>
