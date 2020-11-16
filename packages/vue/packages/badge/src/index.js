export default {
  name: 'CBadge',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    isDot: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  render(h) {
    const showValue =
      this.max && this.value > this.max ? `${this.max}+` : this.value

    const contentClassNames = {
      'c-badge__content': true,
      'c-badge__content--dot': this.isDot,
      'c-badge__content--empty': this.$slots.default === undefined,
      'c-badge__content--hidden': this.hidden
    }
    const contentBackgroundColor = this.backgroundColor
      ? `background-color: ${this.backgroundColor};`
      : ''

    return (
      <div class="c-badge">
        {this.$slots.default}
        <span class={contentClassNames} style={contentBackgroundColor}>
          {this.isDot ? '' : showValue}
        </span>
      </div>
    )
  }
}
