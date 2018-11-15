<template lang="pug">
  .c-timepicker__panel(v-show="isShown")
    .c-timepicker__item(v-show="hasHour")
      ul.c-hour
        li(v-for="item in hours"
          @click="hourClick($event, item)"
        ) {{item}}
    .c-timepicker__item(v-show="hasMinute")
      ul.c-minute
        li(v-for="item in minutes"
        @click="minuteClick($event, item)") {{item}}
    .c-timepicker__item(v-show="hasSecond")
      ul.c-second
        li(v-for="item in seconds"
        @click="secondClick($event, item)") {{item}}
</template>
<script>
export default {
  name: 'c-timepanel',
  props: {
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
      selectSecond: ''
    }
  },
  created () {
    this.hours = this.createArr(24, this.hourStep)
    this.minutes = this.createArr(60, this.minuteStep)
    this.seconds = this.createArr(60, this.secondStep)
  },
  mounted () {
    this.initTime()
  },
  watch: {
    hour (newVal, oldVal) {
      if (newVal === this.selectHour || !newVal) return
      this.selectHour = newVal
      this.addItemActive(this.$el.querySelector('.c-hour'), this.selectHour)
    },
    minute (newVal, oldVal) {
      if (newVal === this.selectMinute || !newVal) return
      this.selectMinute = newVal
      this.addItemActive(this.$el.querySelector('.c-minute'), this.selectMinute)
    },
    second (newVal, oldVal) {
      if (newVal === this.selectSecond || !newVal) return
      this.selectSecond = newVal
      this.addItemActive(this.$el.querySelector('.c-second'), this.selectSecond)
    },
    isShown (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.addItemActive(this.$el.querySelector('.c-hour'), this.selectHour)
          this.addItemActive(this.$el.querySelector('.c-minute'), this.selectMinute)
          this.addItemActive(this.$el.querySelector('.c-second'), this.selectSecond)
        })
      }
    }
  },
  methods: {
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
    addItemActive (parentEl, item) {
      this.removeClass(parentEl)
      const list = parentEl.children
      const itemHeight = 28
      const currentItem = list[parseInt(item)]
      currentItem.className = currentItem.className ? currentItem.className + ' active' : 'active'
      parentEl.parentElement.scrollTop = item * itemHeight
    },
    itemClick (e, item) {
      const parentEl = e.target.parentElement
      this.addItemActive(parentEl, item)
    },
    hourClick (e, item) {
      this.itemClick(e, item)
      this.selectHour = item
      this.$emit('change', {
        hour: this.selectHour,
        minute: this.selectMinute,
        second: this.selectSecond
      })
    },
    minuteClick (e, item) {
      this.itemClick(e, item)
      this.selectMinute = item
      this.$emit('change', {
        hour: this.selectHour,
        minute: this.selectMinute,
        second: this.selectSecond
      })
    },
    secondClick (e, item) {
      this.itemClick(e, item)
      this.selectSecond = item
      this.$emit('change', {
        hour: this.selectHour,
        minute: this.selectMinute,
        second: this.selectSecond
      })
    }
  }
}
</script>
