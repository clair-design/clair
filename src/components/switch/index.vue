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
import { VueTypes } from '../../scripts/utils'

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
    size: VueTypes.string
  },
  data () {
    return {
      name: 'c-switch',
      checked: true,
      value: null
    }
  },
  created () {
    this.value = this.checkedValue
  },
  computed: {
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
      this.checked = !this.checked
      this.value = this.value === this.checkedValue ? this.uncheckedValue : this.checkedValue
      this.$emit('change', this.value)
    }
  }
}
</script>
