import { IconStarFilled, IconHeart } from 'packages/icon'

export default {
  name: 'CRating',

  props: {
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'star'
    },
    color: {
      type: String,
      default: '#FFB409'
    },
    size: {
      type: Number,
      default: 16
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  model: {
    prop: 'value',
    event: 'checked'
  },

  computed: {
    classNames() {
      return ['c-rating', this.readonly && 'c-rating--readonly']
    },
    unitClassNames() {
      return ['c-rating__unit', this.type && `c-rating__unit--${this.type}`]
    },

    valueToUse() {
      return this.readonly ? this.value : Math.round(this.value)
    },

    percentToUse() {
      return Number.isInteger(this.value)
        ? ''
        : `${(this.value - Math.floor(this.value)).toFixed(2) * 100}%`
    }
  },

  watch: {
    value(nval) {
      this.activeIndex = nval
    }
  },

  data() {
    return {
      activeIndex: this.value,
      hoverIndex: -1,
      inActiveColor: '#EAEAEC',
      heartColor: '#FF6860',
      isHovering: false
    }
  },

  methods: {
    handleChange(index, e) {
      if (this.readonly) return false

      this.activeIndex = index + 1
      this.isHovering = false
      this.changeEventHandler(this.activeIndex, e)
    },
    handleHoverOver(index, e) {
      if (this.readonly) return false

      this.isHovering = true
      this.hoverIndex = index + 1
      this.hoverChangeEventHandler(this.hoverIndex, e)
    },
    changeEventHandler(item, e) {
      const param = {
        target: {
          value: parseFloat(item)
        },
        nativeEvent: e
      }
      this.$emit('checked', param.target.value)
      this.$emit('change', param)
    },
    hoverChangeEventHandler(item, e) {
      const param = {
        target: {
          value: parseFloat(item) || item
        },
        nativeEvent: e
      }
      this.$emit('hover-change', param)
    },
    parentElementHoverOutChange() {
      if (this.readonly) return false

      this.isHovering = false
      this.hoverIndex = -1
      this.hoverChangeEventHandler()
    }
  },

  render(h) {
    const {
      value,
      count,
      size,
      type,
      readonly,
      color,
      classNames,
      isHovering,
      hoverIndex,
      activeIndex,
      heartColor,
      inActiveColor,
      unitClassNames,
      percentToUse
    } = this
    const countArr = [...Array(count).keys()]

    return (
      <div
        aria-readonly={readonly}
        class={classNames}
        onmouseleave={this.parentElementHoverOutChange}
      >
        {countArr.map(item => {
          const _index = isHovering ? hoverIndex : activeIndex
          const _color = type === 'heart' ? heartColor : color
          const curColor = item < _index ? _color : inActiveColor
          const isPercent =
            readonly && percentToUse && item === Math.floor(value)

          return (
            <div
              class={unitClassNames}
              {...{
                style: {
                  fontSize: `${size}px`,
                  color: isPercent ? inActiveColor : curColor
                },
                on: {
                  click: e => this.handleChange(item, e),
                  mouseenter: e => this.handleHoverOver(item, e)
                }
              }}
            >
              {type === 'custom' ? (
                this.$scopedSlots.customChar()
              ) : (
                <span>
                  {type === 'star' ? <IconStarFilled /> : <IconHeart />}
                </span>
              )}
              {isPercent && (
                <span
                  class="c-rating__part"
                  style={{ width: percentToUse, color: curColor }}
                >
                  {type === 'custom' && this.$scopedSlots.customChar()}
                  {type === 'star' && <IconStarFilled class="c-icon-star" />}
                  {type === 'heart' && <IconHeart class="c-icon-heart" />}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}
