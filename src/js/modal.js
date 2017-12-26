import CModalAlert from '../components/modal/_alert.vue'
import CModalMessage from '../components/modal/_message.vue'
import { defer } from './util'

export default {
  install (Vue) {
    extendVue(Vue)
  }
}

function extendVue (Vue) {
  const { prototype } = Vue
  const createModal = (data, component) => {
    const deferred = defer()
    const div = document.createElement('div')
    document.body.appendChild(div)

    const vm = new Vue({
      components: {
        'c-portal-app': component
      },
      mounted () {
        // remove comment element
        document.body.removeChild(this.$el)
      },
      render (h) {
        return h('c-portal-app', {
          attrs: data,
          on: {
            cancel () {
              deferred.reject()
            },
            confirm () {
              deferred.resolve()
            },
            destroy () {
              vm.$destroy()
            }
          }
        })
      }
    }).$mount(div)

    return deferred.promise
  }

  prototype.$alert = function (data) {
    // data: { msg, title }
    createModal(data, CModalAlert)
  }

  prototype.$message = function (data) {
    // data: { msg, title, type }
    createModal(data, CModalMessage)
  }

  const messageTypes = ['success', 'error', 'info', 'warning']
  messageTypes.forEach(type => {
    prototype.$success = ({ msg, title }) => {
      return this.$message({ msg, title, type })
    }
  })
}
