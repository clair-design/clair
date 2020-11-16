import { AutoIncreasingCounter } from '@clair/helpers'
const autoIncrCounter = /*@__PURE__*/ new AutoIncreasingCounter()
const sizes = ['normal', 'small']

export default {
  name: 'CSwitch',
  data() {
    return {
      inputId: `c-switch__input-${autoIncrCounter.next()}`,
      labelId: `c-switch__label-${autoIncrCounter.next()}`
    }
  },
  model: {
    prop: 'checked',
    event: 'update:checked'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal',
      validator: value => {
        return sizes.includes(value)
      }
    },
    checkedColor: {
      type: String
    },
    unCheckedColor: {
      type: String
    },
    change: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleChange(e) {
      const { checked } = this.$refs.input
      const switchEvent = {
        target: {
          value: checked
        },
        nativeEvent: e
      }
      this.$emit('change', switchEvent)
      this.$emit('update:checked', checked)
    }
  },
  render(h) {
    const {
      checked,
      size,
      disabled,
      checkedColor,
      unCheckedColor,
      handleChange,
      inputId,
      labelId
    } = this
    const className = {
      'c-switch': true,
      [`c-switch--${size}`]: sizes.includes(size)
    }
    const switchBoxStyles = {
      background: checked ? checkedColor : unCheckedColor
    }
    const switchLabelChild = checked
      ? this.$scopedSlots?.checked?.()
      : this.$scopedSlots?.unChecked?.()
    const hasSwitchLabelChild = Boolean(switchLabelChild)
    const ariaLabel = checked ? '开' : '关'
    return (
      <label
        class={className}
        for={inputId}
        role="switch"
        aria-checked={checked}
        aria-labelledby={hasSwitchLabelChild && labelId}
        aria-label={hasSwitchLabelChild ? undefined : ariaLabel}
      >
        <input
          ref="input"
          id={inputId}
          type="checkbox"
          class="c-switch__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <span class="c-switch__box" style={switchBoxStyles} />
        {hasSwitchLabelChild && (
          <span class="c-switch__label" id={labelId}>
            {switchLabelChild}
          </span>
        )}
      </label>
    )
  }
}
