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
          const { staticClass, class: className, attrs } = self.$vnode.data
          const children = self.$slots.default
          return h('div', { staticClass, class: className, attrs }, children)
        }
      })

      const div = document.createElement('div')
      document.body.appendChild(div)
      vm.$mount(div)
      this.vm = vm
      this.vmElem = vm.$el
    },

    beforeDestroy () {
      this.vm.$destroy()
      document.body.removeChild(this.vmElem)
    }
  }

  Vue.component(Portal.name, Portal)
}

export default { install }
