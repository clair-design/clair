<template lang="pug">
.c-radio-group(
  :class="classNames"
)
  c-radio(
    v-for="(option, index) in options"
    :key="index"
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
import { randomString } from '../../scripts/utils'
import validatable from '../../scripts/mixins/validatable'
import resettable from '../../scripts/mixins/resettable'

export default {
  name: 'c-radio-group',
  inject: {
    $form: { default: null }
  },
  mixins: [resettable, validatable],
  model: {
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Number, String, Object, Boolean]
    },
    button: Boolean,
    size: String
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
    this.$watch('value', this.updateChecked)
    this.$watch('checkedIndex', index => {
      const value = index > -1
        ? this.options[this.checkedIndex].value
        : this.value
      this.$emit('change', value)
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
