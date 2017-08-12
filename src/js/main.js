// styles
import '../css/main.css'

// components
import Button from '../components/button/index.vue'

const Clair = {
  install (Vue) {
    Vue.component(Button.name, Button)
  }
}

export default Clair
