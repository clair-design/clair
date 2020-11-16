import {
  IconStatusDanger,
  IconStatusSuccess,
  IconClose,
  IconChecked
} from 'packages/icon'

const DOUBLE = 2
const PERCENTAGE_VALUE = 100

const SAFE_NUMBER_MORE_THAN_DEFAULT_STROKE_WIDTH = 9999

const VIEWBOX_SIZE = 100
const SVG_BASE_RADIUS = VIEWBOX_SIZE / DOUBLE
const CIRCLE_NORMAL_DEFAULT_WIDTH = 120
const CIRCLE_SMALL_DEFAULT_WIDTH = 84
const CIRCLE_NORMAL_DEFAULT_STROKE_WIDTH = 6
const CIRCLE_SMALL_DEFAULT_STROKE_WIDTH = 4
// eslint-disable-next-line
const CIRCLE_PROGRESS_RATIO_OF_FONT_SIZE_AND_WIDTH = 1 / 6

const LINE_STROKE_WIDTH = 1
const CIRCLE_NORMAL_STROKE_WIDTH = 3
const CIRCLE_SMALL_STROKE_WIDTH = 2

const PRECISION = 3
const toFixed = v => parseFloat(v.toFixed(PRECISION))

export default {
  name: 'CProgress',

  props: {
    max: {
      type: Number,
      default: PERCENTAGE_VALUE
    },
    value: {
      type: Number,
      default: 0
    },
    type: {
      validator: v => ['line', 'circle'].includes(v),
      default: 'line'
    },
    size: {
      validator: v => ['normal', 'small'].includes(v),
      default: 'normal'
    },
    status: {
      validator: v => ['active', 'success', 'exception'].includes(v)
    },
    width: Number,
    strokeWidth: Number,
    strokeColor: String,
    showInfo: {
      type: Boolean,
      default: true
    },
    infoWidth: Number
  },

  computed: {
    safeWidth() {
      if (this.type === 'circle' && typeof this.width !== 'number') {
        return this.size === 'small'
          ? CIRCLE_SMALL_DEFAULT_WIDTH
          : CIRCLE_NORMAL_DEFAULT_WIDTH
      }
      return this.width
    },
    safeStrokeWidth() {
      if (this.type === 'circle' && typeof this.strokeWidth !== 'number') {
        return this.size === 'small'
          ? CIRCLE_SMALL_DEFAULT_STROKE_WIDTH
          : CIRCLE_NORMAL_DEFAULT_STROKE_WIDTH
      }
      return this.strokeWidth
    },
    percentage() {
      return toFixed((this.value / this.max) * PERCENTAGE_VALUE)
    },
    svgRelativeStrokeWidth() {
      return toFixed((this.safeStrokeWidth * PERCENTAGE_VALUE) / this.safeWidth)
    },
    svgRelativeR() {
      return toFixed(SVG_BASE_RADIUS - this.svgRelativeStrokeWidth / DOUBLE)
    },
    svgRelativeStrokeDasharray() {
      const circleLen = DOUBLE * Math.PI * this.svgRelativeR
      const lineLen = (this.percentage / PERCENTAGE_VALUE) * circleLen
      return `${toFixed(lineLen)} ${toFixed(circleLen)}`
    },
    circleTextFontSize() {
      return this.type === 'circle'
        ? Math.floor(
            this.safeWidth * CIRCLE_PROGRESS_RATIO_OF_FONT_SIZE_AND_WIDTH
          )
        : ''
    }
  },

  methods: {
    renderLineBar() {
      const { strokeWidth, strokeColor, percentage } = this
      const borderRadius = `${
        typeof strokeWidth === 'number'
          ? strokeWidth / DOUBLE
          : SAFE_NUMBER_MORE_THAN_DEFAULT_STROKE_WIDTH
      }px`
      const bgStyle = {
        height: `${strokeWidth}px`,
        borderRadius
      }
      const innerStyle = {
        width: `${percentage}%`,
        borderRadius,
        backgroundColor: strokeColor
      }
      return (
        <div class="c-progress__bg" style={bgStyle}>
          <div class="c-progress__inner" style={innerStyle} />
        </div>
      )
    },

    renderCircleBar() {
      const {
        strokeColor,
        svgRelativeR,
        svgRelativeStrokeWidth,
        svgRelativeStrokeDasharray
      } = this
      return (
        <svg
          class="c-progress__circle"
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        >
          <circle
            class="c-progress__bg"
            cx={SVG_BASE_RADIUS}
            cy={SVG_BASE_RADIUS}
            r={svgRelativeR}
            stroke-width={svgRelativeStrokeWidth}
            fill="none"
          />
          <circle
            class="c-progress__inner"
            cx={SVG_BASE_RADIUS}
            cy={SVG_BASE_RADIUS}
            r={svgRelativeR}
            style={{
              stroke: strokeColor
            }}
            stroke-width={svgRelativeStrokeWidth}
            stroke-dasharray={svgRelativeStrokeDasharray}
            fill="none"
          />
        </svg>
      )
    },

    renderTextContent() {
      const { status, type } = this
      const circleIconStyle = {
        strokeWidth:
          this.size === 'small'
            ? CIRCLE_SMALL_STROKE_WIDTH
            : CIRCLE_NORMAL_STROKE_WIDTH
      }
      const lineIconStyle = { strokeWidth: LINE_STROKE_WIDTH }
      let textContent = null
      if (this.$scopedSlots.default) {
        textContent = this.$scopedSlots.default({
          value: this.value,
          max: this.max
        })
      } else if (status === 'exception') {
        if (type === 'circle') {
          textContent = <IconClose style={circleIconStyle} />
        } else {
          textContent = <IconStatusDanger style={lineIconStyle} />
        }
      } else if (status === 'success') {
        if (type === 'circle') {
          textContent = <IconChecked style={circleIconStyle} />
        } else {
          textContent = <IconStatusSuccess style={lineIconStyle} />
        }
      } else {
        textContent = `${Math.floor(this.percentage)}%`
      }
      return textContent
    }
  },

  render() {
    const { status, type, size } = this

    const wrapStyle = { width: `${this.safeWidth}px` }
    if (type === 'circle') {
      wrapStyle.height = `${this.safeWidth}px`
    }

    return (
      <div
        class={[
          'c-progress',
          `c-progress--${type}`,
          size === 'small' ? `c-progress--${size}` : '',
          status ? `c-progress--${status}` : ''
        ]}
        style={wrapStyle}
        role="progressbar"
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax={this.max}
      >
        {type === 'circle' ? this.renderCircleBar() : this.renderLineBar()}
        {this.showInfo ? (
          <div
            class="c-progress__text"
            style={{
              width: type === 'circle' ? '' : `${this.infoWidth}px`,
              fontSize: `${this.circleTextFontSize}px`
            }}
          >
            {this.renderTextContent()}
          </div>
        ) : null}
      </div>
    )
  }
}
