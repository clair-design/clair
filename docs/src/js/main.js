import '../css/main.css'
import Index from '../pages/index.vue'

const { Vue, VueRouter } = window
const navs = [
  { title: '首页', link: '/' },
  { title: '设计原则', link: '/principle' },
  { title: '组件', link: '/component' },
  { title: '资源', link: '/resource' }
]
const routes = [
  {
    path: '/',
    component: Index
  }
]
const router = new VueRouter({ routes })
const data = { navs }

new Vue({ data, router }).$mount('#app')
