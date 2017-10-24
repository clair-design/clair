<template lang="pug">
  #app
    c-header
    .c-row.main
      .c-col.c-col-2.sidebar.no-gap
        .navbar.is-stacked
          nuxt-link.navbar__item(
            v-for="item in menu",
            :to="item.link",
            :key="item.title"
          ) {{item.title}}
      .c-flex
        nuxt.content-wrap
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
