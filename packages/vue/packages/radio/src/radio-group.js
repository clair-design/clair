import { AutoIncreasingCounter } from '@clair/helpers'
import CRadio from './radio'

const autoIncrCounter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CRadioGroup',

  model: {
    prop: 'value',
    event: 'update:value'
  },

  provide() {
    return {
      $radioGroup: this
    }
  },

  props: {
    // 用于设置 input 的 `name` attribute
    name: {
      type: String,
      default() {
        return `radio-${autoIncrCounter.next()}`
      }
    },

    disabled: Boolean,

    // 数据模型
    value: [Number, String, Boolean],

    options: Array,

    size: {
      type: String,
      default: 'normal',
      validator(size) {
        return ['large', 'normal', 'small'].includes(size)
      }
    }
  },

  data() {
    return { button: false }
  },

  computed: {
    radioVNodes() {
      const { options } = this
      if (!Array.isArray(options)) return null

      return options.map(({ label, disabled, value }, i) => {
        return (
          <CRadio disabled={disabled} value={value} key={i}>
            {label}
          </CRadio>
        )
      })
    }
  },

  render(h) {
    const classNames = ['c-radio-group', `c-radio-group--${this.size}`]
    return (
      <div class={classNames} role="radiogroup">
        {this.radioVNodes}
        {this.$slots.default}
      </div>
    )
  },

  methods: {
    notify(event) {
      const { value } = event.target
      this.$emit('update:value', value)
      this.$emit('change', event)
    }
  }
}
