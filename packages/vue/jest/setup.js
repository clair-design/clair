global.transitionStub = (controller = {}) => ({
  render: function (h) {
    return this.$options._renderChildren
  },
  mounted() {
    controller.events?.forEach(event => this.$emit(event))
    controller.vm = this
  }
})
