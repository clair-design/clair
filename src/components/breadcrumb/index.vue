<script>
import './index.css'

export default {
  name: 'c-breadcrumb',
  props: {
    divider: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {}
  },
  methods: {
    getDivider () {
      const divider = this.$scopedSlots.divider
        ? this.$scopedSlots.divider()
        : this.divider
      return this.$createElement('i', {
        staticClass: 'c-breadcrumb__divider'
      }, divider)
    },
    getChildren () {
      const children = []
      const isItem = item => item.componentOptions &&
        item.componentOptions.tag === 'c-breadcrumb-item'
      const items = (this.$slots.default || []).filter(isItem)
      const { length } = items
      items.forEach((item, index) => {
        children.push(item)
        if (index !== length - 1) children.push(this.getDivider())
      })
      return children
    }
  },

  render (h) {
    return h('nav', {
      staticClass: 'c-breadcrumb'
    }, this.getChildren())
  }
}
</script>
