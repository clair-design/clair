<template lang="pug">
  label.c-checkbox(
    @change="onChange"
    :class="classNames"
  )
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
import resettable from '@scripts/mixins/resettable'
import validatable from '@scripts/mixins/validatable'

const name = 'c-checkbox'
const props = {
  value: Boolean,
  name: String,
  label: String,
  disabled: Boolean,
  size: String,
  indeterminate: Boolean
}

export default {
  name,
  model: {
    event: 'change'
  },
  props,
  inject: {
    $form: { default: null }
  },
  mixins: [resettable, validatable],
  computed: {
    classNames () {
      const { size, $form } = this
      const actualSize = size || ($form && $form.size)
      return actualSize ? `is-${actualSize}` : ''
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
    }
  }
}
</script>
