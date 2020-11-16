import message from './src/index'

/** @param {import('vue').VueConstructor} Vue */
function install(Vue) {
  Vue.prototype.$message = message
}

message.install = install

export default message
