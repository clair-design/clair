<template lang="pug">
.c-timepicker(ref="timepicker")
  .c-timepicker__icon.c-timepicker__hovericon(
    :class="sizeClassName"
    @click="clear"
    v-if="!disabled")
    c-icon(name="x-circle")
  .c-timepicker__icon(
    :class="sizeClassName"
    @click="openTimePanel"
    )
    c-icon(type="feather" name="clock")
  c-timerange(
    :value="value"
    :readonly="readonly"
    :disabled="disabled"
    :size="size"
    v-if="timeType == 'timerange'"
    :format="format"
    @change="timerangeChange"
  )
  c-input(
    v-model="showValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :readonly="readonly"
    @click.native="openTimePanel"
    @change="valueChange"
    v-if="timeType=='timepicker'"
    )
  .c-timepicker__wrap(
    ref="timepickerPanel"
    v-if="timeType=='timepicker'"
    :class="{show: isOpen}"
  )
    c-timepanel(
      :isShown="isOpen"
      :hour="hour"
      :minute="minute"
      :second="second"
      :format="format"
      :minTime="minTime"
      :maxTime="maxTime"
      :secondStep="secondStep"
      :minuteStep="minuteStep"
      :hourStep="hourStep"
      :defaultValue="defaultValue"
      @change="timeChange"
    )
</template>

<script>
import './index.css'
import { getScrollBarSize } from '@util'
import ZIndexManager from '../../scripts/utils/zIndexManager.js'

export default {
  name: 'c-timepicker',
  props: {
    timeType: {
      type: String,
      default: 'timepicker'
    },
    value: [String, Array],
    minTime: String,
    maxTime: String,
    size: String,
    format: {
      type: String,
      default: 'hh:mm:ss'
    },
    secondStep: Number,
    minuteStep: Number,
    hourStep: Number,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: {
      type: String,
      default: '请输入时间'
    },
    defaultValue: [String, Date]
  },
  data () {
    return {
      timepickerPanel: '',
      showValue: '',
      isOpen: false,
      hour: '',
      minute: '',
      second: ''
    }
  },
  computed: {
    sizeClassName () {
      return [
        this.size ? `is-size-${this.size}` : '',
        this.disabled ? 'disabled' : ''
      ]
    },
    hasHour () {
      return this.format.toLowerCase().indexOf('h') > -1
    },
    hasMinute () {
      return this.format.toLowerCase().indexOf('m') > -1
    },
    hasSecond () {
      return this.format.toLowerCase().indexOf('s') > -1
    }
  },
  watch: {
    isOpen () {
      if (this.isOpen) {
        this.resize()
        window.addEventListener('mouseup', this.onBodyClick, true)
      } else {
        this.checkValue()
        window.removeEventListener('mouseup', this.onBodyClick, true)
      }
    },
    value (newVal) {
      if (newVal !== this.showValue && this.timeType !== 'timerange') {
        this.showValue = newVal
        if (this.showValue) {
          this.hour = this.showValue.split(':')[0]
          this.minute = this.showValue.split(':')[1]
          this.second = this.showValue.split(':')[2]
        }
      }
    }
  },
  mounted () {
    if (this.timeType === 'timerange') return
    this.showValue = this.value
    if (this.showValue) {
      [this.hour, this.minute, this.second] = this.showValue.split(':')
    }
    if (typeof document === 'object') {
      this.timepickerPanel = this.$el.querySelector('.c-timepicker__wrap')
      document.body.appendChild(this.timepickerPanel)
      this.resize()
      window.addEventListener('resize', this.resize, false)
    }
  },
  methods: {
    clear (e) {
      e.preventDefault()
      if (this.timeType === 'timerange') {
        this.$emit('input', ['', ''])
        this.$emit('change', ['', ''])
        return
      }
      this.showValue = ''
      this.hour = ''
      this.minute = ''
      this.second = ''
      this.emitEvent()
    },
    emitEvent () {
      this.$emit('input', this.showValue)
      this.$emit('change', this.showValue)
    },
    timerangeChange (range) {
      this.$emit('input', range)
      this.$emit('change', range)
    },
    valueChange (value) {
      if (/^\d{1,2}:\d{1,2}:\d{2}$/.test(value) && this.checkValue()) {
        this.hour = `0${value.split(':')[0]}`.slice(-2)
        this.minute = `0${value.split(':')[1]}`.slice(-2)
        this.second = `0${value.split(':')[2]}`.slice(-2)
      }
    },
    generateValue () {
      const result = []
      this.hasHour && result.push(this.hour)
      this.hasMinute && result.push(this.minute)
      this.hasSecond && result.push(this.second)
      return result.join(':')
    },
    updateTime () {
      const valueValid = this.hour || this.minute || this.second
      this.showValue = valueValid ? this.generateValue() : ''
    },
    checkValue () {
      const [hour, minute, second] = this.showValue.split(':')
      return !(second > 59 || minute > 59 || hour > 23)
    },
    timeChange ({ hour, minute, second }) {
      this.hour = hour
      this.minute = minute
      this.second = second
      this.showValue = this.generateValue()
      this.emitEvent()
    },
    onBodyClick (e) {
      const isInPicker = this.$el.contains(e.target)
      const isInPanel = this.timepickerPanel.contains(e.target)
      if (!isInPicker && !isInPanel) {
        this.updateTime()
        this.emitEvent()
        this.close()
        this.$el.focus()
      }
    },
    close () {
      this.isOpen = false
    },
    openTimePanel (e) {
      if (this.disabled) return
      this.isOpen = true
    },
    getStyle () {
      const clientRect = this.$el.getBoundingClientRect()
      const windowH = window.innerHeight
      const windowW = window.innerWidth
      const marginTop = 2
      const scrollHeight = document.body.scrollWidth > window.innerWidth ? 20 : 0
      const droplistHeight = this.timepickerPanel.clientHeight
      const droplistWidth = this.timepickerPanel.clientWidth
      const defaultTop = clientRect.top + clientRect.height + marginTop + window.pageYOffset
      const clientHeight = clientRect.height + marginTop

      const clientY = clientRect.y
      const compTop = windowH - droplistHeight - scrollHeight
      const marginRight = getScrollBarSize() + 5 // scrollbar width
      const left = droplistWidth + clientRect.left + marginRight + window.pageXOffset > windowW ? windowW - droplistWidth - marginRight : clientRect.left + window.pageXOffset
      const top = droplistHeight + clientHeight + clientY + scrollHeight > windowH ? compTop : defaultTop
      const zIndex = ZIndexManager.next()
      return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: ${zIndex};
      `
    },
    resize () {
      this.$nextTick(() => {
        this.timepickerPanel.style.cssText = this.getStyle()
      })
    }
  }
}
</script>
