<template lang="pug">
  div.c-checkbox-group
    c-checkbox(
      v-for="(option, index) in options"
      v-model="isChecked[index]"
      :label="option.label"
      :disabled="option.disabled"
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
  created () {
    Object.assign(this.rules, {
      required: required.bind(this),
      minItems: minItems.bind(this),
      maxItems: maxItems.bind(this)
    })
    this.updateChecked()
    this.$watch('options', this.updateChecked)
    this.$watch('isChecked', _ => {
      const checkedValues = this.options
        .filter((_, i) => this.isChecked[i])
        .map(option => option.value)
      this.$emit('input', checkedValues)
    })
  },
  methods: {
    updateChecked () {
      const isChecked = this.options.map(option => {
        return this.value.indexOf(option.value) > -1
      })
      this.isChecked = isChecked
    }
  }
}
</script>
