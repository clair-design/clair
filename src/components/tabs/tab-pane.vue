<template lang="pug">
div(
  :id="tabIndex"
  v-if="shownav"
  @click="handleClick"
  :aria-selected="active"
  :aria-controls="paneIndex"
  :class="[active ? 'is-active' : '']"
)
  slot {{ label }}
div(v-else)
  slot(v-if="active")
</template>

<script>
import { VueTypes } from '@util'
export default {
  name: 'c-tab-pane',
  props: {
    label: VueTypes.string,
    index: VueTypes.number,
    shownav: Boolean
  },
  computed: {
    active () {
      const active = this.$parent.currentIndex === this.index
      return active
    },
    tabIndex () {
      return `tab-${this.index}`
    },
    paneIndex () {
      return `pane-${this.index}`
    }
  },
  methods: {
    handleClick () {
      this.$emit('tabClicked', this.index)
    }
  }
}
</script>
