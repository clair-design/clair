<template lang="pug">
c-box.toolbar(align="center")
  c-box-item.has-padding-left-md(xs=12 sm=4 md=3 lg=2)
    router-link.is-inline-block.has-padding-sm(to="/")
      img(src="/static/logo.svg" alt="clair")

  c-box-item.is-none-xs-only(xs=12 sm=7 md=8 lg=9)
    c-box.navbar
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
  c-box-item.is-text-right.is-none-xs-only(xs=12 sm=1)
    a.is-inline-block.has-margin-right-md(
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

