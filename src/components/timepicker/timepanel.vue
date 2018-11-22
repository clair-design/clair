<template lang="pug">
  .c-timepicker__panel(v-show="isShown")
    .c-timepicker__item(v-show="hasHour")
      ul.c-hour
        li(v-for="item in hours"
          @click="hourClick($event, item)"
          :class="{'disabled': !!isHourDisabled(item)}"
        ) {{item}}
    .c-timepicker__item(v-show="hasMinute")
      ul.c-minute
        li(v-for="item in minutes"
        :class="{'disabled': !!isMinuteDisabled(item)}"
        @click="minuteClick($event, item)") {{item}}
    .c-timepicker__item(v-show="hasSecond")
      ul.c-second
        li(v-for="item in seconds"
        :class="{'disabled': !!isSecondDisabled(item)}"
        @click="secondClick($event, item)") {{item}}
</template>
<script>
export default {
  name: 'c-timepanel',
  props: {
    minTime: String,
    maxTime: String,
    isShown: Boolean,
    format: String,
    hour: [Number, String],
    minute: [Number, String],
    second: [Number, String],
    secondStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    hourStep: {
      type: Number,
      default: 1
    },
    defaultValue: String
  },
  computed: {
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
  data () {
    return {
      hours: [],
      minutes: [],
      secondes: [],
      selectHour: '',
      selectMinute: '',
      selectSecond: '',
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      minSecond: 0,
      maxSecond: 59
    }
  },
  created () {
    this.hours = this.createArr(24, this.hourStep)
    this.minutes = this.createArr(60, this.minuteStep)
    this.seconds = this.createArr(60, this.secondStep)
  },
  mounted () {
    this.initTime()
    this.generateMinTime()
    this.generateMaxTime()
  },
  watch: {
    minTime () {
      this.generateMinTime()
    },
    maxTime () {
      this.generateMaxTime()
    },
    hour (newVal, oldVal) {
      if (newVal === this.selectHour || !newVal) return
      this.selectHour = newVal
      this.addItemActive(this.$el.querySelector('.c-hour'), this.selectHour, this.hourStep)
    },
    minute (newVal, oldVal) {
      if (newVal === this.selectMinute || !newVal) return
      this.selectMinute = newVal
      this.addItemActive(this.$el.querySelector('.c-minute'), this.selectMinute, this.minuteStep)
    },
    second (newVal, oldVal) {
      if (newVal === this.selectSecond || !newVal) return
      this.selectSecond = newVal
      this.addItemActive(this.$el.querySelector('.c-second'), this.selectSecond, this.secondStep)
    },
    isShown (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.addItemActive(this.$el.querySelector('.c-hour'), this.selectHour, this.hourStep)
          this.addItemActive(this.$el.querySelector('.c-minute'), this.selectMinute, this.minuteStep)
          this.addItemActive(this.$el.querySelector('.c-second'), this.selectSecond, this.secondStep)
        })
      }
    }
  },
  methods: {
    generateMinTime () {
      if (this.minTime) {
        [this.minHour, this.minMinute, this.minSecond] = this.minTime.split(':')
      } else {
        this.minHour = 0
        this.minMinute = 0
        this.minSecond = 0
      }
      console.log(this.minHour, this.minMinute, this.minSecond)
    },
    generateMaxTime () {
      if (this.maxTime) {
        [this.maxHour, this.maxMinute, this.maxSecond] = this.maxTime.split(':')
      } else {
        this.maxHour = 23
        this.maxMinute = 59
        this.maxSecond = 59
      }
    },
    isHourDisabled (hour) {
      return hour < this.minHour || hour > this.maxHour
    },
    isMinuteDisabled (minute) {
      const isHourMinMax = this.selectHour === this.minHour || this.selectHour === this.maxHour
      const minuteUnvalid = minute < this.minMinute || minute > this.maxMinute
      return isHourMinMax && minuteUnvalid
    },
    isSecondDisabled (second) {
      const isHourMinMax = this.selectHour === this.minHour || this.selectHour === this.maxHour
      const isMinuteMinMax = this.selectMinute === this.minMinute || this.selectMinute === this.maxMinute
      const secondUnvalid = second < this.minSecond || second > this.maxSecond
      return isHourMinMax && isMinuteMinMax && secondUnvalid
    },
    initTime () {
      // defaultValue > step > now
      const hasSteps = this.secondStep > 1 || this.minuteStep > 1 || this.hourStep > 1
      const [hour, minute, second] = this.defaultValue ? this.defaultValue.split(':') : ['', '', '']
      const now = hasSteps ? new Date('2018/01/01') : new Date()
      const defaultHour = hour || now.getHours()
      const defaultMinute = minute || now.getMinutes()
      const defaultSecond = second || now.getSeconds()

      this.selectHour = this.hour || defaultHour
      this.selectMinute = this.minute || defaultMinute
      this.selectSecond = this.second || defaultSecond
    },
    createArr (N, step = 1) {
      const length = N / step
      return Array.from(new Array(length), (val, index) => ('0' + (index * step)).slice(-2))
    },
    removeClass (parentEl, className = 'active') {
      const list = parentEl.children
      for (let i = 0; i < list.length; i++) {
        list[i].className = list[i].className ? list[i].className.replace(className, '') : ''
      }
    },
    addItemActive (parentEl, item, step) {
      this.removeClass(parentEl)
      const list = parentEl.children
      const itemHeight = 28
      const currentItem = list[parseInt(item) / step]
      currentItem.className = currentItem.className ? currentItem.className + ' active' : 'active'
      parentEl.parentElement.scrollTop = item / step * itemHeight
    },
    emitChange () {
      this.$emit('change', {
        hour: this.hasHour ? this.selectHour : '',
        minute: this.hasMinute ? this.selectMinute : '',
        second: this.hasSecond ? this.selectSecond : ''
      })
    },
    itemClick (e, item, step) {
      const parentEl = e.target.parentElement
      this.addItemActive(parentEl, item, step)
    },
    hourClick (e, item) {
      if (this.isHourDisabled(item)) return
      this.itemClick(e, item, this.hourStep)
      this.selectHour = item
      this.emitChange()
    },
    minuteClick (e, item) {
      if (this.isMinuteDisabled(item)) return
      this.itemClick(e, item, this.minuteStep)
      this.selectMinute = item
      this.emitChange()
    },
    secondClick (e, item) {
      if (this.isSecondDisabled(item)) return
      this.itemClick(e, item, this.secondStep)
      this.selectSecond = item
      this.emitChange()
    }
  }
}
</script>
