<template lang="pug">
.c-base-range(
  ref="container",
  @mousedown.prevent="onMousedown"
)
  slot
  slot(name="thumb")
</template>

<script>
import './index.css'

import clamp from 'lodash/clamp'
import throttle from 'lodash/throttle'

const MOUSE_MOVE_DEFALT_TRHOTTLE_TIME = 80
const DELAY_TIME = 200

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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number
    }
  },

  data () {
    return {
      memo: null
    }
  },

  methods: {
    adjust (num) {
      const p = this.precision | 0
      return p > 0 ? parseFloat(num.toFixed(p)) : num
    },
    onMousedown (e) {
      if (this.disabled) {
        return
      }

      e.preventDefault()

      const timer = setTimeout(() => {
        this.$emit('dragstart')
      }, DELAY_TIME)

      const onmousemove = throttle(e => {
        e.preventDefault()
        this.updateValue(e)
      }, this.throttle)

      const onmouseup = e => {
        clearTimeout(timer)
        this.$emit('dragend')
        this.updateValue(e)
        document.removeEventListener('mousemove', onmousemove)
        document.removeEventListener('mouseup', onmouseup)
      }

      document.addEventListener('mousemove', onmousemove)
      document.addEventListener('mouseup', onmouseup)

      this.updateValue(e)
    },

    updateValue ({ clientX = 0, clientY = 0 } = {}) {
      const { $refs: { container }, memo } = this
      const rect = container.getBoundingClientRect()
      const { left, top, width, height } = rect

      const deltaX = clientX - left
      const deltaY = clientY - top

      const x = this.adjust(clamp(deltaX / width, 0, 1))
      const y = this.adjust(clamp(deltaY / height, 0, 1))

      const dir = this.direction
      // eslint-disable-next-line
      let data = null
      if (dir === 'vh') {
        if (memo && (memo.x === x && memo.y === y)) {
          return
        }

        data = { x, y }
      } else if (dir === 'v') {
        if (memo === y) {
          return
        }
        data = y
      } else {
        if (memo === x) {
          return
        }
        data = x
      }

      this.memo = data
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
