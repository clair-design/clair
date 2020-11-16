import { isArray, isEmpty } from 'lodash-es'
import Input from 'packages/input'
import TimePanel from './timePanel'
import { IconMinus, IconClock, IconClear } from 'packages/icon'
import Popover from 'packages/popover'
import {
  checkTime,
  createArr,
  hasTimeWithFormat,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  splitTo2Character
} from './utils'
import { AutoIncreasingCounter } from '@clair/helpers'

const counter = /*@__PURE__*/ new AutoIncreasingCounter()

const validTimePickerSizes = ['large', 'normal', 'small']
export default {
  name: 'CTimePicker',
  model: {
    prop: 'value',
    event: 'input:value'
  },
  props: {
    value: [String, Array],
    isRange: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入时间'
    },
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    minTime: {
      type: String
    },
    maxTime: {
      type: String
    },
    format: {
      type: String,
      default: 'hh:mm:ss'
    },
    size: {
      type: String,
      default: 'normal',
      validator(size) {
        return validTimePickerSizes.includes(size)
      }
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    }
  },
  inject: {
    $formItem: {
      default: null
    }
  },
  data() {
    return {
      time: '',
      startTime: '',
      endTime: '',
      isVisible: false,
      timeElm: null,
      dropdownElm: null,
      panelStyle: {},
      counter: counter.next(),
      isHovering: false
    }
  },
  computed: {
    startPickerId() {
      return `c-start-time-${this.counter}`
    },
    endPickerId() {
      return `c-end-time-${this.counter}`
    },
    timePickerId() {
      return `c-timepicker-${this.counter}`
    },
    pickerId() {
      return `c-picker-${this.counter}`
    },
    hourList() {
      return createArr(HOURS_PER_DAY, this.hourStep)
    },
    minuteList() {
      return createArr(MINUTES_PER_HOUR, this.minuteStep)
    },
    secondList() {
      return createArr(SECONDS_PER_MINUTE, this.secondStep)
    },
    timeRange() {
      return [this.startTime, this.endTime]
    },
    isTimeValid() {
      return this.checkTimeValid({ time: this.time })
    },
    isStartTimeValid() {
      return this.checkTimeValid({
        time: this.startTime,
        min: this.minTime,
        max: this.endTime
      })
    },
    isEndTimeValid() {
      return this.checkTimeValid({
        time: this.endTime,
        min: this.startTime,
        max: this.maxTime
      })
    },
    timeRangeClass() {
      return {
        'c-time-picker-range': Boolean(this.isRange),
        [`c-time-picker-range--${this.size}`]: true
      }
    },
    timePickerClass() {
      return {
        'c-input-affix-container--disabled': Boolean(this.disabled)
      }
    },
    popupRangeClass() {
      return {
        'c-time-picker-popup': true,
        'c-time-picker-popup--range': true,
        [`c-time-picker-popup--${this.size}`]: true
      }
    },
    canBeCleared() {
      if (this.disabled) {
        return false
      }
      if (this.isVisible) {
        if (this.isRange) {
          return this.timeRange.some(Boolean)
        }
        // when showing panel, input's value is decisive factor
        return Boolean(this.time)
      }
      if (!this.isHovering) {
        return false
      }
      // or time-picker needs to have value and being hovered
      // `have value` can also mean there are values stored by input
      if (this.isRange) {
        return this.value?.some(Boolean) ?? this.timeRange.some(Boolean)
      }
      return Boolean(this.value ?? this.time)
    },
    timePickerIcon() {
      return (
        <div class="c-time-picker__icon">
          <IconClock v-show={!this.canBeCleared}></IconClock>
          <IconClear
            v-show={this.canBeCleared}
            on={{
              ['!click']: this.clearTime
            }}
          ></IconClear>
        </div>
      )
    }
  },
  watch: {
    value: {
      handler(val) {
        this.initTime(val)
      }
    },
    isVisible: {
      handler(visible) {
        if (!visible) {
          this.emitTime()
        }
      }
    }
  },
  mounted() {
    this.initTime(this.value)
    this.dropdownElm = this.$refs.timePanel
    this.timeElm = this.$el
  },
  methods: {
    initTime(value) {
      if (this.isRange) {
        const valueValid = isArray(value) && !isEmpty(value)
        if (valueValid) {
          ;[this.startTime, this.endTime] = value
        }
      } else {
        this.time = value
      }
    },
    createPanelProps({ value, min, max, pickerId }) {
      const props = Object.assign({}, this.$props, {
        value,
        pickerId,
        isVisible: this.isVisible,
        minTime: min,
        maxTime: max,
        hourList: this.hourList,
        minuteList: this.minuteList,
        secondList: this.secondList
      })
      return props
    },
    updateVisibility({ detail: { visible } }) {
      if (visible) {
        this.showTime()
      } else {
        this.hideTime()
      }
    },
    showTime() {
      if (this.disabled) return
      this.isVisible = true
    },
    hideTime() {
      this.isVisible = false
    },
    checkTimeValid({ time, minTime = this.minTime, maxTime = this.maxTime }) {
      const { valid, hour, minute, second } = checkTime({
        value: time,
        format: this.format,
        minTime: minTime,
        maxTime: maxTime
      })
      const { hasHour, hasMinute, hasSecond } = hasTimeWithFormat(this.format)
      const hourStr = splitTo2Character(hour)
      const minuteStr = splitTo2Character(minute)
      const secondStr = splitTo2Character(second)
      const canHourSelect = !hasHour || this.hourList.includes(hourStr)
      const canMinuteSelect = !hasMinute || this.minuteList.includes(minuteStr)
      const canSecondSelect = !hasSecond || this.secondList.includes(secondStr)
      return valid && canHourSelect && canMinuteSelect && canSecondSelect
    },
    emitTime() {
      if (this.isRange && isArray(this.value) && !isEmpty(this.value)) {
        const startInValid = this.startTime && !this.isStartTimeValid
        const endInValid = this.endTime && !this.isEndTimeValid
        const indecisiveEmpty =
          this.timeRange.some(Boolean) && !this.timeRange.every(Boolean)
        if (startInValid || endInValid || indecisiveEmpty) {
          ;[this.startTime, this.endTime] = this.value
        }
      } else if (this.time && !this.isTimeValid) {
        this.time = this.value
      }
      const value = this.isRange ? this.timeRange : this.time
      const isSameWithValue =
        value === this.value ||
        (this.isRange && this.value?.join('') === value.join(''))
      if (isSameWithValue) return
      this.$emit('input:value', value)
      this.$emit('change', {
        target: {
          value
        }
      })
      // form validation
      this.$formItem?.handleFormItemChange()
      this.$formItem?.handleFormItemBlur()
    },
    changeTime(time) {
      this.time = time
    },
    changeStartTime(time) {
      this.startTime = time
    },
    changeEndTime(time) {
      this.endTime = time
    },
    clearTime(e) {
      e?.stopPropagation?.()
      if (this.isRange) {
        this.startTime = ''
        this.endTime = ''
      } else {
        this.time = ''
      }
      if (!this.isVisible) {
        this.emitTime()
      } else {
        this.hideTime()
      }
    },
    updateHovering(isHovering) {
      this.isHovering = isHovering
    },
    renderTimePanel() {
      if (this.isRange) {
        return (
          <div
            id={this.timePickerId}
            role="listbox"
            class={this.popupRangeClass}
            ref="timePanel"
          >
            <TimePanel
              props={this.createPanelProps({
                value: this.startTime,
                min: this.minTime,
                max: this.endTime,
                pickerId: this.startPickerId
              })}
              isTimeValid={this.isStartTimeValid}
              on-change={this.changeStartTime}
            />
            <TimePanel
              props={this.createPanelProps({
                value: this.endTime,
                min: this.startTime,
                max: this.maxTime,
                pickerId: this.endPickerId
              })}
              isTimeValid={this.isEndTimeValid}
              on-change={this.changeEndTime}
            />
          </div>
        )
      }
      return (
        <div
          id={this.timePickerId}
          ref="timePanel"
          role="listbox"
          style={this.panelStyle}
          v-show={this.isVisible}
        >
          <TimePanel
            props={this.createPanelProps({
              value: this.time,
              min: this.minTime,
              max: this.maxTime,
              pickerId: this.pickerId
            })}
            isTimeValid={this.isTimeValid}
            isVisible={this.isVisible}
            on-change={this.changeTime}
          />
        </div>
      )
    }
  },
  render(h) {
    const event = {
      // click: this.showTime,
      mouseenter: this.updateHovering.bind(this, true),
      mouseleave: this.updateHovering.bind(this, false)
    }
    let children = ''
    if (this.isRange) {
      children = (
        <div
          role="combobox"
          aria-haspopup="true"
          aria-expanded={this.isVisible}
          aria-owns={this.timePickerId}
          class={this.timeRangeClass}
          aria-disabled={this.disabled}
          on={event}
        >
          <Input
            aria-autocomplete="list"
            aria-controls={this.startPickerId}
            v-model={this.startTime}
            disabled={this.disabled}
            size={this.size}
            placeholder={this.startPlaceholder}
          ></Input>
          <IconMinus class="c-time-picker__separator" />
          <Input
            aria-autocomplete="list"
            aria-controls={this.endPickerId}
            disabled={this.disabled}
            size={this.size}
            placeholder={this.endPlaceholder}
            v-model={this.endTime}
          />
          {this.timePickerIcon}
        </div>
      )
    } else {
      children = (
        <div
          class="c-time-picker"
          role="combobox"
          aria-haspopup="true"
          aria-expanded={this.isVisible}
          aria-owns={this.timePickerId}
          aria-disabled={this.disabled}
          on={event}
        >
          <Input
            aria-autocomplete="list"
            aria-controls={this.pickerId}
            class={this.timePickerClass}
            disabled={this.disabled}
            size={this.size}
            placeholder={this.placeholder}
            v-model={this.time}
          />
          {this.timePickerIcon}
        </div>
      )
    }
    return (
      <Popover
        trigger={['click', 'focus']}
        on-visibility-change={this.updateVisibility}
        visible={this.isVisible}
        placement="bottom-left"
        click-toggle={false}
        custom-style={{
          outline: 'none'
        }}
        show-triangle={false}
        show-delay={0}
        scopedSlots={{
          content: this.renderTimePanel
        }}
      >
        {children}
      </Popover>
    )
  }
}
