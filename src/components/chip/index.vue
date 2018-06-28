<template lang="pug">
transition(
  appear,
  name="chip",
  mode="out-in",
  type="transition",
  @before-leave="beforeLeave"
)
  .c-chip__wrapper(
    :class="classNames"
    :style="styleObj"
  )
    slot(name="chip")
      span.c-chip__label {{label}}
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
import VueTypes from 'vue-types'
import './index.css'

export default {
  name: 'c-chip',
  props: {
    label: VueTypes.string,
    size: VueTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).def('md'),
    type: VueTypes.string,
    color: VueTypes.string,
    closable: VueTypes.bool.def(false)
  },
  data () {
    return {
    }
  },
  computed: {
    classNames () {
      let classList = ``
      if (this.type) {
        classList += ` c-chip--${this.type}`
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
      if (this.color) {
        style = {
          'backgroundColor': this.color
        }
      }
      return style
    }
  },
  methods: {
    beforeLeave () {
      this.$el.classList.add('animated')
      this.$el.classList.add('zoomOut')
    }
  }
}
</script>
