import notification from './src/index'

/** @param {import('vue').VueConstructor} Vue */
function install(Vue) {
  Vue.prototype.$notification = notification
}

notification.install = install

export default notification
