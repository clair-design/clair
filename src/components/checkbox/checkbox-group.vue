<template lang="pug">
  div.c-checkbox-group
    slot
      c-checkbox(
        v-for="(option, index) in optionList"
        :key="index"
        :label="option.value"
        :disabled="option.disabled"
      ) {{ option.label }}
    em.c-error-msg(v-if="!validity.valid") {{validity.msg}}
</template>

<script>
import validatable from '@scripts/mixins/validatable'
import Checkbox from './index'
const name = 'c-checkbox-group'
const pass = { valid: true, msg: '' }

// 最少选择X项
const minItems = function (value) {
  if (!this.minItems) return pass
  const valid = Array.isArray(value) && value.length >= this.minItems
  const msg = valid ? '' : `请至少选择${this.minItems}项`
  return { valid, msg }
}

// 最多选择X项
const maxItems = function (value) {
  if (!this.maxItems) return pass
  const valid = Array.isArray(value) && value.length <= this.maxItems
  const msg = valid ? '' : `最多可以选择${this.maxItems}项`
  return { valid, msg }
}

const props = {
  value: {
    type: Array,
    default () { return [] }
  },
  minItems: Number,
  maxItems: Number,
  options: {
    type: Array,
    required: false,
    default () { return [] }
  }
}

export default {
  name,
  components: {
    'c-checkbox': Checkbox
  },
  model: {
    event: 'change'
  },
  props,
  mixins: [validatable],
  provide () {
    return {
      '$checkboxGroup': this
    }
  },
  inject: {
    $form: { default: null }
  },
  data () {
    return {
      checkedValues: []
    }
  },
  computed: {
    optionList () {
      return this.options.map(item => {
        if (typeof item === 'string') {
          return {
            value: item,
            label: item
          }
        }

        if (item && typeof item === 'object') {
          if (item.hasOwnProperty('label') && item.hasOwnProperty('value')) {
            return item
          }
        }

        throw new TypeError('Type of option prop is invalid.')
      })
    }
  },
  created () {
    Object.assign(this.rules, {
      minItems: minItems.bind(this),
      maxItems: maxItems.bind(this)
    })
    this.onPropChange()
    this.$watch('options', this.onPropChange)
    this.$watch('value', this.onPropChange)
  },
  methods: {
    onPropChange () {
      // todo check options
      this.checkedValues = [...this.value]
    },

    updateCheckedValues (isChecked, value) {
      if (isChecked) {
        this.checkedValues.push(value)
      } else {
        const index = this.checkedValues.indexOf(value)
        this.checkedValues.splice(index, 1)
      }
      this.$emit('change', this.checkedValues)
    }

  }
}
</script>
