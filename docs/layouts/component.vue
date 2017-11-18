<template lang="pug">
  #app
    c-header
    c-box.main.no-gap
      c-box-item.sidebar(xs=12 sm=3 md=2)
        .navbar.is-stacked
          .subnav(v-for="item in menu")
            .subnav__title
              c-icon(:name="item.icon")
              |  {{ item.title }}
            nuxt-link.navbar__item(
              v-for="sub in item.children",
              :to="sub.link",
              :key="sub.title"
            ) {{sub.title}}
      c-box-item(xs=12 sm=9 md=10)
        nuxt.c-container.is-lg
    c-footer.in-article
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          title: '使用说明',
          icon: 'book',
          children: [
            { title: '安装和使用', link: '/component/install' },
            { title: '自定义样式', link: '/component/theme' }
          ]
        },
        {
          title: '基础样式',
          icon: 'cube',
          children: [
            { title: '布局', link: '/component/layout' },
            { title: '颜色', link: '/component/color' },
            { title: '文本样式', link: '/component/typography' },
            { title: '图标', link: '/component/icon' }
          ]
        },
        {
          title: '表单',
          icon: 'check-square-o',
          children: [
            { title: '按钮', link: '/component/button' },
            { title: '文本框', link: '/component/text' },
            { title: '下拉框', link: '/component/select' },
            { title: '复选框', link: '/component/checkbox' },
            { title: '单选框', link: '/component/radio' }
          ]
        },
        {
          title: '导航',
          icon: 'bars',
          children: [
            { title: '标签页', link: '/component/tab' },
            { title: '导航栏', link: '/component/navbar' },
            { title: '面包屑', link: '/component/breadcrumb' },
            { title: '步骤条', link: '/component/step' }
          ]
        },
        {
          title: '数据展示',
          icon: 'table',
          children: [
            { title: '表格', link: '/component/table' },
            { title: '分页', link: '/component/pagination' },
            { title: '标签', link: '/component/chip' }
          ]
        },
        {
          title: '视觉反馈',
          icon: 'exclamation-triangle',
          children: [
            { title: '对话框', link: '/component/dialog' },
            { title: '提示框', link: '/component/tip' },
            { title: '加载中', link: '/component/loading' }
          ]
        }
      ]
    }
  }
}
</script>
