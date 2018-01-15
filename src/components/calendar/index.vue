<template lang="pug">
.c-calendar(
  v-show="show"
  :class="className"
  )
  c-dateheader(
    :minDate="minDate"
    :maxDate="maxDate"
    :year="year"
    :month="month"
    :monthshow="monthsShow"
    @monthchange="monthchange"
    @yearchange="yearchange"
    @monthshow="monthTableShow"
  )
  .c-calendar__body
    c-monthtable(
      v-if="monthsShow"
      :minDate="minDate"
      :maxDate="maxDate"
      :year="year"
      @change="selectMonth"
      )
    c-datetable(
      v-if="!monthsShow"
      :minDate="minDate"
      :maxDate="maxDate"
      :year="year"
      :month="month"
      :day="day"
      @monthchange="monthchange"
      @yearchange="yearchange"
      @change="selectDay"
    )

</template>

<script>
import './index.css'
import Mixin from './mixin.js'

export default {
  name: 'c-calendar',
  props: {
    value: String,
    size: String,
    show: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  mixins: [Mixin],
  data () {
    return {
      date: '',
      year: 1970,
      month: 1,
      day: 1,
      monthsShow: false
    }
  },
  computed: {
    className () {
      return this.size ? `is-${this.size}` : 'md'
    }
  },
  created () {
    this.syncDate()
  },
  watch: {
    value () {
      this.syncDate()
    },
    show (newVal) {
      newVal && this.syncDate()
    }
  },
  methods: {
    syncDate () {
      this.date = this.value || this.date || new Date().format(this.pattern)
      if (new Date(this.date) > new Date(this.maxDate)) this.date = this.maxDate
      if (new Date(this.date) < new Date(this.minDate)) this.date = this.minDate
      this.date = new Date(this.date).format(this.pattern)
      const d = new Date(this.date)
      if (!isNaN(d.getTime())) {
        this.year = d.getFullYear()
        this.month = d.getMonth()
        this.day = d.getDate()
      }
    },
    selectDay (day) {
      this.day = day
      const date = `${this.year}-${this.fixZero(this.month + 1)}-${this.fixZero(this.day)}`
      this.date = new Date(date).format(this.pattern)
      this.$emit('update', this.date)
    },
    selectMonth (month) {
      this.monthsShow = false
      this.month = month
      this.day = ''
    },
    monthchange (month) {
      this.month = month
    },
    yearchange (year) {
      this.year = year
    },
    monthTableShow (show) {
      this.monthsShow = show
    }
  }
}
</script>
