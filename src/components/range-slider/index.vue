<template lang="pug">
  c-base-range.c-range.is-bg-gray-2(
    :class="className",
    :direction="vertical ? 'v' : 'h'",
    @change="onRangeChange"
  )
    .c-range-thumb(
      slot="thumb",
      :style="thumbPos"
    )
    .c-range-progress.is-bg-blue-5(:style="progressPos")
</template>

<script>
  import './index.css'
  import baseRange from '../base-range/index.vue'

  import clamp from 'lodash/clamp'

  export default {
    name: 'c-range-slider',
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
        type: Number,
        default: 0
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        normorlizedValue: 0
      }
    },

    computed: {
      className () {
        const { vertical } = this
        return `c-range--${vertical ? 'vertical' : 'horizontal'}`
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
      value (newVal) {
        const { max, min } = this

        if (newVal !== clamp(newVal, min, max)) {
          throw new Error(`The value ${newVal} exceeded range` +
            ` [${min}, ${max}].`
          )
        }

        this.normorlizedValue = this.normalize(newVal)
      },
      nominal (val) {
        this.$emit('change', this.nominal)
      }
    }
  }
</script>

