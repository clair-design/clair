<template lang="pug">
label(
  @change="onChange"
  :class="classNames"
)
  input(
    type="radio"
    :name="name"
    :value="value"
    :disabled="disabled"
    :checked="value == checkedIndex"
  )
  span.c-radio__box
  span.c-radio__label {{ label }}
</template>

<script>
import './index.css'

export default {
  name: 'c-radio',
  model: {
    prop: 'checkedIndex'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    label: String,
    disabled: Boolean,
    button: Boolean,
    checkedIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    classNames () {
      const { button } = this
      const classes = button ? 'c-radio--button' : 'c-radio'
      return classes
    }
  },
  methods: {
    onChange (e) {
      this.$emit('input', this.value)
    }
  }
}
</script>
