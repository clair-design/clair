// styles
import '../css/main.css'

// importing components
import Button from '../components/button/index.vue'
// __import_next_compoent__(DO NOT remove this line)

const components = [
  Button
  // __import_next_compoent__(DO NOT remove this line)
]

const Clair = {
  install (Vue) {
    components.forEach(Component => {
      Vue.component(Component.name, Component)
    })
  }
}

export default Clair
