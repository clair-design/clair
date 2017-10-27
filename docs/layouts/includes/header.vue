<template lang="pug">
header.c-row.toolbar
  h1.c-col.c-col-2
    nuxt-link.logo(to="/")
      img(src="~assets/img/logo.svg" alt="clair")

  nav.navbar.c-flex
    nuxt-link.navbar__item(
      v-for="nav in navs",
      :to="nav.link",
      :key="nav.title"
      :class="{'is-active': nav.isActiveReg.test($route.path)}"
    ) {{nav.title}}
  a(href="https://github.com/clair-design/clair")
    c-icon.large(type="github")
</template>

<script>
const navigation = [
  { title: '首页', link: '/', isActiveReg: /^\/$/ },
  { title: '设计原则', link: '/principle/introduction', isActiveReg: /^\/principle/ },
  { title: '组件', link: '/component/install', isActiveReg: /^\/component/ },
  { title: '资源', link: '/resource', isActiveReg: /^\/resource/ }
]
export default {
  data () {
    return {
      navs: navigation
    }
  }
}
</script>
