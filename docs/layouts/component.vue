<template lang="pug">
  #app
    c-header
    c-box.main.no-gap
      c-box-item.sidebar(xs=12 sm=4 md=3 lg=2)
        .navbar.is-stacked
          .subnav(v-for="item in menu")
            .subnav__title
              c-icon(:name="item.icon" size="12")
              span  {{ item.title }}
            router-link.navbar__item(
              v-for="sub in item.children",
              :to="sub.link || '/component/' + sub.name",
              :key="sub.title"
            )
              | {{sub.title}}
              span.is-text-gray-6.has-margin-left-sm(v-if="sub.name") {{ sub.name }}
      c-box-item.content(xs=12 sm=8 md=9 lg=10)
        transition(name='fade')
          router-view.c-container.is-lg
        c-footer
    c-button(
      primary
      outline
      round
      icon="navigation-2"
      style="position: fixed; right: 50px; bottom: 100px; z-index: 999"
      @click="scrollToTop"
      title="回到顶部"
      v-show="showToTop"
    )
</template>

<script>
import throttle from 'lodash/throttle'

import SEOMixin from './mixin/seo'

export default {
  mixins: [SEOMixin],
  data () {
    return {
      showToTop: false,
      scrollBox: null,
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
          icon: 'layout',
          children: [
            { title: '布局', name: 'layout' },
            { title: '颜色', name: 'color' },
            { title: '文本样式', name: 'typography' },
            { title: 'CSS 工具类', name: 'helper' },
            { title: '响应式设计', name: 'responsive' },
            { title: '图标', name: 'icon' },
            { title: '过渡动画', name: 'transition' }
          ]
        },
        {
          title: '表单',
          icon: 'check-circle',
          children: [
            { title: '按钮', name: 'button' },
            { title: '文本框', name: 'input' },
            { title: '下拉框', name: 'select' },
            { title: '复选框', name: 'checkbox' },
            { title: '单选框', name: 'radio' },
            { title: '开关', name: 'switch' },
            { title: '滑块', name: 'slider' },
            { title: '取色器', name: 'color-picker' },
            { title: '表单', name: 'form' },
            { title: '时间选择', name: 'timepicker' },
            { title: '日期选择', name: 'datepicker' },
            { title: '级联选择', name: 'cascader' },
            { title: '文件上传', name: 'upload' }
          ]
        },
        {
          title: '导航',
          icon: 'navigation',
          children: [
            { title: '标签页', name: 'tab' },
            { title: '导航菜单', name: 'menu' },
            { title: '面包屑', name: 'breadcrumb' },
            { title: '工具栏', name: 'toolbar' },
            { title: '步骤条', name: 'steps' }
          ]
        },
        {
          title: '数据展示',
          icon: 'bar-chart-2',
          children: [
            { title: '表格', name: 'table' },
            { title: '卡片', name: 'card' },
            { title: '分页', name: 'pagination' },
            { title: '标签', name: 'chip' },
            { title: '日历', name: 'calendar' },
            { title: '树形组件', name: 'tree' }
          ]
        },
        {
          title: '视觉反馈',
          icon: 'alert-triangle',
          children: [
            { title: '对话框', name: 'modal' },
            { title: '提示框', name: 'tip' },
            { title: '气泡确认框', name: 'pop-confirm' },
            { title: '通知', name: 'notification' },
            { title: '加载中', name: 'loading' }
          ]
        }
      ]
    }
  },
  methods: {
    scrollToTop () {
      if (typeof window === 'object') {
        const obj = { top: 0 }
        const maxSmoothHeight = this.scrollBox.clientHeight * 2

        if (this.scrollBox.scrollTop < maxSmoothHeight) {
          obj.behavior = 'smooth'
        }

        this.scrollBox.scroll(obj)
      }
    },
    onScroll () {
      if (typeof window === 'object') {
        const threshold = 80
        this.showToTop = this.scrollBox.scrollTop > threshold
      }
    }
  },
  mounted () {
    if (typeof window === 'object') {
      this.scrollBox = document.querySelector('.content')
      const throttleTime = 200
      this.onScroll = throttle(this.onScroll.bind(this), throttleTime)
      this.scrollBox.addEventListener('scroll', this.onScroll)
    }
  },
  destroyed () {
    if (typeof window === 'object') {
      this.scrollBox.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
