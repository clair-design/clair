<template lang="pug">
.c-radio-group
  c-radio(
    v-for="(option, index) in options"
    :name="name"
    :value="index"
    :button="button"
    :label="option.label"
    :disabled="option.disabled"
    v-model="checkedIndex"
  )
</template>

<script>
import './index.css'
import { randomString } from '../../js/utils'

export default {
  name: 'c-radio-group',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Number, String, Object]
    },
    button: Boolean
  },
  data () {
    return {
      name: randomString(),
      checkedIndex: -1
    }
  },
  created () {
    this.updateChecked()
    this.$watch('options', this.updateChecked)
    this.$watch('checkedIndex', _ => {
      this.$emit('input', this.options[this.checkedIndex].value)
    })
  },
  methods: {
    updateChecked () {
      this.checkedIndex = this.options.findIndex(
        option => option.value === this.value
      )
    }
  }
}
</script>
