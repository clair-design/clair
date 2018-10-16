<template lang="pug">
.c-chip__wrapper(
  :class="classNames"
  :style="styleObj"
)
  slot
    span.c-chip__label {{label}}
  span(v-if="closable" @click.stop="$emit('close')")
    c-icon(name="x" valign="middle")
</template>

<script>
import { isSizeValid } from '@scripts/common'
import Icon from '../icon'
import './index.css'

const colorPresets = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'pink',
  'dark',
  'black'
]

export default {
  name: 'c-chip',

  components: {
    'c-icon': Icon
  },

  props: {
    size: {
      type: String,
      default: 'md',
      validator: isSizeValid
    },
    label: String,
    color: String,
    closable: Boolean
  },

  computed: {
    classNames () {
      const { color, size, closable } = this
      const isPresetColor = color && colorPresets.indexOf(color) > -1

      return [
        size ? `is-${size}` : '',
        closable ? 'c-chip--closable' : '',
        isPresetColor ? `c-chip--${color}` : ''
      ]
    },

    styleObj () {
      const { color } = this

      if (color && colorPresets.indexOf(color) === -1) {
        return {
          backgroundColor: color
        }
      }
      return null
    }
  }
}
</script>
