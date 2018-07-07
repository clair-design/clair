import '../css/main.css'
// eslint-disable-next-line
import Components from '../components/**/!(_)*.vue'

// plugins
import Responsive from './plugins/responsive.js'
import PortalComponent from './plugins/portal.js'
import Modal from './plugins/modal.js'
import Notification from './plugins/notification.js'

import './polyfills'

const Clair = {
  install (Vue) {
    // inject $clair to Vue prototype
    if (!('$clair' in Vue.prototype)) {
      const $clair = new Vue({
        data: {
          responsive: null,
          icon: 'feather',
          defaultThrottleTime: 150
        }
      })

      Object.defineProperty(Vue.prototype, '$clair', {
        get () { return $clair }
      })

      Vue.prototype.noop = () => {}
    }

    // register components
    Components.forEach(comp => {
      comp.name && Vue.component(comp.name, comp)
    })

    // install plugins
    Vue.use(PortalComponent)
    Vue.use(Modal)
    Vue.use(Responsive)
    Vue.use(Notification)
  }
}

export default Clair

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair)
}
