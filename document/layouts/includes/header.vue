<template lang="pug">
header.c-row.toolbar
  h1.c-flex
    | Clair Design

  nav.navbar
    nuxt-link.navbar__item(
      v-for="nav in navs",
      :to="nav.link",
      :key="nav.title"
    ) {{nav.title}}
</template>

<script>
const navigation = [
  { title: '首页', link: '/' },
  { title: '设计原则', link: '/principle/introduction' },
  { title: '组件', link: '/component/install' },
  { title: '资源', link: '/resource' }
]
export default {
  data () {
    return {
      navs: navigation
    }
  }
}
</script>
