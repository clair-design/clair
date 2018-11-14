<template lang="pug">
.c-timepicker(@click="openTimePanel")
  .c-timepicker__icon.c-timepicker__hovericon(:class="sizeClassName"
  v-if="!disabled")
    c-icon(name="x-circle")
  .c-timepicker__icon(:class="sizeClassName")
    c-icon(type="feather" name="clock")
  c-input(
    v-model="showValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    @change="valueChange"
    )
  .c-timepicker__wrap(
    ref="timepickerPanel"
    :class="{show: isOpen}"
  )
    c-timepanel(
      :isShown="isOpen"
      :hour="hour"
      :minute="minute"
      :second="second"
      :defaultValue="defaultValue"
      @change="timeChange"
    )
</template>

<script>
import { VueTypes } from '@util'
import './index.css'
import { getScrollBarSize } from '@util'
import ZIndexManager from '../../scripts/utils/zIndexManager.js'

export default {
  name: 'c-timepicker',
  props: {
    value: String,
    size: String,
    format: {
      type: String,
      default: 'hh:mm:ss'
    },
    disabled: Boolean,
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
      second: '',
      lastValue: ''
    }
  },
  computed: {
    sizeClassName () {
      return this.size ? `is-size-${this.size}` : ''
    }
  },
  watch: {
    isOpen () {
      if (this.isOpen) {
        this.resize()
        this.lastValue = this.showValue
        window.addEventListener('mouseup', this.onBodyClick, true)
      } else {
        this.checkValue()
        window.removeEventListener('mouseup', this.onBodyClick, true)
      }
    },
    value (newVal) {
      if (newVal !== this.showValue) {
        this.showValue = newVal
        [this.hour, this.minute, this.second] = this.showValue ? this.showValue.split(':') : ['', '', '']
      }
    }
  },
  mounted () {
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
    valueChange (value) {
      console.log(value)
      if (this.showValue) {
        [this.hour, this.minute, this.second] = this.showValue.split(':')
      } else {
        this.hour = ''
        this.minute = ''
        this.second = ''
      }
    },
    checkValue () {
      console.log('check')
      if (this.second > 59 || this.minute > 59 || this.hour > 23) {
        this.showValue = this.lastValue
        // [this.hour, this.minute, this.second] = this.lastValue.split(':')
      }
    },
    timeChange ({ hour, minute, second }) {
      this.hour = hour
      this.minute = minute
      this.second = second
      this.showValue = `${this.hour}:${this.minute}:${this.second}`
    },
    onBodyClick (e) {
      const isInPicker = this.$el.contains(e.target)
      const isInPanel = this.timepickerPanel.contains(e.target)
      if (!isInPicker && !isInPanel) {
        this.$emit('change', this.showValue)
        this.close()
        this.$el.focus()
      }
    },
    close () {
      this.isOpen = false
    },
    openTimePanel () {
      if (this.disabled) return
      this.isOpen = true
      console.log('open time')
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
