// styles
import '../css/main.css'

// importing components
import Button from '../components/button/index.vue'

const install = (Vue, component) => {
  Vue.component(component.name, component)
}
const Clair = {
  install (Vue) {
    install(Vue, Button)
  }
}

export default Clair
