<script>
import { getVueCtor } from '@util'

const defaultStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%'
}

export default {
  name: 'c-portal',
  // eslint-disable-next-line
  render () {},

  updated () {
    this.vm.$forceUpdate()
  },

  beforeDestroy () {
    const { vm } = this
    vm.$destroy()

    if (vm.$el) {
      document.body.removeChild(vm.$el)
    }
  },

  mounted () {
    const self = this
    const Vue = getVueCtor(this)

    const vm = new Vue({
      abstract: true,
      parent: this,
      render (h) {
        const { data } = self.$vnode
        const option = {
          attrs: data.attrs,
          class: data.class,
          staticClass: data.staticClass,
          staticStyle: Object.assign({}, data.staticStyle, defaultStyle)
        }
        return h('div', option, self.$slots.default)
      }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
    vm.$mount(div)
    this.vm = vm
  }
}
</script>
