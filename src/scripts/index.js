import './polyfills'

// plugins
import Components from './components'
import Responsive from './plugins/responsive.js'
import Portal from './plugins/portal.js'
import Modal from './plugins/modal.js'
import Notification from './plugins/notification.js'

// mixins
import validatable from './mixins/validatable'
import resettable from './mixins/resettable'

export const Clair = {
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

      $clair.mixins = { validatable, resettable }

      Vue.prototype.noop = () => {}
    }

    Vue.use(Components)
    // install plugins
    Vue.use(Portal)
    Vue.use(Modal)
    Vue.use(Responsive)
    Vue.use(Notification)
  }
}
