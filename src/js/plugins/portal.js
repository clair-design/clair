const defaultStyle = {
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%'
}

function install (Vue) {
  const Portal = {
    name: 'c-portal',

    updated () {
      this.vm.$forceUpdate()
    },

    mounted () {
      const self = this
      const vm = new Vue({
        abstract: true,
        parent: this,
        render (h) {
          const {
            attrs,
            staticClass,
            staticStyle,
            class: className
          } = self.$vnode.data

          const children = self.$slots.default
          return h('div', {
            attrs,
            staticClass,
            class: className,
            staticStyle: Object.assign({}, staticStyle, defaultStyle)
          }, children)
        }
      })

      const div = document.createElement('div')
      document.body.appendChild(div)
      vm.$mount(div)
      this.vm = vm
    },

    beforeDestroy () {
      const { vm } = this
      vm.$destroy()
      if (vm.$el) {
        document.body.removeChild(vm.$el)
      }
    },

    // eslint-disable-next-line
    render () {}
  }

  Vue.component(Portal.name, Portal)
}

export default { install }
