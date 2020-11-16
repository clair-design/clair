export default {
  name: 'CMain',

  render(h) {
    return <main class="c-layout__main">{this.$scopedSlots.default?.()}</main>
  }
}
