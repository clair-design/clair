<template lang="pug">
  label.c-checkbox(@change="onChange")
    input(
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="value"
    )
    span.c-checkbox__box
    span.c-checkbox__label {{ label }}
</template>

<script>
  // import css
  import './index.css'

  const name = 'c-checkbox'
  const props = {
    value: Boolean,
    name: String,
    label: String,
    disabled: Boolean
  }

  export default {
    name,
    props,
    methods: {
      onChange (e) {
        this.$emit('input', e.target.checked)
      }
    }
  }
</script>
