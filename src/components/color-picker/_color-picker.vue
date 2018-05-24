<template>
  <div class="color-picker">
    <c-base-range
      direction="vh"
      :precision="2"
      :throttle="80"
      @change="onSaturationChange"
      class="color-picker__saturation"
    >
      <p class="saturation-mask__hue" :style="styles.saturationPane"></p>
      <p class="saturation-mask__white"></p>
      <p class="saturation-mask__black"></p>
      <p class="color-picker__thumb" :style="styles.saturationThumb"></p>
    </c-base-range>

    <div class="color-picker__ctrl-pane">
      <div class="flex-row">
        <div class="flex-item__w32">
          <div class="color-picker__previewer">
            <div class="color-picker__previewer__inner" :style="styles.preview"></div>
          </div>
        </div>

        <div class="flex-item__autofill">
          <c-base-range
            direction="h"
            :precision="2"
            :throttle="80"
            @change="onHueChange"
            class="color-picker__ctrl-bar controller-bar__hue"
          >
            <div class="color-picker__thumb" :style="styles.hueThumb"></div>
          </c-base-range>

          <c-base-range
            v-if="showAlphaTrack"
            direction="h"
            :precision="2"
            :throttle="80"
            @change="onAlphaChange"
            class="color-picker__ctrl-bar controller-bar__alpha"
          >
            <div class="color-picker__thumb" :style="styles.alphaThumb"></div>
            <div class="color-picker__ctrl-bar" :style="styles.alphaTrack"></div>
          </c-base-range>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import invariant from 'invariant'

import objectAssign from 'object-assign'
import parse2rgb from 'pure-color/parse'
import rgb2hsv from 'pure-color/convert/rgb2hsv'
import rgb2hex from 'pure-color/convert/rgb2hex'
import hsv2hsl from 'pure-color/convert/hsv2hsl'
import hsv2rgb from 'pure-color/convert/hsv2rgb'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

import './_color-picker.css'

export default {
  props: {
    color: VueTypes.string.def('#ff0000'),
    mode: VueTypes.oneOf([
      'rgb',
      'rgba',
      'hsl',
      'hsla',
      'hex'
    ]).def('rgba')
  },

  data () {
    return this.digestProp(this.color)
  },

  watch: {
    color: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          objectAssign(this, this.digestProp(newVal))
        }
      }
    },
    mode (newVal, oldVal) {
      if (newVal !== oldVal) {
        invariant(
          !(this.alpha < 1 && newVal.indexOf('a') === -1),
          `[ColorPicker] The given color has an alpha ` +
            `value of ${this.alpha}, while given mode is \`${newVal}\` which ` +
            `does not contain an \`a\``
        )
        this.emitChange()
      }
    },
    rgba: {
      immediate: true,
      handler (newVal, oldVal) {
        if (`${newVal}` !== `${oldVal}`) {
          this.emitChange()
        }
      }
    }
  },

  computed: {
    showAlphaTrack () {
      return this.mode.indexOf('a') === 3
    },

    hsva () {
      const { hue, alpha, saturation: { x, y } } = this
      return [
        hue * 360,
        x * 100,
        (1 - y) * 100,
        alpha
      ]
    },

    rgba () {
      const { alpha, hsva } = this
      const [r, g, b] = hsv2rgb(hsva)
      return [
        Math.round(r),
        Math.round(g),
        Math.round(b),
        alpha
      ]
    },

    hsla () {
      const { alpha, hsva } = this
      const [h, s, l] = hsv2hsl(hsva)
      return [
        Math.round(h),
        `${Math.round(s)}%`,
        `${Math.round(l)}%`,
        alpha
      ]
    },

    hex () {
      return rgb2hex(this.rgba)
    },

    previewBorderColor () {
      const [r, g, b] = this.rgba
      if ((r + g + b) / 3 > 235) {
        return `rgba(160,160,160,0.8)`
      }
      return 'transparent'
    },

    styles () {
      const { rgba, alpha, hue, saturation } = this
      const strRGB = rgba.slice(0, 3).join(', ')

      const strHueRGB = hsl2rgb([hue * 360, 100, 50])
        .map(v => Math.round(v))
        .join(', ')

      return {
        preview: {
          backgroundColor: `rgba(${rgba.join(', ')})`,
          borderColor: this.previewBorderColor
        },
        saturationPane: {
          backgroundColor: `rgb(${strHueRGB})`
        },
        saturationThumb: {
          left: toPercent(saturation.x),
          top: toPercent(saturation.y)
        },
        alphaTrack: {
          backgroundImage: `linear-gradient(to right, ` +
            `rgba(${strRGB}, 0) 0%, rgb(${strRGB}) 100%)`
        },
        alphaThumb: {
          left: toPercent(alpha)
        },
        hueThumb: {
          left: toPercent(hue)
        }
      }
    }
  },

  methods: {
    digestProp (val) {
      const rgba = parse2rgb(val)
      const alpha = rgba[3] == null ? 1 : rgba[3]
      const [hue, saturation, value] = rgb2hsv(rgba)

      // format of alpha: `.2f`
      // according to Chrome DevTool
      const _alpha = parseFloat(alpha.toFixed(2))

      invariant(
        !(_alpha < 1 && this.mode.indexOf('a') === -1),
        `[ColorPicker] The given color \`${val}\` has an alpha ` +
          `value of ${alpha}, while given mode is \`${this.mode}\` which ` +
          `does not contain an \`a\``
      )

      return {
        alpha: _alpha,

        hue: hue / 360,
        saturation: {
          x: saturation / 100,
          y: 1 - value / 100
        }
      }
    },
    onSaturationChange (e) {
      this.saturation = e
    },
    onHueChange (e) {
      this.hue = e
    },
    onAlphaChange (e) {
      // format of alpha: `.2f`
      // according to Chrome DevTool
      this.alpha = parseFloat(e.toFixed(2))
    },

    emitChange () {
      const { mode, alpha } = this

      if (mode === 'hex') {
        const { hex } = this
        const value = alpha === 1 ? hex.slice(0, 7) : hex
        this.$emit('change', value)
        return
      }

      const val = mode.indexOf('hsl') === 0 ? this.hsla : this.rgba
      const arr = mode.length === 3
        ? val.slice(0, 3)
        : val.slice(0, 3).concat(alpha)

      this.$emit('change', {
        literal: `${mode}(${arr.join(', ')})`,
        rgba: this.rgba,
        hsla: this.hsla
      })
    }
  }
}

function toPercent (n, precision = 3) {
  // eslint-disable-next-line
  const num = (n * 100).toPrecision(precision | 0)
  return `${num}%`
}
</script>
