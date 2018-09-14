<template lang="pug">
  label.c-checkbox(
    @change="onChange"
    :class="classNames"
  )
    input(
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="checked"
      ref="input"
    )
    span.c-checkbox__box
    span.c-checkbox__label
      slot {{ label }}
</template>

<script>
// import css
import './index.css'
import resettable from '../../scripts/mixins/resettable'
import validatable from '../../scripts/mixins/validatable'

const name = 'c-checkbox'
const props = {
  value: Boolean,
  name: String,
  label: [String, Number, Object],
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
    $form: { default: null },
    $checkboxGroup: { default: null }
  },
  mixins: [resettable, validatable],
  data () {
    return {
      checked: false
    }
  },
  computed: {
    classNames () {
      const { size, $form } = this
      const actualSize = size || ($form && $form.size)
      return actualSize ? `is-${actualSize}` : ''
    },
    groupCheckedValues () {
      return this.$checkboxGroup ? this.$checkboxGroup.checkedValues : []
    }
  },
  watch: {
    value: {
      handler (val) {
        this.checked = val
      },
      immediate: true
    },
    indeterminate (newVal) {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = Boolean(newVal)
      }
    },
    groupCheckedValues (newVal, oldVal) {
      if (newVal) {
        this.initChecked()
      }
    }
  },
  mounted () {
    if (this.$refs.input) {
      this.$refs.input.indeterminate = this.indeterminate
    }
    if (this.$checkboxGroup) {
      this.initChecked()
    }
  },
  methods: {
    onChange (e) {
      this.$checkboxGroup && this.$checkboxGroup.updateCheckedValues(e.target.checked, this.label)
      this.checked = e.target.checked
      this.$emit('change', e.target.checked)
    },
    initChecked () {
      const isChecked = this.groupCheckedValues.indexOf(this.label) > -1
      this.checked = isChecked
    }
  }
}
</script>
