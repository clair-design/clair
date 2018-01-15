<template lang="pug">
.c-radio-group(
  :class="classNames"
)
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
    button: Boolean,
    size: String
  },
  inject: {
    $form: { default: null }
  },
  data () {
    return {
      name: randomString(),
      checkedIndex: -1
    }
  },
  computed: {
    classNames () {
      const { size, $form } = this
      const actualSize = size || ($form && $form.size)
      return `is-${actualSize}`
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
