<template lang="pug">
c-box.toolbar.c-container.no-gap(align="center")
  c-box-item(xs=12 sm=3 md=2)
    router-link.logo(to="/")
      img(src="/static/logo.svg" alt="clair")

  c-box-item(xs=12 sm=8 md=9)
    c-box.navbar.no-gap
      c-box-item(
        v-for="nav in navs",
        :key="nav.title"
        xs="12"
        sm="auto"
      )
        router-link.navbar__item(
          :to="nav.link",
          :class="{'is-active': nav.isActiveReg.test($route.path)}"
        ) {{nav.title}}
  c-box-item.is-text-right(xs="12" sm="1")
    a.xs-12.sm-a(
      href="https://github.com/clair-design/clair"
      aria-label="github repository"
      target="_blank"
    )
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

