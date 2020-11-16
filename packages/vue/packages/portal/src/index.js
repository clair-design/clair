/**
 * get Vue Constructor inside Vue instances
 *
 * @param {import('vue').Component} vm Vue instance
 * @returns {import('vue').VueConstructor}
 */
function getVueCtor(vm) {
  // SEE https://github.com/vuejs/vue/blob/dev/src/core/global-api/extend.js#L43
  return vm.constructor.super
}

const defaultStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%'
}

export default {
  name: 'CPortal',

  data() {
    return { vmInstance: null }
  },

  updated() {
    this.vmInstance && this.vmInstance.$forceUpdate()
  },

  beforeDestroy() {
    const { vmInstance } = this
    vmInstance.$destroy()

    if (vmInstance.$el) {
      document.body.removeChild(vmInstance.$el)
    }
  },

  mounted() {
    const Vue = getVueCtor(this)
    const portalContainer = document.createElement('div')

    this.$nextTick(() => {
      document.body.appendChild(portalContainer)

      this.vmInstance = new Vue({
        abstract: true,
        parent: this,
        render(h) {
          const parent = this.$parent
          const { data } = parent.$vnode
          const children = parent.$slots.default
          // TODO
          // 字段传递还不全面
          const vnodeData = {
            attrs: data.attrs,
            class: data.class,
            staticClass: data.staticClass,
            staticStyle: {
              ...data.staticStyle,
              ...defaultStyle
            }
          }
          return <div {...{ ...vnodeData }}>{children}</div>
        }
      }).$mount(portalContainer)
    })
  },

  render() {
    return null
  }
}
