import * as Clair from './namedExport'

export default {
  install(Vue, option) {
    Object.values(Clair).forEach(componentAsPlugin => {
      if (typeof componentAsPlugin?.install === 'function') {
        Vue.use(componentAsPlugin, option)
      }
    })
  }
}
