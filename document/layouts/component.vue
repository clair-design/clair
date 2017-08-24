<template lang="pug">
  #app
    c-header
    .c-row.main
      .c-col.c-col-2
        div(v-for="item in menu")
          h3 {{ item.title }}
          nuxt-link.navbar__item(
            v-for="sub in item.children",
            :to="sub.link",
            :key="sub.title"
          ) {{sub.title}}
      nuxt.c-flex
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          title: 'Clair 组件',
          children: [
            { title: '安装和使用', link: '/component/install' },
            { title: '自定义样式', link: '/component/theme' }
          ]
        }
      ]
    }
  }
}
</script>
