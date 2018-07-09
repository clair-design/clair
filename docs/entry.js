import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import objectAssign from 'object-assign'
import { basename, extname } from 'path'
import Clair from '../src/entry'
import './styles/main.css'

Object.assign = objectAssign

Vue.use(Clair)
Vue.use(VueMeta)
Vue.use(VueRouter)

const getModule = mod => (mod.__esModule && mod.default) || mod
const importAll = r => r.keys().map(key => {
  return [
    key,
    getModule(r(key))
  ]
})

const plugins = importAll(require.context('./plugins', false, /\.js$/))
const layouts = importAll(require.context('./layouts', false, /\.vue$/))

for (let [, plugin] of plugins) {
  Vue.use(plugin)
}

for (let [key, layout] of layouts) {
  const name = basename(key, extname(key))
  Vue.component(`layout-${name}`, layout)
}

const pages = [
  ...importAll(require.context('./content', true, /\.md$/)),
  ...importAll(require.context('../src/components', true, /\.md$/))
]

const routes = []
for (let [key, page] of pages) {
  const { layout, route } = page['$$metadata']
  routes.push({
    path: route,
    component: page,
    meta: { layout }
  })

  if (process.env.NODE_ENV !== 'production') {
    page.data = function () {
      return { file: key }
    }
  }
}

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: [
      ...routes,
      { path: '/', redirect: 'index' },
      { path: '*', redirect: '404' }
    ]
  })

const createApp = () => {
  const router = createRouter()
  const app = new Vue({
    router,
    render (h) {
      const layout = this.$route.meta.layout || 'default'
      return h('div', { attrs: { id: 'app' } }, [
        h(`layout-${layout}`)
      ])
    }
  })
  return { app, router }
}

if (typeof window !== 'undefined') {
  const { app } = createApp()
  const mount = () => {
    const elem = document.getElementById('app')
    if (!elem) {
      const div = document.createElement('div')
      div.id = 'app'
    }
    app.$mount('#app')
  }

  if (document.body) {
    mount()
  } else {
    window.addEventListener('DOMContentLoaded', mount)
  }
}
