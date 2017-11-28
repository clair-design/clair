<template lang="pug">
  div.c-checkbox-group
    c-checkbox(
      v-for="(option, index) in optionList"
      v-model="isChecked[index]"
      :label="option.label"
      :disabled="option.disabled"
      @change="onItemChange($event, index)"
    )
    em.c-error-msg(v-if="!validity.valid") {{validity.msg}}
</template>

<script>
import validatable from '../validatable/'

const name = 'c-checkbox-group'
const pass = { valid: true, msg: '' }

// 必填检查
const required = function (value) {
  if (!this.required) return pass
  const valid = Array.isArray(value) && value.length > 0
  const msg = valid ? '' : '请至少选择一项'
  return { valid, msg }
}

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
  required: Boolean,
  minItems: Number,
  maxItems: Number,
  options: {
    type: Array,
    required: true,
    default () { return [] }
  }
}

export default {
  name,
  props,
  mixins: [validatable],
  data () {
    return {
      isChecked: [],
      rules: {}
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
      required: required.bind(this),
      minItems: minItems.bind(this),
      maxItems: maxItems.bind(this)
    })
    this.updateChecked()
    this.$watch('options', this.updateChecked)
    this.$watch('value', this.updateChecked)
  },
  methods: {
    updateChecked () {
      const isChecked = this.optionList.map(option => {
        return this.value.indexOf(option.value) > -1
      })
      this.isChecked = isChecked
    },

    onItemChange (checked, index) {
      const isChecked = [...this.isChecked]
      isChecked[index] = checked

      const checkedValues = this.optionList
        .filter((_, i) => isChecked[i])
        .map(option => option.value)

      this.$emit('input', checkedValues)
      this.$emit('change', checkedValues)
    }
  }
}
</script>
