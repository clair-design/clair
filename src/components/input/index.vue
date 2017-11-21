<template lang="pug">
  .c-input-wrap(:class="className")
    input.c-input(
      v-if="!multiLine"
      :type="type"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
      @change="onInput"
    )
    textarea.c-input(
      v-if="multiLine"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      @input="onInput"
      @change="onInput"
    )
    em.c-input__error(v-if="!validity.valid") {{validity.msg}}
</template>

<script>
  import './index.css'
  import validatable from '../validatable/'

  export default {
    name: 'c-input',
    props: {
      value: [String, Number],
      rules: Object,
      placeholder: String,
      size: String,
      width: String,
      readonly: Boolean,
      disabled: Boolean,
      multiLine: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      rows: {
        type: Number,
        default: 3
      },
      cols: {
        type: Number,
        default: 60
      },
      maxlength: [Number, String]
    },
    computed: {
      className () {
        const classNames = []
        if (!this.validity.valid) classNames.push('c-input--error')
        if (this.size) classNames.push(`is-${this.size}`)
        if (this.width) classNames.push(`is-${this.width}`)
        return classNames
      }
    },
    mixins: [validatable],
    methods: {
      onInput (e) {
        this.$emit('input', e.target.value)
      },
      onChange (e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>
