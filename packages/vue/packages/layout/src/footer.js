export default {
  name: 'CFooter',

  render(h) {
    return (
      <footer class="c-layout__footer">{this.$scopedSlots.default?.()}</footer>
    )
  }
}
