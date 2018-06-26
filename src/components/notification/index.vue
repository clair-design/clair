<template lang="pug">
transition(
  appear,
  name="notification",
  mode="out-in",
  type="transition",
  @before-enter="beforeEnter"
  @after-leave="afterLeave"
)
  div.c-notice__wrapper(
    v-show="visible",
    :style="{zIndex: zIndex, transform: `translateX(${this.position === 'topRight' || this.position === 'bottomRight' ? -this.offset : this.offset}px)`}"
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
          v-if='isDangerousHtml'
          v-html='message'
        )
        div(v-else) {{ message }}
</template>

<script>
import zIndex from '../../js/utils/zIndexManager'

import './index.css'

export default {
  name: 'c-notification',
  props: {
    visible: Boolean,
    title: String,
    message: String,
    duration: {
      type: Number,
      default: 4000
    },
    closable: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'topRight'
    },
    type: String,
    offset: {
      type: Number,
      default: 0
    },
    isDangerousHtml: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      zIndex: zIndex.next(),
      timer: null
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
