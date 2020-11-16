import loading from './src/index'
import directive from './src/directive'

function install(Vue) {
  Vue.use(directive)
  Vue.prototype.$loading = loading
}

loading.install = install

export default loading
