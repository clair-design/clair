<template lang="pug">
  #app
    c-header
    .c-row.main
      .c-col.c-col-2
        nuxt-link.navbar__item(
          v-for="item in menu",
          :to="item.link",
          :key="item.title"
        ) {{item.title}}
      nuxt.c-flex
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
          title: '设计原则',
          link: '/principle/guides'
        }
      ]
    }
  }
}
</script>
