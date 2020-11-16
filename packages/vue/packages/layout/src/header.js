export default {
  name: 'CHeader',

  props: {
    fixed: Boolean
  },

  inject: ['$layout'],

  computed: {
    isHeader: () => true
  },

  mounted() {
    this.$layout.addChild(this)
  },

  destroyed() {
    this.$layout.removeChild(this)
  },

  render(h) {
    const isFixed = this.fixed && !this.$layout.isScrollMain
    const classNames = {
      'c-layout__header': true,
      'c-layout__header--fixed': isFixed
    }
    return <header class={classNames}>{this.$scopedSlots.default?.()}</header>
  }
}
