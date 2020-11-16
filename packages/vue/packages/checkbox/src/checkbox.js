import { AutoIncreasingCounter } from '@clair/helpers'
const autoIncrCounter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CCheckbox',

  inject: {
    $checkboxGroup: { default: null },
    $formItem: {
      default: null
    }
  },

  model: {
    prop: 'checked',
    event: 'update:checked'
  },

  props: {
    name: String,
    value: [Number, String, Boolean, Object],
    disabled: Boolean,
    size: String,
    indeterminate: Boolean,
    checked: Boolean
  },

  computed: {
    isChecked() {
      return this.$checkboxGroup
        ? this.groupCheckedValues.includes(this.value)
        : this.checked
    },
    groupCheckedValues() {
      return this.$checkboxGroup ? this.$checkboxGroup.checkedValues : []
    },
    $ownListeners() {
      return {
        ...this.$listeners,
        change: this.changeHandler,
        ['!blur']: this.blurHandler
      }
    },
    inputId() {
      return `c-checkbox__input-${autoIncrCounter.next()}`
    },
    labelId() {
      return `c-checkbox__label-${autoIncrCounter.next()}`
    }
  },

  mounted() {
    this.$refs.input.indeterminate = this.indeterminate
  },

  watch: {
    indeterminate(newVal) {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = Boolean(newVal)
      }
    }
  },

  methods: {
    changeHandler(event) {
      // Early abort. In case other form controls exist within label
      if (event.target !== this.$refs.input) return
      const { checked } = this.$refs.input
      this.$checkboxGroup?.changeHandler?.(checked, this.value)
      this.$emit('update:checked', checked)
      this.$emit(event.type, {
        target: { checked, value: this.value },
        nativeEvent: event
      })
      // form validation
      this.$formItem?.handleFormItemChange()
    },
    blurHandler(e) {
      // form validation
      this.$formItem?.handleFormItemBlur()
      this.$emit(e.type, {
        target: { checked: this.checked, value: this.value },
        nativeEvent: e
      })
    }
  },

  render(h) {
    const group = this.$checkboxGroup
    const { value, size, isChecked, inputId, labelId } = this
    const name = group ? group.name : this.name
    const disabled = (group && group.disabled) || this.disabled
    const classNames = ['c-checkbox', size ? `c-checkbox--${size}` : null]

    // skip rendering label if there is no content
    const labelContent = this.$scopedSlots?.default?.()
    const label = labelContent ? (
      <span class="c-checkbox__label" id={labelId}>
        {labelContent}
      </span>
    ) : null
    return (
      <label class={classNames} for={inputId} on={this.$ownListeners}>
        <input
          ref="input"
          id={inputId}
          aria-labelledby={labelId}
          class="c-checkbox__input"
          type="checkbox"
          name={name}
          value={value}
          disabled={disabled}
          checked={isChecked}
        />
        <span class="c-checkbox__box" />
        {label}
      </label>
    )
  }
}
