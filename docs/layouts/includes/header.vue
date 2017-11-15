<template lang="pug">
c-box.toolbar.container(gap="0" align="center")
  c-box-item(xs=12 sm=3 md=2)
    nuxt-link.logo(to="/")
      img(src="~assets/img/logo.svg" alt="clair")

  c-box-item.is-flex(xs="text-xs" md="text-normal")
    c-box.navbar.no-gap
      c-box-item(
        v-for="nav in navs",
        :key="nav.title"
        xs="12"
        sm="auto"
      )
        nuxt-link.navbar__item(
          :to="nav.link",
          :class="{'is-active': nav.isActiveReg.test($route.path)}"
        ) {{nav.title}}
  c-box-item
    a.xs-12.sm-a(href="https://github.com/clair-design/clair")
      c-icon.is-text-xl(name="github")
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

