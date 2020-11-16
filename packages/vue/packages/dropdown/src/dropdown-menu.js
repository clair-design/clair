export default {
  name: 'CDropdownMenu',

  inject: {
    $dropdown: {
      default: null
    }
  },

  mounted() {
    const dropdown = this.$dropdown
    dropdown.dropdownElm = this.$refs.menu
  },

  render(h) {
    return <menu ref="menu">{this.$scopedSlots.default?.()}</menu>
  }
}
