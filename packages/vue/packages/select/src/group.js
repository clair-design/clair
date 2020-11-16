export default {
  name: 'COptionGroup',

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  render(h) {
    return (
      <div class="c-select__option-group">
        <div class="c-select__option-group__title">{this.title}</div>
        <div class="c-select__options">{this.$slots.default}</div>
      </div>
    )
  }
}
