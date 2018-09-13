import CNotification from '../../components/notification/_notify.vue'

export default {
  install (Vue) {
    Vue.prototype.$notify = function (data) {
      return createNotification(Vue, data)
    }
  }
}

/**
 * `containers` keeps references to container
 * elements in all directions
 */
const containers = {
  topRight: null,
  bottomRight: null,
  bottomLeft: null,
  topLeft: null
}

const createNotification = function (Vue, data) {
  const pos = data.position || (data.position = 'topRight')

  if (containers[pos] === null) {
    const div = document.createElement('div')
    div.className = `c-notification c-notification-${pos}`
    containers[pos] = div
    // TODO: check `document.body`
    document.body.appendChild(div)
  }
  const mountingNode = document.createElement('div')
  containers[pos].appendChild(mountingNode)

  const options = {
    components: {
      'notice-app': CNotification
    },
    destroyed () {
      const elem = this.$el
      elem.parentNode.removeChild(elem)
    },
    render (h) {
      return h('notice-app', {
        attrs: data,
        on: {
          destroy () {
            vm.$destroy()
          },
          close () {}
        }
      })
    }
  }

  const vm = new Vue(options)
  vm.$mount(mountingNode)
}
