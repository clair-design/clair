import { buttonSizeProp, buttonTypeProp } from './util'

export default {
  name: 'CButton',

  props: {
    size: buttonSizeProp,
    type: buttonTypeProp,

    htmlType: {
      type: String,
      default: 'button',
      validator(type) {
        // SEE https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
        return ['button', 'submit', 'reset'].includes(type)
      }
    },

    disabled: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    }
  },

  inject: {
    buttonGroup: {
      default: null
    }
  },

  computed: {
    btnSize() {
      const { size, buttonGroup } = this
      if (size) return size
      if (buttonGroup && buttonGroup.size) {
        return buttonGroup.size
      }
      return 'normal'
    }
  },

  render(h) {
    const isDisabled = this.disabled || this.loading
    const classNames = [
      'c-button',
      `c-button--${this.type}`,
      `c-button--${this.btnSize}`,
      this.block ? 'c-button--block' : null,
      this.loading ? 'c-button--loading' : null
    ]

    return (
      <button
        disabled={isDisabled}
        class={classNames}
        type={this.htmlType}
        onClick={this.onClick}
      >
        {this.$slots.default}
      </button>
    )
  },

  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
