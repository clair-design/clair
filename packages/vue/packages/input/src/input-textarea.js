import calcTextAreaRows from './calcTextAreaRows'
import { textareaProps, firstUpperCase, model } from './util'

export default {
  name: 'CInputTextarea',

  props: textareaProps,

  inject: {
    $formItem: { default: null }
  },

  model,

  data() {
    return {
      rows: 1
    }
  },

  mounted() {
    this.resizeNodes()
  },

  computed: {
    $ownListeners() {
      return {
        ...this.$listeners,
        input: this.inputHandler,
        keydown: this.keyDownHandler,
        blur: this.blurOrChangeHandler,
        change: this.blurOrChangeHandler
      }
    },

    textareaContainerVNodes() {
      const className = [
        'c-input',
        `c-input--${this.size || 'normal'}`,
        'c-textarea',
        this.disabled && 'c-textarea--disabled'
      ]

      const style = this.autoSize ? { height: 'auto' } : {}

      return (
        <textarea
          id={this.id}
          name={this.name}
          class={className}
          on={this.$ownListeners}
          rows={this.rows}
          ref="textarea"
          placeholder={this.placeholder}
          disabled={this.disabled}
          value={this.value}
          // `inputAttrs` is passed by Input
          // which has already been pre-processed(merged)
          attrs={this.inputAttrs}
          {...{ style }}
        />
      )
    },

    baseEvent() {
      return {
        target: {
          value: this.value
        }
      }
    }
  },

  watch: {
    value() {
      this.resizeNodes()
    }
  },

  methods: {
    inputHandler(e) {
      this.$emit(model.event, e.target.value)
      this.$emit(e.type, e)
    },
    resizeNodes() {
      const { autoSize } = this
      if (!this.$refs.textarea) return
      if (!autoSize) {
        return
      }
      const { minRows, maxRows } = autoSize
      this.rows = calcTextAreaRows(this.$refs.textarea, minRows, maxRows)
    },

    keyDownHandler(e) {
      if (e.code === 'Enter') {
        this.$emit('press-enter', {
          ...this.baseEvent,
          nativeEvent: e
        })
      }
      this.$emit(e.type, e)
    },

    blurOrChangeHandler(e) {
      const { type } = e
      this.$emit(type, {
        target: {
          value: e.target.value
        },
        nativeEvent: e
      })
      const name = firstUpperCase(type)
      this.$formItem?.[`handleFormItem${name}`](e)
    }
  },

  render() {
    return <transition>{this.textareaContainerVNodes}</transition>
  }
}
