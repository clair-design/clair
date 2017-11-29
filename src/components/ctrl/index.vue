<template lang="pug">
.c-ctrl(ref="container", :style="containerStyle", @mousedown.prevent="onMousedown")
  .c-ctrl__background
    slot
  .c-ctrl__pointer(ref="pointer", :style="pointerPos")
</template>

<script>
import './index.css'

import clamp from 'lodash/clamp'
import throttle from 'lodash/throttle'

const PRECISION = 3
const MOUSE_MOVE_TRHOTTLE_TIME = 80

const toPercentage = (n, precision = PRECISION) => {
// eslint-disable-next-line
  const num = (n * 100).toPrecision(precision | 0)
  return `${num}%`
}

export default {
  name: 'c-ctrl',
  props: {
    value: {
      type: [Array, Number],
      default () {
        return [0, 0]
      }
    },
    direction: {
      type: ['vh', 'v', 'h'],
      default: 'h'
    },
    width: [String, Number],
    height: [String, Number]
  },
  data () {
    return {
      pointerPos: {}
    }
  },
  computed: {
    containerStyle () {
      let { width, height } = this

      if (typeof Number(width) === 'number') {
        width = `${width}px`
      }

      if (typeof Number(height) === 'number') {
        height = `${height}px`
      }

      return Object.assign({}, width && {width}, height && {height})
    }
  },

  methods: {
    onMousedown (e) {
      this.updatePointerPostion(e)

      const onmousemove = throttle(e => {
        e.preventDefault()
        this.updatePointerPostion(e)
      }, MOUSE_MOVE_TRHOTTLE_TIME)

      const onmouseup = e => {
        this.updatePointerPostion(e)
        document.removeEventListener('mousemove', onmousemove)
        document.removeEventListener('mouseup', onmouseup)
      }

      document.addEventListener('mousemove', onmousemove)
      document.addEventListener('mouseup', onmouseup)
    },

    updatePointerPostion (e = {}) {
      const dir = this.direction
      const { top, left, marginTop, marginLeft } = this.calulatePosition(e)

      this.pointerPos = {
        top: dir.indexOf('v') > -1 ? top : 0,
        left: dir.indexOf('h') > -1 ? left : 0,
        marginTop: dir === 'h' ? marginTop : 0,
        marginLeft: dir === 'v' ? marginLeft : 0
      }
    },

    calulatePosition ({ clientX = 0, clientY = 0 } = {}) {
      const {
        left, top, width, height
      } = this.$refs.container.getBoundingClientRect()
      const deltaX = clientX - left
      const deltaY = clientY - top
      const x = clamp(deltaX / width, 0, 1)
      const y = clamp(deltaY / height, 0, 1)

      return {
        left: toPercentage(x),
        top: toPercentage(y),
        marginTop: `${height / 2}px`,
        marginLeft: `${width / 2}px`
      }
    }
  },

  mounted () {
    this.updatePointerPostion()
  }
}
</script>
