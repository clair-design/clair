import { Clair } from './scripts'
// import './styles/entry.css'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair)
}

// version will be replaced by semantic-release
Clair.version = '__RELEASE__VERSION__'

export default Clair
