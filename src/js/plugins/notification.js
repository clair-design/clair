import CNotification from '../../components/notification/_notify.vue'
import { defer } from '../utils'

export default {
  install (Vue) {
    extendVue(Vue)
  }
}

function extendVue (Vue) {
  const { prototype } = Vue
  let containerTopRight = null
  let containerTopLeft = null
  let containerBottomRight = null
  let containerBottomLeft = null

  const createModal = (data, component) => {
    const deferred = defer()
    const psn = data.position ? data.position : 'topRight'
    const mountNode = document.createElement('div')

    // 找到对应的container
    switch (psn) {
      case 'topRight': {
        if (containerTopRight === null) {
          containerTopRight = document.createElement('div')
          containerTopRight.setAttribute('class', `c-notification c-notification-${psn}`)
          document.body.appendChild(containerTopRight)
        }
        containerTopRight.appendChild(mountNode)
        break
      }
      case 'topLeft': {
        if (containerTopLeft === null) {
          containerTopLeft = document.createElement('div')
          containerTopLeft.setAttribute('class', `c-notification c-notification-${psn}`)
          document.body.appendChild(containerTopLeft)
        }
        containerTopLeft.appendChild(mountNode)
        break
      }
      case 'bottomRight': {
        if (containerBottomRight === null) {
          containerBottomRight = document.createElement('div')
          containerBottomRight.setAttribute('class', `c-notification c-notification-${psn}`)
          document.body.appendChild(containerBottomRight)
        }
        containerBottomRight.appendChild(mountNode)
        break
      }
      case 'bottomLeft': {
        if (containerBottomLeft === null) {
          containerBottomLeft = document.createElement('div')
          containerBottomLeft.setAttribute('class', `c-notification c-notification-${psn}`)
          document.body.appendChild(containerBottomLeft)
        }
        containerBottomLeft.appendChild(mountNode)
        break
      }
      default:
        break
    }

    const vm = new Vue({
      components: {
        'c-notice-app': component
      },
      destroyed () {
        const elem = this.$el
        elem.parentNode.removeChild(elem)
      },
      render (h) {
        return h('c-notice-app', {
          attrs: data,
          on: {
            destroy () {
              vm.$destroy()
            },
            close () {
              // TODO
            }
          }
        })
      }
    }).$mount(mountNode)

    return deferred.promise
  }

  prototype.$notify = function (data) {
    // data: { msg, title }
    return createModal(data, CNotification)
  }
}
