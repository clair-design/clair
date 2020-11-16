export default {
  name: 'PaneProvider',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  provide() {
    return {
      $paneProvider: this
    }
  },
  render() {
    return <transition>{this.$scopedSlots.default?.()}</transition>
  }
}
