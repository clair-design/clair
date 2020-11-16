import { IconChecked } from 'packages/icon'
import { isNil } from '@clair/helpers'

export default {
  name: 'COption',

  inject: ['$select'],

  props: {
    value: {
      type: [String, Number, Object, Array],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      slotText: ''
    }
  },

  computed: {
    isObject() {
      return (
        Object.prototype.toString.call(this.value).toLowerCase() ===
          '[object object]' || Array.isArray(this.value)
      )
    },
    _label() {
      const label =
        (!isNil(this.label) && this.label) ||
        this.slotText ||
        (this.isObject ? '' : this.value)
      return `${label}`.trim()
    },
    _value() {
      return isNil(this.value) ? this._label || null : this.value
    },
    selected() {
      if (!this.$select.multiple) {
        return !isNil(this._value) && this.$select.value === this._value
      }
      return this.contains(this.$select.value, this._value)
    },
    show() {
      if (!this.$select.query) return true
      return this.$select.filteredOptions.includes(this)
    },
    isActive() {
      return this === this.$select.activeOption && !this.disabled
    }
  },

  created() {
    this.$nextTick(() => {
      this.updateSlotText()
      if (!this._label && !this.value) {
        throw new Error('Invalid select option! A label or value is needed!')
      }
      this.$select.addOption(this)
      if (this.selected) {
        if (this.isCurrentInSelectedOption()) return
        this.$select.addSelectedOption(this)
      }
    })
  },
  updated() {
    this.updateSlotText()
  },

  beforeDestroy() {
    this.$select.removeOption(this)
  },

  methods: {
    updateSlotText() {
      // make slotText reactive
      this.slotText = this.$slots.default ? this.$slots.default[0].text : ''
    },
    contains(arr = [], target) {
      return arr.includes(target)
    },
    // option clicked
    setSelectedOption() {
      if (this.disabled) return
      this.$select.setSelectedOption(this)
    },
    activate() {
      if (this.disabled) return
      this.$select.setActiveOption(this)
    },
    isCurrentInSelectedOption() {
      return this.$select.selectedOptions.some(op => {
        return op.label === this._label && op.value === this._value
      })
    },
    scrollIntoView() {
      this.$el?.scrollIntoView?.({
        block: 'nearest'
      })
    }
  },

  render(h) {
    const {
      disabled,
      isActive,
      show,
      selected,
      activate,
      _label,
      setSelectedOption,
      $select,
      $slots
    } = this

    if (!show) return null

    const optionClass = {
      'c-select__option': true,
      'c-select__option--selected': selected,
      'c-select__option--disabled': disabled,
      'c-select__option--active': isActive
    }

    const selectedIcon = selected && $select.multiple && (
      <IconChecked class="c-select__selected-icon" />
    )
    return (
      <div
        role="option"
        {...{ attrs: disabled ? {} : { tabindex: -1 } }}
        aria-selected={selected}
        class={optionClass}
        onmousedown={e => e.preventDefault()}
        onclick={setSelectedOption}
        onmouseenter={activate}
      >
        {$slots.default || _label}
        {selectedIcon}
      </div>
    )
  }
}
