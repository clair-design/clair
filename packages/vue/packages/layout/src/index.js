export default {
  name: 'CLayout',

  inject: {
    $layout: {
      default: undefined
    }
  },

  provide() {
    return {
      $layout: this.$layout || this
    }
  },

  data() {
    return {
      children: []
    }
  },

  computed: {
    isLayout: () => true,
    // get all aside descendants
    asides() {
      return this.children.filter(child => child.isAside)
    },
    // get all header descendants
    headers() {
      return this.children.filter(child => child.isHeader)
    },
    // has IMMEDIATE CHILD which is aside
    hasAsideChild() {
      const defaultSlots = this.$scopedSlots.default?.() || []
      return defaultSlots.some(child => {
        return child?.componentOptions?.tag === 'c-aside'
      })
    },
    // make main content scrolling if header and aside are fixed
    isScrollMain() {
      const hasFixedHeader = this.headers.some(header => header.fixed)
      const hasFixedAside = this.asides.some(aside => aside.fixed)
      return hasFixedAside && hasFixedHeader
    }
  },

  methods: {
    addChild(child) {
      this.children.push(child)
    },
    removeChild(child) {
      this.children.splice(this.children.indexOf(child), 1)
    }
  },

  render(h) {
    const classNames = {
      'c-layout': true,
      'c-layout--has-aside': this.hasAsideChild,
      'c-layout--scroll-main': this.isScrollMain
    }
    return <div class={classNames}>{this.$scopedSlots.default?.()}</div>
  }
}
