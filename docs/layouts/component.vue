<template lang="pug">
  #app
    c-header
    c-box.main.no-gap
      c-box-item.sidebar(xs=12 sm=3 md=2)
        .navbar.is-stacked
          .subnav(v-for="item in menu")
            .subnav__title
              c-icon(:name="item.icon" size="12")
              span  {{ item.title }}
            router-link.navbar__item(
              v-for="sub in item.children",
              :to="sub.link",
              :key="sub.title"
            ) {{sub.title}}
      c-box-item(xs=12 sm=9 md=10)
        .c-container.is-lg
          transition(name='fade')
            router-view
    c-footer.in-article
    c-button(
      primary
      outline
      round
      icon="navigation-2"
      style="position: fixed; right: 50px; bottom: 100px;"
      @click="scrollToTop"
      title="回到顶部"
      v-show="showToTop"
    )
</template>

<script>
var throttle = function(fn, delay, immediate, debounce) {
  var curr = +new Date(), //当前事件
    last_call = 0,
    last_exec = 0,
    timer = null,
    diff, //时间差
    context, //上下文
    args,
    exec = function() {
      last_exec = curr
      fn.apply(context, args)
    }
  return function() {
    curr = +new Date()
    ;(context = this),
      (args = arguments),
      (diff = curr - (debounce ? last_call : last_exec) - delay)
    clearTimeout(timer)
    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay)
      } else if (diff >= 0) {
        exec()
      }
    } else {
      if (diff >= 0) {
        exec()
      } else if (immediate) {
        timer = setTimeout(exec, -diff)
      }
    }
    last_call = curr
  }
}

export default {
  data () {
    return {
      showToTop: false,
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
            { title: '布局', link: '/component/layout' },
            { title: '颜色', link: '/component/color' },
            { title: '文本样式', link: '/component/typography' },
            { title: '图标', link: '/component/icon' }
          ]
        },
        {
          title: '表单',
          icon: 'check-circle',
          children: [
            { title: '按钮', link: '/component/button' },
            { title: '文本框', link: '/component/input' },
            { title: '下拉框', link: '/component/select' },
            { title: '复选框', link: '/component/checkbox' },
            { title: '单选框', link: '/component/radio' },
            { title: '滑块', link: '/component/slider' }
          ]
        },
        {
          title: '导航',
          icon: 'navigation',
          children: [
            { title: '标签页', link: '/component/tab' },
            { title: '导航栏', link: '/component/navbar' },
            { title: '面包屑', link: '/component/breadcrumb' },
            { title: '步骤条', link: '/component/step' }
          ]
        },
        {
          title: '数据展示',
          icon: 'bar-chart-2',
          children: [
            { title: '表格', link: '/component/table' },
            { title: '分页', link: '/component/pagination' },
            { title: '标签', link: '/component/chip' }
          ]
        },
        {
          title: '视觉反馈',
          icon: 'alert-triangle',
          children: [
            { title: '对话框', link: '/component/dialog' },
            { title: '提示框', link: '/component/tip' },
            { title: '加载中', link: '/component/loading' }
          ]
        }
      ]
    }
  },
  methods: {
    scrollToTop () {
      if (typeof window === 'object') {
        const obj = { top: 0 }
        const docElem = document.documentElement
        const maxSmoothHeight = docElem.clientHeight * 2

        if (docElem.scrollTop < maxSmoothHeight) {
          obj.behavior = 'smooth'
        }

        window.scroll(obj)
      }
    },
    onScroll () {
      if (typeof window === 'object') {
        const threshold = 80
        this.showToTop = document.documentElement.scrollTop > threshold
      }
    }
  },
  created () {
    if (typeof window === 'object') {
      const throttleTime = 200
      this.onScroll = throttle(this.onScroll.bind(this), throttleTime)
      window.addEventListener('scroll', this.onScroll)
    }
  },
  destroyed () {
    if (typeof window === 'object') {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
