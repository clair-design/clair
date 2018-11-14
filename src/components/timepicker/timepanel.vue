<template lang="pug">
  .c-timepicker__panel(v-show="isShown")
    .c-timepicker__item.c-hour
      ul
        li(v-for="item in hours"
          @click="hourClick($event, item)"
        ) {{item}}
    .c-timepicker__item.c-minute
      ul
        li(v-for="item in minutes"
        @click="minuteClick($event, item)") {{item}}
    .c-timepicker__item.c-second
      ul
        li(v-for="item in seconds"
        @click="secondClick($event, item)") {{item}}
</template>
<script>
export default {
  name: 'c-timepanel',
  props: {
    isShown: Boolean,
    hour: [Number, String],
    minute: [Number, String],
    second: [Number, String],
    defaultValue: String
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
    this.hours = this.createArr(24)
    this.minutes = this.createArr(60)
    this.seconds = this.createArr(60)
  },
  mounted () {
    this.initTime()
  },
  watch: {
    hour (newVal, oldVal) {
      if (newVal === this.selectHour) return
      this.selectHour = newVal
    },
    minute (newVal, oldVal) {
      if (newVal === this.selectMinute) return
      this.selectMinute = newVal
    },
    second (newVal, oldVal) {
      if (newVal === this.selectSecond) return
      this.selectSecond = newVal
    },
    isShown (newVal) {
      if (newVal) {
        console.log(this.selectHour, this.selectMinute, this.selectMinute)
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
      const now = new Date()
      const [hour, minute, second] = this.defaultValue ? this.defaultValue.split(':') : ['', '', '']
      const defaultHour = hour || now.getHours()
      const defaultMinute = minute || now.getMinutes()
      const defaultSecond = second || now.getSeconds()
      console.log(this.hour, this.minute, this.second)
      this.selectHour = this.hour || defaultHour
      this.selectMinute = this.minute || defaultMinute
      this.selectSecond = this.second || defaultSecond
      console.log(this.selectHour, this.selectMinute, this.selectSecond)
    },
    createArr (N) {
      return Array.from(new Array(N), (val, index) => ('0' + index).slice(-2))
    },
    removeClass (parentEl, className = 'active') {
      const list = parentEl.children
      for (let i = 0; i < list.length; i++) {
        list[i].className = list[i].className ? list[i].className.replace(className, '') : ''
      }
    },
    addItemActive (parentEl, item) {
      this.removeClass(parentEl)
      const list = parentEl.firstElementChild.children
      const itemHeight = 28
      const currentItem = list[parseInt(item)]
      currentItem.className = currentItem.className + ' active'
      parentEl.scrollTop = item * itemHeight
    },
    itemClick (e, item) {
      const parentEl = e.target.parentElement.parentElement
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
