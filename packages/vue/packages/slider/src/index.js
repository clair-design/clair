import Tooltip from 'packages/tooltip'
import {
  getDecimalsCount,
  updateValueByStep,
  getPropertyNameByMode
} from './utils'

const HUNDRED = 100
const ONE_PERCENT = 0.01
const VALUE_EVENT = 'update:value'

let mousemoveListenHandler = null

export default {
  name: 'CSlider',

  inject: {
    $formItem: { default: null }
  },

  model: {
    prop: 'value',
    event: VALUE_EVENT
  },

  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: mode => ['horizontal', 'vertical'].includes(mode)
    },
    step: {
      type: Number,
      default: 1,
      validator: step => step >= 0
    },
    showStepMark: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, Array],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tipFormat: {
      type: Function,
      default: value => value
    }
  },

  data() {
    return {
      startPosition: 0,
      startClientPosition: 0,
      newPosition: 0,
      currentPosition0: '0%',
      currentPosition1: '0%',
      tipTrigger: ['hover', 'focus'],
      dragging: false
    }
  },

  computed: {
    isRangeMode() {
      return Array.isArray(this.value)
    },
    sliderClass() {
      return {
        'c-slider': true,
        'c-slider--vertical': this.mode === 'vertical',
        'c-slider--disabled': this.disabled
      }
    },
    sliderWidth() {
      return this.$refs.slider.getBoundingClientRect()[this.sizeDimension]
    },
    maxSteps() {
      return Math.round((this.max - this.min) / this.step)
    },
    stepDecimalsCount() {
      return getDecimalsCount(this.step)
    },
    thumbOffsetPosition() {
      return getPropertyNameByMode('left', 'bottom', this.mode)
    },
    sizeDimension() {
      return getPropertyNameByMode('width', 'height', this.mode)
    },
    clientDirection() {
      return getPropertyNameByMode('clientX', 'clientY', this.mode)
    },
    progressBarOffsetPosition() {
      return getPropertyNameByMode('left', 'bottom', this.mode)
    },
    tipPosition() {
      return getPropertyNameByMode('top', 'right', this.mode)
    },
    progressBarStyle() {
      const sizeLength = this.isRangeMode
        ? `${
            parseFloat(this.currentPosition1) -
            parseFloat(this.currentPosition0)
          }%`
        : this.currentPosition0

      return {
        [this.sizeDimension]: sizeLength,
        [this.progressBarOffsetPosition]: this.isRangeMode
          ? this.currentPosition0
          : 0
      }
    },
    marksComponent() {
      if (!this.showStepMark) return null

      const marksCount = Math.ceil((this.max - this.min) / this.step) + 1
      const currentPosition0 = parseFloat(this.currentPosition0)
      const currentPosition1 = parseFloat(this.currentPosition1)

      const items = [...new Array(marksCount)].map((_, index) => {
        const position = (index / (marksCount - 1)) * HUNDRED
        const isActive = this.isRangeMode
          ? currentPosition0 <= position && currentPosition1 >= position
          : currentPosition0 >= position

        return (
          <div
            class={`c-slider__step-mark ${
              isActive ? 'c-slider__step-mark--active' : ''
            }`}
            style={{ [this.thumbOffsetPosition]: `${position}%` }}
          ></div>
        )
      })

      return <div class="c-slider__step-marks">{items}</div>
    }
  },

  mounted() {
    this.updateCurrentPosition(this.value)
  },

  methods: {
    handleEmit(value) {
      this.updateCurrentPosition(value)

      this.$emit(VALUE_EVENT, value)
      this.$emit('change', {
        target: { value }
      })
    },
    getPosition(value) {
      return ((value - this.min) * HUNDRED) / (this.max - this.min)
    },
    getThumbStyle(thumbIndex) {
      return {
        [this.thumbOffsetPosition]: this[`currentPosition${thumbIndex}`]
      }
    },
    getValuenow(thumbIndex) {
      if (this.isRangeMode) {
        return this.value[thumbIndex]
      }

      return this.value
    },
    tipFormatByThumbIndex(thumbIndex) {
      const value = this.isRangeMode ? this.value[thumbIndex] : this.value

      return this.tipFormat(value)
    },
    updateCurrentPosition(value) {
      const values = this.isRangeMode ? value : [value]

      values.forEach((item, index) => {
        this[`currentPosition${index}`] = `${this.getPosition(item)}%`
      })

      // dispatch scroll event to trigger update of tooltip
      // here try not to invoke global scroll event listener
      // to reduce computation waste
      // aka, window.addEventListener('scroll', function)
      document.body.dispatchEvent(
        new Event('scroll', {
          bubbles: false
        })
      )
    },
    handleKeydown(event, thumbIndex) {
      event.preventDefault()
      if (this.readonly || this.disabled) return

      if (!this.isRangeMode) {
        this.handleEmit(updateValueByStep(event, this.value, this.step))
        return
      }

      const isInvalidKey =
        this.value[0] === this.value[1] &&
        [
          ['ArrowRight', 'ArrowUp'],
          ['ArrowLeft', 'ArrowDown']
        ][thumbIndex].includes(event.code)

      if (isInvalidKey) return

      this.handleEmit(
        [
          [updateValueByStep(event, this.value[0], this.step), this.value[1]],
          [this.value[0], updateValueByStep(event, this.value[1], this.step)]
        ][thumbIndex]
      )
    },
    handleMouseDown(event, thumbIndex) {
      if (this.readonly || this.disabled) return

      this.startPosition = parseFloat(this[`currentPosition${thumbIndex}`])
      this.startClientPosition = event[this.clientDirection]
      this.tipTrigger = ['focus']

      mousemoveListenHandler = event => {
        this.handleDragging(event, thumbIndex)
      }

      window.addEventListener('mousemove', mousemoveListenHandler)
      window.addEventListener('mouseup', this.handleDragEnd)
    },
    handleDragging(event, thumbIndex) {
      this.dragging = true

      const clientMoveDistance =
        this.mode === 'horizontal'
          ? event[this.clientDirection] - this.startClientPosition
          : this.startClientPosition - event[this.clientDirection]

      const moveDistance = (clientMoveDistance * HUNDRED) / this.sliderWidth
      const newPosition = this.startPosition + moveDistance

      this.setPosition(parseFloat(newPosition), thumbIndex)
    },
    handleDragEnd() {
      this.tipTrigger = ['hover', 'focus']
      this.dragging = false

      window.removeEventListener('mousemove', mousemoveListenHandler)
      window.removeEventListener('mouseup', this.handleDragEnd)
    },
    setPosition(position, thumbIndex) {
      /**
       * Position should be between [0, 100],
       * this distance is calculated as 100 parts
       */
      // eslint-disable-next-line
      const fixedPosition = Math.max(0, Math.min(position, HUNDRED))

      // Value at the mouse pointer
      const fixedPositionPercent = fixedPosition * ONE_PERCENT
      const moveValue = this.min + (this.max - this.min) * fixedPositionPercent

      // According to the step to fix value
      let fixedValue =
        Math.min(
          Math.round((moveValue - this.min) / this.step),
          this.maxSteps
        ) *
          this.step +
        this.min

      // Fix floating point number precision problem.
      fixedValue = Number(fixedValue.toFixed(this.stepDecimalsCount))

      if (!this.isRangeMode) {
        this.handleEmit(fixedValue)
        return
      }

      const value0 = thumbIndex === 0 ? fixedValue : this.value[0]
      const value1 = thumbIndex === 1 ? fixedValue : this.value[1]

      // Can only move to two values are equal
      if (
        value0 > value1 ||
        (value0 === this.value[0] && value1 === this.value[1])
      ) {
        return
      }

      this.handleEmit([value0, value1])
    },
    handleBlur() {
      this.$formItem?.handleFormItemBlur()
    }
  },

  watch: {
    value(newValue) {
      this.$formItem?.handleFormItemChange()
      if (this.dragging) return

      const values = this.isRangeMode ? newValue : [newValue]

      values.forEach((item, index) =>
        this.setPosition(this.getPosition(item), index)
      )
    }
  },

  render(h) {
    return (
      <div class={this.sliderClass} ref="slider">
        <div class="c-slider__background-bar">
          {this.marksComponent}

          <div class="c-slider__progress-bar" style={this.progressBarStyle} />

          {(this.isRangeMode ? ['', ''] : ['']).map((_, index) => {
            return (
              <Tooltip
                ref="tooltip"
                trigger={this.tipTrigger}
                placement={this.tipPosition}
              >
                <template slot="content">
                  {this.tipFormatByThumbIndex(index)}
                </template>
                <button
                  style={this.getThumbStyle(index)}
                  class="c-slider__thumb"
                  role="slider"
                  type="button"
                  disabled={this.disabled}
                  aria-valuemin={this.min}
                  aria-valuenow={this.getValuenow(index)}
                  aria-valuemax={this.max}
                  aria-valuetext={this.tipFormatByThumbIndex(index)}
                  aria-orientation={this.mode}
                  on-mousedown={event => this.handleMouseDown(event, index)}
                  on-blur={this.handleBlur}
                  vOn:keydown_left={event => this.handleKeydown(event, index)}
                  vOn:keydown_right={event => this.handleKeydown(event, index)}
                  vOn:keydown_up={event => this.handleKeydown(event, index)}
                  vOn:keydown_down={event => this.handleKeydown(event, index)}
                />
              </Tooltip>
            )
          })}
        </div>
      </div>
    )
  }
}
