<template lang="pug">
.c-switch(
  :class="className"
  :activeColor="activeColor"
  :inActiveColor="inActiveColor"
)
  input.c-switch__checkbox(
    type="checkbox"
    :disabled="disabled"
    :checked="checked"
    :name="name"
    :value="value"
  )
  div.c-switch__layoutbox(
    @click.stop="toggle"
    :style="styleObj"
  )
</template>

<script>
import validatable from '@scripts/mixins/validatable'
import resettable from '@scripts/mixins/resettable'
import './index.css'

const name = 'c-switch'
export default {
  name,
  model: {
    event: 'change'
  },
  props: {
    disabled: Boolean,
    checkedColor: String,
    uncheckedColor: String,
    checkedValue: {
      default: true
    },
    uncheckedValue: {
      default: false
    },
    value: {
      default: false
    },
    size: String
  },
  mixins: [resettable, validatable],
  data () {
    return {
      name,
      currentValue: false
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  created () {
    const { value, checkedValue, uncheckedValue } = this
    this.currentValue = value ? checkedValue : uncheckedValue
  },
  computed: {
    checked () {
      return this.currentValue === this.checkedValue
    },
    styleObj () {
      let obj = {}
      if (this.checkedColor && this.checked) {
        obj.backgroundColor = this.checkedColor
        obj.borderColor = this.checkedColor
      }
      if (this.uncheckedColor && !this.checked) {
        obj.backgroundColor = this.uncheckedColor
        obj.borderColor = this.uncheckedColor
      }
      return obj
    },
    className () {
      if (this.size) {
        return ` c-switch--${this.size}`
      }
    }
  },
  methods: {
    toggle () {
      if (this.disabled) return
      const value = this.checked ? this.uncheckedValue : this.checkedValue
      this.currentValue = value
      this.$emit('change', value)
    }
  }
}
</script>
