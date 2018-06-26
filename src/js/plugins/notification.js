import CNotification from '../../components/notification/_notify.vue'

export default {
  install (Vue) {
    extendVue(Vue)
  }
}
const containers = {
  topRight: null,
  bottomRight: null,
  bottomLeft: null,
  topLeft: null
}

function extendVue (Vue) {
  const { prototype } = Vue

  const createNotification = (data, component) => {
    const mountNode = document.createElement('div')
    const pos = data.position ? data.position : 'topRight'

    if (containers[pos] === null) {
      const el = document.createElement('div')
      el.className = `c-notification c-notification-${pos}`
      containers[pos] = el
      document.body.appendChild(containers[pos])
    }
    containers[pos].appendChild(mountNode)

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
              console.log('Close the notification...')
            }
          }
        })
      }
    }).$mount(mountNode)
  }

  prototype.$notify = function (data) {
    return createNotification(data, CNotification)
  }
}
