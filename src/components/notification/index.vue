<template lang="pug">
transition(
  appear,
  name="notification"
  mode="out-in"
  type="transition"
  @before-enter="beforeEnter"
  @after-leave="afterLeave"
)
  div.c-notice__wrapper(
    v-show="visible"
    :style="classObj"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  )
    slot
    div
      .c-notice__header
        c-button.c-notice__close(
            v-if="closable"
            @click.stop="$emit('close')"
            icon="x"
            flat
          )
        span {{title}}
      .c-notice__body
        div(
          v-if='dangerouslySetInnerHTML'
          v-html='message'
        )
        div(v-else) {{ message }}
</template>

<script>
import { VueTypes } from '../../scripts/utils'
import zIndex from '../../scripts/utils/zIndexManager'

import './index.css'

export default {
  name: 'c-notification',
  props: {
    visible: VueTypes.bool,
    title: VueTypes.string,
    message: VueTypes.string,
    duration: VueTypes.number.def(4000),
    closable: VueTypes.bool.def(true),
    position: VueTypes.oneOf(['topRight', 'bottomRight', 'bottomLeft', 'topLeft']).def('topRight'),
    type: VueTypes.string,
    offset: VueTypes.number.def(0),
    dangerouslySetInnerHTML: VueTypes.bool.def(false)
  },
  data () {
    return {
      zIndex: zIndex.next(),
      timer: null
    }
  },
  computed: {
    classObj () {
      return {
        zIndex: zIndex,
        transform: `translateX(${this.position === 'topRight' || this.position === 'bottomRight' ? -this.offset : this.offset}px)`}
    }
  },
  methods: {
    beforeEnter () {
      if (this.duration) {
        // duration未被设置为0
        this.timer = setTimeout(_ => {
          this.$emit('close')
        }, this.duration)
      }
    },
    afterLeave () {
      this.$emit('after-leave')
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(_ => {
          this.$emit('close')
        }, this.duration)
      }
    }
  },
  destroyed () {
    this.clearTimer()
  }
}
</script>
