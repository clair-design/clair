<template lang="pug">
  #app
    header.flex.toolbar
      h1.stretch
        | Clair Design

      nav.navbar
        nuxt-link.navbar__item(
          v-for="nav in navs",
          :to="nav.link",
          :key="nav.title"
        ) {{nav.title}}
    nuxt
</template>

<style>
.markdown-body {
  max-width: 1000px;
  margin: 100px auto;
}
</style>

<script>
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-dark.css'

const navigation = [
  { title: '首页', link: '/' },
  { title: '设计原则', link: '/principle' },
  { title: '组件', link: '/component' },
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

<style>
@import "../assets/main.css";
</style>
