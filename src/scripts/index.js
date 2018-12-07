import featherIcons from 'feather-vue'

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
    const VuePrototype = Vue.prototype
    const defineReadOnly = function (key, val) {
      Object.defineProperty(VuePrototype, key, {
        get () {
          return val
        },
        configurable: process.env.NODE_ENV !== 'production',
        enumerable: false
      })
    }

    // set a noop utility
    defineReadOnly('noop', _ => _)

    // inject $clair to Vue prototype
    if (!('$clair' in VuePrototype)) {
      const $clair = new Vue({
        data: {
          responsive: null,
          defaultThrottleTime: 150
        }
      })
      $clair.mixins = mixins
      defineReadOnly('$clair', $clair)
    }

    // expose featherIcons for convenience
    defineReadOnly('$featherIcons', featherIcons)

    // register components
    Vue.use(Components)

    // install plugins
    Vue.use(Modal)
    Vue.use(Responsive)
    Vue.use(Notification)
  }
}
