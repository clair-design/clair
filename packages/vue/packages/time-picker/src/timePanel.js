import {
  getSplitTime,
  hasTimeWithFormat,
  getTimeNum,
  splitTo2Character,
  MAX_TIME_NUMBER
} from './utils'
import { isNil } from '@clair/helpers'
export default {
  name: 'CTimePanel',
  props: {
    value: String,
    format: String,
    size: String,
    isVisible: Boolean,
    isRange: Boolean,
    hourList: Array,
    minuteList: Array,
    secondList: Array,
    pickerId: String,
    isTimeValid: {
      type: Boolean,
      default: true
    },
    minTime: {
      type: String
    },
    maxTime: {
      type: String
    },
    hourStep: {
      type: Number
    },
    minuteStep: {
      type: Number
    },
    secondStep: {
      type: Number
    }
  },
  data() {
    return {
      hour: '',
      minute: '',
      second: '',
      hasHour: true,
      hasMinute: true,
      hasSecond: true,
      minHour: 0,
      minMinute: 0,
      minSecond: 0,
      maxHour: 23,
      maxMinute: 59,
      maxSecond: 59
    }
  },
  computed: {
    time() {
      const hour =
        this.hasHour && !isNil(this.hour) ? splitTo2Character(this.hour) : ''
      const minute =
        this.hasMinute && !isNil(this.minute)
          ? `${splitTo2Character(this.minute)}`
          : ''
      const second =
        this.hasSecond && !isNil(this.second)
          ? `${splitTo2Character(this.second)}`
          : ''

      return [hour, minute, second].filter(item => item !== '').join(':')
    },
    popupClass() {
      return {
        'c-time-picker-popup': !this.isRange,
        [`c-time-picker-popup--${this.size}`]: !this.isRange,
        'c-time-picker-list-group': this.isRange
      }
    }
  },
  watch: {
    format: {
      immediate: true,
      handler(val) {
        const { hasHour, hasMinute, hasSecond } = hasTimeWithFormat(val)
        this.hasHour = hasHour
        this.hasMinute = hasMinute
        this.hasSecond = hasSecond
      }
    },
    minTime() {
      ;[this.minHour, this.minMinute, this.minSecond] = getSplitTime(
        this.minTime,
        this.format
      )
    },
    maxTime() {
      ;[this.maxHour, this.maxMinute, this.maxSecond] = getSplitTime(
        this.maxTime,
        this.format
      )
    },
    hour() {
      this.isVisible &&
        this.hasHour &&
        !isNil(this.hour) &&
        this.scrollToTop(this.$refs.hour, this.hour, this.hourStep)
    },
    minute() {
      this.isVisible &&
        this.hasMinute &&
        !isNil(this.minute) &&
        this.scrollToTop(this.$refs.minute, this.minute, this.minuteStep)
    },
    second() {
      this.isVisible &&
        this.hasSecond &&
        !isNil(this.second) &&
        this.scrollToTop(this.$refs.second, this.second, this.secondStep)
    },
    value: {
      handler(newVal) {
        this.valueChangeHandler(newVal)
      }
    },
    isVisible: {
      immediate: true,
      handler(visible) {
        if (visible) {
          this.$nextTick(() => {
            this.initActiveTime()
          })
        }
      }
    }
  },
  methods: {
    valueChangeHandler(newVal) {
      if (!newVal) {
        this.initTimeWithoutValue()
      } else if (this.isTimeValid) {
        ;[this.hour, this.minute, this.second] = getSplitTime(
          newVal,
          this.format
        )
      }
    },
    initTimeWithoutValue() {
      /**
       * 时间小于minTime，则取minTime
       * 时间大于maxTime，则取maxTime
       * 如果设置了step，向下取整，采用接近的时间
       */
      let hour = new Date().getHours()
      let minute = new Date().getMinutes()
      let second = new Date().getSeconds()
      const hourStr = splitTo2Character(hour)
      const minuteStr = splitTo2Character(minute)
      const secondStr = splitTo2Character(second)
      const currentTime = `${hourStr}:${minuteStr}:${secondStr}`
      const currentTimeNum = getTimeNum(currentTime, this.format)
      if (
        this.minTime &&
        currentTimeNum < getTimeNum(this.minTime, this.format)
      ) {
        hour = this.minHour
        minute = this.minMinute
        second = this.minSecond
      } else if (
        this.maxTime &&
        currentTimeNum > getTimeNum(this.maxTime, this.format)
      ) {
        hour = this.maxHour
        minute = this.maxMinute
        /* istanbul ignore next */
        second = this.maxSecond
      }
      this.hour =
        hour % this.hourStep === 0
          ? hour
          : Math.floor(hour / this.hourStep) * this.hourStep
      this.minute =
        minute % this.minuteStep === 0
          ? minute
          : Math.floor(minute / this.minuteStep) * this.minuteStep
      this.second =
        second % this.secondStep === 0
          ? second
          : Math.floor(second / this.secondStep) * this.secondStep
    },
    initLimitTime() {
      if (this.maxTime) {
        ;[this.maxHour, this.maxMinute, this.maxSecond] = getSplitTime(
          this.maxTime,
          this.format
        )
      }
      if (this.minTime) {
        ;[this.minHour, this.minMinute, this.minSecond] = getSplitTime(
          this.minTime,
          this.format
        )
      }
    },
    isTimeDisabled(time, type) {
      const indexMap = {
        hour: 0,
        minute: 1,
        second: 2
      }
      const index = indexMap[type]
      const values = [this.hour, this.minute, this.second]
      values[index] = time
      const timeInNumber = getTimeNum(values.join(':'), this.format)
      const minTimeInNumber = getTimeNum(this.minTime, this.format)
      const maxTimeInNumber =
        getTimeNum(this.maxTime, this.format) || MAX_TIME_NUMBER
      return timeInNumber < minTimeInNumber || timeInNumber > maxTimeInNumber
    },
    generateList({ list, activeItem, step, ref }) {
      return (
        <ul role="listbox" ref={ref}>
          {list.map(item => {
            const isDisabled = this.isTimeDisabled(item, ref)
            return (
              <li
                role="option"
                aria-selected={item === splitTo2Character(activeItem)}
                aria-disabled={isDisabled}
                on-click={this.scrollToActive.bind(this, { item, step, ref })}
              >
                {item}
              </li>
            )
          })}
        </ul>
      )
    },
    scrollToActive({ item, step, ref }, e) {
      const isDisabled = this.isTimeDisabled(item, ref)
      if (isDisabled) return
      this[ref] = Number(item)
      const parentEl = e.target.parentElement
      /* istanbul ignore next */
      this.$nextTick(() => {
        /* istanbul ignore next */
        this.$emit('change', this.time)
      })
      this.scrollToTop(parentEl, item, step)
    },
    scrollToTop(el, item, step) {
      const [liItem] = el?.firstElementChild?.getClientRects()
      const { height = 28 } = liItem
      /* istanbul ignore next */
      el.scrollTop = (parseInt(item) / step) * height
    },
    initActiveTime() {
      this.hasHour &&
        this.scrollToTop(this.$refs.hour, this.hour, this.hourStep)
      this.hasMinute &&
        this.scrollToTop(this.$refs.minute, this.minute, this.minuteStep)
      this.hasSecond &&
        this.scrollToTop(this.$refs.second, this.second, this.secondStep)
    }
  },
  mounted() {
    this.initLimitTime()
    this.valueChangeHandler(this.value)
  },
  render() {
    const hourNode = this.hasHour
      ? this.generateList({
          list: this.hourList,
          activeItem: this.hour,
          step: this.hourStep,
          ref: 'hour'
        })
      : ''
    const minuteNode = this.hasMinute
      ? this.generateList({
          list: this.minuteList,
          activeItem: this.minute,
          step: this.minuteStep,
          ref: 'minute'
        })
      : ''
    const secondNode = this.hasSecond
      ? this.generateList({
          list: this.secondList,
          activeItem: this.second,
          step: this.secondStep,
          ref: 'second'
        })
      : ''

    return (
      <div class={this.popupClass} id={this.pickerId} v-show={this.isVisible}>
        {hourNode} {minuteNode} {secondNode}
      </div>
    )
  }
}
