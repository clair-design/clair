<template lang="pug">
.c-timepicker__timerange(@click="openPanel")
  .c-timerange__wrapper(
    :class="wrapperClassname"
  )
    c-input(
      v-model="startTime"
      placeholder="开始时间"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      @change="startInputChange"
    )
    span 至
    c-input(
      v-model="endTime"
      placeholder="结束时间"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      @change="endInputChange"
    )
  .c-timerange__panel(:class="{show: isOpen}")
    .c-timerange__container
      .c-timepicker__wrap
        p 开始时间
        c-timepanel(
          :isShown="isOpen"
          :hour="startHour"
          :minute="startMinute"
          :second="startSecond"
          :format="format"
          :secondStep="secondStep"
          :minuteStep="minuteStep"
          :hourStep="hourStep"
          :maxTime="endTime"
          @change="startTimeChange"
        )
      .c-timepicker__wrap
        p 结束时间
        c-timepanel(
          :isShown="isOpen"
          :hour="endHour"
          :minute="endMinute"
          :second="endSecond"
          :format="format"
          :minTime="startTime"
          :secondStep="secondStep"
          :minuteStep="minuteStep"
          :hourStep="hourStep"
          @change="endTimeChange"
        )
    .c-timerange__btns
      c-button(
        @click="confirmRange"
        size="sm"
        outline
        primary
      ) 确定
      c-button(
        size="sm"
        @click="cancel"
        outline
      ) 取消
</template>
<script>
import './index.css'
import { getScrollBarSize } from '@util'
import ZIndexManager from '../../scripts/utils/zIndexManager.js'
export default {
  name: 'c-timerange',
  props: {
    value: Array,
    format: String,
    readonly: Boolean,
    disabled: Boolean,
    size: String,
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
  data () {
    return {
      isOpen: false,
      startHour: '',
      startMinute: '',
      startSecond: '',
      endHour: '',
      endMinute: '',
      endSecond: '',
      timerange: '',
      startTime: '',
      endTime: ''
    }
  },
  computed: {
    wrapperClassname () {
      return [
        `is-size__${this.size}`,
        this.disabled ? 'disabled' : '',
        this.readonly ? 'readonly' : ''
      ]
    }
  },
  mounted () {
    if (typeof document === 'object') {
      this.timerange = this.$el.querySelector('.c-timerange__panel')
      document.body.appendChild(this.timerange)
      this.resize()
      window.addEventListener('resize', this.resize, false)
    }
    this.initTime()
  },
  watch: {
    value (newVal) {
      this.initTime()
    },
    isOpen () {
      if (this.isOpen) {
        this.resize()
        window.addEventListener('mouseup', this.onBodyClick, true)
      } else {
        window.removeEventListener('mouseup', this.onBodyClick, true)
      }
    }
  },
  methods: {
    initTime () {
      if (this.value.length === 2) {
        this.startTime = this.value[0]
        this.endTime = this.value[1]
      }
      if (this.startTime) {
        [this.startHour, this.startMinute, this.startSecond] = this.startTime.split(':')
      }
      if (this.endTime) {
        [this.endHour, this.endMinute, this.endSecond] = this.endTime.split(':')
      }
    },
    confirmRange () {
      // 验证数据合法性
      if (this.checkValue(this.startTime) && this.checkValue(this.endTime)) {
        this.emitEvent()
        this.close()
      } else {
        this.cancel()
      }
    },
    checkValue (value) {
      if (!value) return false
      const [hour, minute, second] = value.split(':')
      return !(second > 59 || minute > 59 || hour > 23)
    },
    cancel () {
      this.initTime()
      this.emitEvent()
      this.close()
    },
    openPanel () {
      if (this.disabled) return
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    onBodyClick (e) {
      const isInPicker = this.$el.contains(e.target)
      const isInPanel = this.timerange.contains(e.target)
      if (!isInPicker && !isInPanel) {
        this.confirmRange()
        this.$el.focus()
      }
    },
    getStyle () {
      const clientRect = this.$parent.$refs.timepicker.getBoundingClientRect()
      const windowH = window.innerHeight
      const windowW = window.innerWidth
      const marginTop = 2
      const scrollHeight = document.body.scrollWidth > window.innerWidth ? 20 : 0
      const droplistHeight = this.timerange.clientHeight
      const droplistWidth = this.timerange.clientWidth
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
        this.timerange.style.cssText = this.getStyle()
      })
    },
    generateValue (hour, minute, second) {
      const result = []
      hour && result.push(hour)
      minute && result.push(minute)
      second && result.push(second)
      return result.join(':')
    },
    valueRegValid (value) {
      const str = `^${this.format.replace(/\w/g, '\\d')}$`
      const reg = new RegExp(str)
      return reg.test(value)
    },
    startInputChange (value) {
      if (this.valueRegValid(value) && this.checkValue(value)) {
        [this.startHour, this.startMinute, this.startSecond] = value.split(':')
      }
    },
    endInputChange (value) {
      if (this.valueRegValid(value) && this.checkValue(value)) {
        [this.endHour, this.endMinute, this.endSecond] = value.split(':')
      }
    },
    startTimeChange ({ hour, minute, second }) {
      this.startHour = hour
      this.startMinute = minute
      this.startSecond = second
      this.startTime = this.generateValue(hour, minute, second)
    },
    endTimeChange ({ hour, minute, second }) {
      this.endHour = hour
      this.endMinute = minute
      this.endSecond = second
      this.endTime = this.generateValue(hour, minute, second)
    },
    emitEvent () {
      this.$emit('change', [this.startTime, this.endTime])
    }
  }
}
</script>
