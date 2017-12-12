<template lang="pug">
  c-base-range.c-slider.is-bg-gray-2(
    :class="className",
    :direction="vertical ? 'v' : 'h'",
    @change="onRangeChange",
    :disabled="disabled",
    :style="height ? { height: height } : null"
  )
    input(
      type="range",
      :value="nominal",
      :min="min",
      :max="max",
      :step="step",
      :disabled="disabled"
    )
    .c-slider__progress.is-bg-blue-5(:style="progressPos")
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
    .c-slider__thumb(:style="thumbPos")
      .c-slider__tip {{formmater(this.nominal, 'tip')}}
</template>

<script>
  import clamp from 'lodash/clamp'

  import './index.css'
  import baseRange from '../base-range/index.vue'

  export default {
    name: 'c-slider',
    components: {
      'c-base-range': baseRange
    },
    model: { event: 'change' },
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: [Number, String],
        default: 0
      },
      marks: {
        type: Array
      },
      formmater: {
        type: Function,
        default: id => id
      },
      vertical: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      height: {
        type: String
      }
    },

    data () {
      return {
        normorlizedValue: 0
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

