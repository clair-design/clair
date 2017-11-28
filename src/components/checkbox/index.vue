<template lang="pug">
  label.c-checkbox(@change="onChange", :class="className")
    input(
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="value"
      ref="input"
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
    disabled: Boolean,
    indeterminate: Boolean
  }

  export default {
    name,
    props,
    computed: {
      className () {
        if (this.indeterminate) {
          return 'c-checkbox__indeterminate'
        }
      }
    },
    watch: {
      indeterminate (newVal) {
        if (this.$refs.input) {
          this.$refs.input.indeterminate = Boolean(newVal)
        }
      }
    },
    mounted () {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = this.indeterminate
      }
    },
    methods: {
      onChange (e) {
        this.$emit('change', e.target.checked)
        this.$emit('input', e.target.checked)
      }
    }
  }
</script>
