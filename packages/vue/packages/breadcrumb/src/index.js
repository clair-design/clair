export default {
  name: 'CBreadcrumb',

  props: {
    separator: {
      type: String,
      default: '/'
    }
  },

  provide() {
    return { $breadcrumb: this }
  },

  render(h) {
    return (
      <nav class="c-breadcrumb" role="navigation">
        {this.$slots.default}
      </nav>
    )
  }
}
