import '../css/main.css'
// eslint-disable-next-line
import Components from '../components/**/!(_)*.vue'

import responsiveFun from './responsive.js'

import PortalComponent from './portal.js'
import Modal from './modal.js'

// polyfill `Object.assign`
// SEE https://www.npmjs.com/package/object-assign
import objectAssign from 'object-assign'
Object.assign = objectAssign

const Clair = {
  install (Vue) {
    if (!('$clair' in Vue.prototype)) {
      const responsive = responsiveFun(Vue)
      const $clair = new Vue({
        data: {
          responsive,
          icon: 'feather'
        }
      })

      Object.defineProperty(Vue.prototype, '$clair', {
        get () { return $clair }
      })
    }

    Components.forEach(comp => {
      comp.name && Vue.component(comp.name, comp)
    })

    Vue.use(PortalComponent)
    Modal.install(Vue)
  }
}

export default Clair

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair)
}
