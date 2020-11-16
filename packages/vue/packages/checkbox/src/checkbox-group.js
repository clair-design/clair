import { AutoIncreasingCounter } from '@clair/helpers'
import CCheckbox from './checkbox'

const autoIncrCounter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CCheckboxGroup',

  provide() {
    return {
      $checkboxGroup: this
    }
  },

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    name: {
      type: String,
      default() {
        return `checkbox-${autoIncrCounter.next()}`
      }
    },
    disabled: Boolean,
    value: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      checkedValuesSet: new Set(this.value)
    }
  },

  computed: {
    checkboxVNodes() {
      const { options } = this

      if (!Array.isArray(options)) return null

      if (Array.isArray(options)) {
        return options.map(({ value, label, disabled }, i) => {
          return (
            <CCheckbox disabled={disabled} value={value} key={i}>
              {label}
            </CCheckbox>
          )
        })
      }
    },
    checkedValues() {
      return Array.from(this.checkedValuesSet)
    }
  },

  created() {
    this.$watch('options', this.onPropsChange)
    this.$watch('value', this.onPropsChange)
  },

  methods: {
    onPropsChange() {
      this.checkedValuesSet = new Set(this.value)
    },
    changeHandler(isChecked, value) {
      if (isChecked) {
        this.checkedValuesSet.add(value)
      } else {
        this.checkedValuesSet.delete(value)
      }
      // force to update set reference
      this.checkedValuesSet = new Set(this.checkedValuesSet)
      this.$emit('update:value', this.checkedValues)
      // ! only shallow copy here
      this.$emit('change', { target: { value: [...this.checkedValues] } })
    }
  },

  render(h) {
    return (
      <div class="c-checkbox-group" role="group">
        {this.checkboxVNodes}
        {this.$slots.default}
      </div>
    )
  }
}
