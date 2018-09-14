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
import { VueTypes } from '@util'
import validatable from '@scripts/mixins/validatable'
import resettable from '@scripts/mixins/resettable'

import './index.css'

const name = 'c-switch'

export default {
  name,
  props: {
    disabled: VueTypes.bool.def(false),
    checkedColor: VueTypes.string,
    uncheckedColor: VueTypes.string,
    checkedValue: VueTypes.any.def(true),
    uncheckedValue: VueTypes.any.def(false),
    value: VueTypes.any.def(false),
    size: VueTypes.string
  },
  mixins: [resettable, validatable],
  data () {
    return {
      name: 'c-switch',
      currentValue: false
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  created () {
    this.currentValue = this.value
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
      this.$emit('input', value)
    }
  }
}
</script>
