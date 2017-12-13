<template lang="pug">
  #app
    c-header
    c-box.main.no-gap
      c-box-item.sidebar(xs=12 sm=3 md=2)
        .navbar.is-stacked
          router-link.navbar__item(
            v-for="item in menu",
            :to="item.link",
            :key="item.title"
          ) {{item.title}}
      c-box-item.is-flex
        .c-container.is-lg
          transition(name='fade')
            router-view
    c-footer.in-article
</template>

<script>
export default {
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
