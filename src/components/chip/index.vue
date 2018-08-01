<template lang="pug">
.c-chip__wrapper(
  :class="classNames"
  :style="styleObj"
)
  span.c-chip__label(v-if="label") {{label}}
  slot(v-else)
  span(
      v-if="closable"
      @click.stop="$emit('close')"
  )
    c-icon(
      name="x"
      valign="middle"
    )
</template>

<script>
import VueTypes from '../../scripts/utils'
import './index.css'

export default {
  name: 'c-chip',
  props: {
    label: VueTypes.string,
    size: VueTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).def('md'),
    color: VueTypes.string,
    closable: VueTypes.bool.def(false)
  },
  data () {
    return {
      presetColors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'dark', 'black']
    }
  },
  computed: {
    classNames () {
      let classList = ``
      if (this.color && this.presetColors.indexOf(this.color) >= 0) {
        classList += ` c-chip--${this.color}`
      }
      if (this.closable) {
        classList += ' c-chip--closable'
      }
      if (this.size) {
        classList += ` c-chip--${this.size}`
      }
      return classList
    },
    styleObj () {
      let style = {}
      if (this.color && this.presetColors.indexOf(this.color) < 0) {
        style = {
          'backgroundColor': this.color
        }
      }
      return style
    }
  }
}
</script>
