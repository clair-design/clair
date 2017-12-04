<template lang="pug">
.c-base-range(ref="container", @mousedown.prevent="onMousedown")
  slot
  slot(name="thumb")
</template>

<script>
import './index.css'

import clamp from 'lodash/clamp'
import throttle from 'lodash/throttle'

const MOUSE_MOVE_DEFALT_TRHOTTLE_TIME = 80

export default {
  name: 'c-base-range',
  model: { event: 'change' },
  props: {
    direction: {
      type: String,
      default: 'h'
    },
    throttle: {
      type: Number,
      default: MOUSE_MOVE_DEFALT_TRHOTTLE_TIME
    }
  },

  methods: {
    onMousedown (e) {
      e.preventDefault()

      const onmousemove = throttle(e => {
        e.preventDefault()
        this.updateValue(e)
      }, this.throttle)

      const onmouseup = e => {
        this.updateValue(e)
        document.removeEventListener('mousemove', onmousemove)
        document.removeEventListener('mouseup', onmouseup)
      }

      document.addEventListener('mousemove', onmousemove)
      document.addEventListener('mouseup', onmouseup)
      this.updateValue(e)
    },

    updateValue ({ clientX = 0, clientY = 0 } = {}) {
      const rect = this.$refs.container.getBoundingClientRect()
      const { left, top, width, height } = rect

      const deltaX = clientX - left
      const deltaY = clientY - top

      const x = clamp(deltaX / width, 0, 1)
      const y = clamp(deltaY / height, 0, 1)

      const dir = this.direction
      // eslint-disable-next-line
      const data = dir === 'vh' ? { x, y } : (dir === 'v' ? y : x)

      this.$emit('change', data)
    }
  },
  created () {
    const { direction } = this

    if (direction === 'hv') {
      this.direction = 'vh'
    }
  }
}
</script>
