// plugins
import Components from './components'

import Modal from './plugins/modal'
import Responsive from './plugins/responsive'
import Notification from './plugins/notification'

// mixins
import validatable from './mixins/validatable'
import resettable from './mixins/resettable'

const mixins = { validatable, resettable }

export const Clair = {
  mixins,
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
      $clair.mixins = mixins

      Object.defineProperty(Vue.prototype, '$clair', {
        get () {
          return $clair
        }
      })
    }

    Vue.prototype.noop = () => {}

    // register components
    Vue.use(Components)
    // install plugins
    Vue.use(Modal)
    Vue.use(Responsive)
    Vue.use(Notification)
  }
}
