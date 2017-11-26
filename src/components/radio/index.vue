<template lang="pug">
label(
  @change="onChange"
  :class="[button ? 'c-radio--button': 'c-radio']"
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
  methods: {
    onChange (e) {
      this.$emit('input', this.value)
    }
  }
}
</script>
