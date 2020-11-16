export default {
  name: 'CRadio',

  inject: {
    $radioGroup: { default: null },
    $formItem: { default: null }
  },

  props: {
    name: String,
    disabled: Boolean,
    value: [Number, String, Boolean],
    defaultChecked: Boolean
  },

  data() {
    return { button: false, isChecked: this.defaultChecked }
  },

  computed: {
    $ownListeners() {
      return {
        ...this.$listeners,
        change: this.handleChange,
        [`!blur`]: this.handleBlur
      }
    }
  },

  render(h) {
    const group = this.$radioGroup
    const { value } = this
    const name = group ? group.name : this.name
    const disabled = (group && group.disabled) || this.disabled
    const checked = group ? group.value === value : this.isChecked

    const classNames = ['c-radio', this.button ? 'c-radio--button' : null]
    // slip rendering label if there is no content
    const labelContent = this.$scopedSlots?.default?.()
    const label = labelContent ? (
      <span class="c-radio__label">{labelContent}</span>
    ) : null
    return (
      <label class={classNames} on={this.$ownListeners}>
        <input
          ref="radio"
          class="c-radio__input"
          type="radio"
          name={name}
          value={value}
          disabled={disabled}
          checked={checked}
        />
        <span class="c-radio__box" />
        {label}
      </label>
    )
  },

  methods: {
    handleChange(event) {
      const { value } = this

      this.isChecked = true

      // emit event objects
      const e = { target: { value }, nativeEvent: event }
      this.$emit('change', e)
      this.$radioGroup?.notify(e)
      this.$formItem?.handleFormItemChange()
    },
    handleBlur() {
      this.$formItem?.handleFormItemBlur()
    }
  }
}
