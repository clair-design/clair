<template lang="pug">
.c-steps-container(
  :class="className"
  :active="active"
)
  slot
</template>

<script>
import { VueTypes } from '../../scripts/utils'

import './index.css'

export default {
  name: 'c-steps',
  props: {
    direction: VueTypes.oneOf(['vertical', 'horizontal']).def('horizontal'),
    active: VueTypes.number.def(1)
  },
  data () {
    return {
      steps: []
    }
  },
  computed: {
    className () {
      return this.direction === 'vertical' ? 'c-steps-vertical' : 'c-steps-horizontal'
    }
  },
  methods: {},
  watch: {
    steps (steps) {
      steps.forEach((child, index) => {
        child.index = index
      })
    }
  }
}
</script>
