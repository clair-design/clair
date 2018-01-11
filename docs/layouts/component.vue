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
              span.is-text-gray-5(v-if="sub.name") {{ sub.name }}
      c-box-item(xs=12 sm=8 md=9 lg=10)
        transition(name='fade')
          router-view.c-container.is-lg
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
const throttle = function (fn, delay, immediate, debounce) {
  let curr = Date.now() // 当前事件
  let lastCall = 0
  let lastExec = 0
  let timer = null
  let diff // 时间差
  let context // 上下文
  let args
  const exec = function () {
    lastExec = curr
    fn.apply(context, args)
  }
  return function () {
    curr = Date.now()
    context = this
    diff = curr - (debounce ? lastCall : lastExec) - delay
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
    lastCall = curr
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
            { title: '布局', name: 'layout' },
            { title: '颜色', name: 'color' },
            { title: '文本样式', name: 'typography' },
            { title: '图标', name: 'icon' }
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
            { title: '滑块', name: 'slider' },
            { title: '表单', name: 'form' },
            { title: '日期选择', name: 'datepicker' }
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
            { title: '步骤条', name: 'step' }
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
            { title: '日历', name: 'calendar' }
          ]
        },
        {
          title: '视觉反馈',
          icon: 'alert-triangle',
          children: [
            { title: '对话框', name: 'modal' },
            { title: '提示框', name: 'tip' },
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
