import Icon from './index.vue'

Icon.install = Vue => {
  Vue.component(Icon.name, Icon)
}

export default Icon
