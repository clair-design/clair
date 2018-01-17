<template lang="pug">
  c-base-range.c-slider(
    :class="className",
    :direction="vertical ? 'v' : 'h'",
    :disabled="disabled",
    :style="height ? { height: height } : null",
    @change="onRangeChange",
    @dragstart="isDrag = true",
    @dragend="isDrag = false"
  )
    input(
      type="range",
      :value="nominal",
      :min="min",
      :max="max",
      :step="step",
      :disabled="disabled"
    )
    .c-slider__progress(:style="progressPos")
    ul.c-slider__marks
      li(
        v-for="mark in normalizedMarks",
        :style="`${vertical ? 'bottom' : 'left'}: ${mark.p}`"
      ) {{mark.n}}
    .c-slider__stops
      span(
        v-for="mark in normalizedMarks",
        :style="`${vertical ? 'bottom' : 'left'}: ${mark.p}`"
      )
    .c-slider__thumb(
      :class="{ 'c-slider__thumb--hover': !isDrag && isHover, 'c-slider__thumb--dragging': isDrag }"
      :style="thumbPos",
      @mouseenter="onThumbHover",
      @mouseleave="onThumbHoverout"
    )
      .c-slider__tip(role="tooltip", aria-hidden="true")
        | {{formmater(this.nominal, 'tip')}}
</template>

<script>
  import clamp from 'lodash/clamp'
  import VueTypes from 'vue-types'

  import './index.css'
  import baseRange from '../base-range/index.vue'

  const defaultHoverTimeout = 200

  export default {
    name: 'c-slider',
    components: {
      'c-base-range': baseRange
    },
    model: { event: 'change' },
    props: {
      min: VueTypes.number.def(0),
      max: VueTypes.number.def(100),
      step: VueTypes.number.def(1),
      value: VueTypes.oneOfType([Number, String]).def(0),
      marks: VueTypes.array,
      formmater: VueTypes.func.def(id => id),
      vertical: VueTypes.bool.def(false),
      disabled: VueTypes.bool.def(false),
      height: VueTypes.string
    },

    data () {
      return {
        normorlizedValue: 0,
        isHover: false,
        isDrag: false
      }
    },

    computed: {
      className () {
        const { vertical, disabled } = this
        return [
          `c-slider--${vertical ? 'vertical' : 'horizontal'}`,
          disabled ? 'c-slider--disabled' : ''
        ]
      },

      precision () {
        const [, fraction] = `${this.step}`.split('.')
        return fraction ? fraction.length : 0
      },

      /**
       * nominal value being denormalized
       */
      nominal () {
        return this.denormalize(this.normorlizedValue)
      },

      percentage () {
        const { nominal } = this
        const proportion = this.normalize(nominal)
        // eslint-disable-next-line
        return `${ proportion * 100}%`
      },

      thumbPos () {
        const { vertical, percentage } = this
        const key = vertical ? 'bottom' : 'left'
        const style = {}
        style[key] = percentage
        return style
      },

      progressPos () {
        const { vertical, percentage } = this
        const key = vertical ? 'height' : 'width'
        const style = {}
        style[key] = percentage
        return style
      },

      normalizedMarks () {
        const { marks, min, max, formmater } = this
        const arr = marks || [min, max]
        return arr.map(mk => {
          const mark = clamp(mk, min, max)

          return {
            // eslint-disable-next-line
            p: `${this.normalize(mark) * 100}%`,
            n: formmater ? formmater(mark, 'scale') : mark
          }
        })
      }
    },

    methods: {
      normalize (val) {
        const { min, max } = this
        const decimal = (val - min) / (max - min)
        return clamp(decimal, 0, 1)
      },
      denormalize (val) {
        const { min, max, step, precision } = this
        const range = (max - min)
        const nominal = min + Math.round(range * val / step) * step
        return parseFloat(nominal.toFixed(precision))
      },
      onRangeChange (e) {
        this.normorlizedValue = this.vertical ? 1 - e : e
      },

      onThumbHover () {
        if (this.isDrag) {
          return
        }
        this._hTid = setTimeout(() => {
          this.isHover = true
        }, defaultHoverTimeout)
      },

      onThumbHoverout () {
        clearTimeout(this._hTid)
        this.isHover = false
      }
    },

    created () {
      this.normorlizedValue = this.normalize(this.value)
      this.$emit('change', this.nominal)
    },

    watch: {
      value: {
        handler (newVal) {
          const { max, min } = this
          const val = Number(newVal)

          if (val !== clamp(val, min, max)) {
            throw new Error(`The value ${val} exceeded range` +
              ` [${min}, ${max}].`
            )
          }

          this.normorlizedValue = this.normalize(val)
        },
        immediate: true
      },
      nominal (val) {
        this.$emit('change', this.nominal)
      }
    }
  }
</script>

