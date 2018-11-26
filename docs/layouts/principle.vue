<template lang="pug">
  #app
    c-header
    c-box.main
      c-box-item.sidebar(xs=12 sm=4 md=3 lg=2)
        .navbar.is-stacked
          router-link.navbar__item(
            v-for="item in menu",
            :to="item.link",
            :key="item.title"
          ) {{item.title}}
      c-box-item.content(xs=12 sm="8 offset-4" md="9 offset-3" lg="10 offset-2")
        transition(name='fade')
          router-view.c-container.is-lg
        c-footer
</template>

<script>
import SEOMixin from './mixin/seo'

export default {
  mixins: [SEOMixin],
  data () {
    return {
      menu: [
        {
          title: '核心理念',
          link: '/principle/introduction'
        },
        {
          title: '组件设计规范',
          link: '/principle/guides'
        }
      ]
    }
  }
}
</script>
