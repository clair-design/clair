<template lang="pug">
header.c-row.toolbar
  h1.c-col.c-col-2
    a.logo(href="/")
      img(src="~assets/img/logo.svg" alt="clair")

  nav.navbar.c-flex
    nuxt-link.navbar__item(
      v-for="nav in navs",
      :to="nav.link",
      :key="nav.title"
    ) {{nav.title}}
  a(href="https://github.com/clair-design/clair")
    c-icon.large(type="github")
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
