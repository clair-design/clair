// styles
import '../css/main.css'

// components
import Button from '../components/button/button.vue'

const Clair = {
  install (Vue) {
    Vue.component(Button.name, Button)
  }
}

export default Clair
