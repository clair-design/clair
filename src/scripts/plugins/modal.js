import CModalAlert from '@components/modal/_alert.vue'
import CModalMessage from '@components/modal/_message.vue'

export default function install (Vue) {
  /**
   * @param {Object | String} data title and message
   */
  Vue.prototype.$alert = function (data) {
    if (typeof data === 'string') {
      data = {
        title: '提示',
        msg: data
      }
    }
    return createModal(Vue, data, CModalAlert)
  }

  /**
   * @param {Object} data title, message, type
   */
  Vue.prototype.$message = function (data) {
    return createModal(Vue, data, CModalMessage)
  }

  /**
   * shorthands for `.$message()`
   */
  ;['success', 'error', 'info', 'warning'].forEach(type => {
    /**
     * @param {Object | String} data title and message
     */
    Vue.prototype[`$${type}`] = function (data) {
      if (typeof data === 'string') {
        data = {
          title: '提示',
          msg: data
        }
      }

      return this.$message({ type, ...data })
    }
  })
}

/**
 * @param {VueConstructor} Vue VueConstructor
 * @param {Object} attrs attrs for message/alert modal
 * @param {VueComponent} Component reference to message/alert component
 */
function createModal (Vue, attrs, Component) {
  const handlers = {}
  const vm = new Vue({
    components: { 'c-msg-modal': Component },
    render (h) {
      return h('c-msg-modal', { attrs, on: handlers })
    },
    mounted () {
      // remove comment element
      document.body.removeChild(this.$el)
    }
  })

  return new Promise((resolve, reject) => {
    handlers.cancel = reject
    handlers.confirm = resolve
    handlers.destroy = () => vm.$destroy()

    // TODO: throw error or something
    if (typeof document !== 'undefined' && document.body) {
      const div = document.createElement('div')
      document.body.appendChild(div)
      vm.$mount(div)
    }
  })
}
