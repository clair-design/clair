import { Clair } from './scripts'
import './styles/main.css'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair)
}

export default Clair
