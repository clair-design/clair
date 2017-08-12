<template lang="pug">
  .hero
    .content-wrap
      h1.x-large Clair Design
      p 一套包含设计规范、Vue 组件和配套资源的设计系统。
      c-button(@click="click") foo-xxx
</template>

<script>
  export default {
    head () {
      return {
        title: '组件'
      }
    },
    methods: {
      click () {
        document.title = 222
      }
    }
  }
</script>
