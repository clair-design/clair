import { AutoIncreasingCounter } from '@clair/helpers'
import { assign } from 'src/utils'
const inputIncrCounter = /*@__PURE__*/ new AutoIncreasingCounter()
const validInputSizes = ['large', 'normal', 'small']
const validInputTypes = ['success', 'warning', 'error']
const validHtmlTypes = ['text', 'password', 'textarea']

export const inputSizeProp = {
  type: String,
  default: 'normal',
  validator(size) {
    return validInputSizes.includes(size)
  }
}

export const inputTypeProp = {
  type: String,
  validator(type) {
    return validInputTypes.includes(type)
  }
}

export const htmlTypeProp = {
  type: String,
  default: 'text',
  validator(type) {
    // SEE https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    return validHtmlTypes.includes(type)
  }
}

const defaultProps = {
  id: String,

  size: inputSizeProp,

  type: inputTypeProp,

  placeholder: String,

  value: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  }
}

export const inputProps = /*@__PURE__*/ assign(defaultProps, {
  htmlType: htmlTypeProp,

  name: {
    type: String,
    default() {
      return `c-input-${inputIncrCounter.next()}`
    }
  },

  block: {
    type: Boolean,
    default: false
  },

  prefixIcon: [String, Function, Object],

  suffixIcon: [String, Function, Object],

  clearable: {
    type: Boolean,
    default: false
  },

  autoSize: {
    type: [Boolean, Object],
    default: false
  },

  autocomplete: {
    type: String,
    default: 'off',
    validator(val) {
      return ['on', 'off'].includes(val)
    }
  },

  autofocus: {
    type: Boolean,
    default: false
  },

  readonly: {
    type: Boolean,
    default: false
  },
  inputAttrs: {
    type: Object,
    default: () => ({})
  }
})

export const textareaProps = /*@__PURE__*/ assign(inputProps)

export const inputGroupProps = /*@__PURE__*/ assign(defaultProps)

export const model = {
  prop: 'value',
  event: 'update:value'
}

export const firstUpperCase = str => {
  return str.toLowerCase().replace(/^\S/g, s => s.toUpperCase())
}
