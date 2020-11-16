import { IconClear } from 'packages/icon'

export default {
  name: 'CTag',

  data() {
    return {
      colors: [
        'blue',
        'green',
        'orange',
        'red',
        'purple',
        'grey',
        'cyan',
        'magenta'
      ]
    }
  },

  props: {
    size: String,
    color: String,
    closable: Boolean
  },

  computed: {
    classNames() {
      const { size, color, isPreDefinedColor, closable } = this

      return [
        'c-tag',
        closable ? 'c-tag-closable' : null,
        color && isPreDefinedColor ? `c-tag--${color}` : null,
        size ? `c-tag--${size}` : null
      ]
    },

    isPreDefinedColor() {
      return this.colors.includes(this.color)
    },

    style() {
      const { color, isPredefinedColor, isColorValid } = this

      if (!color) return

      if (!isPredefinedColor && isColorValid(color)) {
        return {
          color,
          backgroundColor: '#fff',
          border: `1px solid`
        }
      }

      return null
    }
  },

  methods: {
    emitClose(e) {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      this.$emit('close', { nativeEvent: e })
    },
    isColorValid(color) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
    }
  },

  render(h) {
    const closeIcon = this.closable ? (
      <IconClear onClick={this.emitClose} class="c-icon--close-tag" />
    ) : null

    const content =
      this.$slots.default && this.$slots.default[0]
        ? this.$slots.default[0].text
        : ''

    return (
      <div class={this.classNames} style={this.style}>
        <span class="c-tag__label" title={content}>
          {this.$slots.default}
        </span>
        {closeIcon}
      </div>
    )
  }
}
