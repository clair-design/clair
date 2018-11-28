<template lang="pug">
div(
  v-if="shownav"
  @click="handleClick"
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
    }
  },
  methods: {
    handleClick () {
      this.$emit('tabClicked', this.index)
    }
  }
}
</script>
