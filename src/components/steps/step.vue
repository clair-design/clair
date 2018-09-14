<template lang="pug">
.c-step(
  :class="className"
)
  .c-step-header
    .c-step-icon(
      v-if="icon"
    )
      <c-icon type="feather" :name="icon" />
    .c-step-icon(
      v-else
    )
      | {{ index + 1 }}
  .c-step-content
    .c-title
      slot {{ title }}
    .c-step-description(v-if="description")
      slot {{ description }}
</template>

<script>
import { VueTypes } from '@util'

import './index.css'

export default {
  name: 'c-step',
  props: {
    title: VueTypes.string,
    description: VueTypes.string,
    icon: VueTypes.string,
    iconPos: VueTypes.oneOf(['left', 'top']).def('top'),
    status: VueTypes.oneOf(['loading', 'success', 'warning', 'error', 'default']).def('default')
  },
  data () {
    return {
      index: -1
    }
  },
  created () {
    this.index = this.$parent.steps.indexOf(this)
  },

  beforeCreate () {
    this.$parent.steps.push(this)
  },

  computed: {
    className () {
      let classStr = `${this.iconPos}`
      if (this.index === this.$parent.active - 1) {
        classStr += ` active`
      }
      if (this.status) {
        classStr += ` ${this.status}`
      }
      return classStr
    }
  },
  methods: {}
}
</script>
