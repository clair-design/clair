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
    :monthsShow="monthsShow"
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
      :month="month"
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

import DateHeader from './date-header.vue'
import DateTable from './date-table.vue'
import MonthTable from './month-table.vue'

export default {
  name: 'c-calendar',
  components: {
    'c-dateheader': DateHeader,
    'c-datetable': DateTable,
    'c-monthtable': MonthTable
  },
  props: {
    value: String,
    size: String,
    type: String,
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
      type: String
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
    },
    format () {
      return this.pattern ? this.pattern : this.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'
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
    },
    type (newVal) {
      this.monthsShow = newVal === 'month'
    }
  },
  methods: {
    syncDate () {
      if (this.type === 'month') {
        this.monthsShow = true
      }
      this.date = this.value || new Date().format(this.format)
      // this.date = this.value || this.date || new Date().format(this.format)
      if (new Date(this.date) > new Date(this.maxDate)) this.date = this.maxDate
      if (new Date(this.date) < new Date(this.minDate)) this.date = this.minDate
      this.date = new Date(this.date).format(this.format)
      const d = new Date(this.date)
      if (!isNaN(d.getTime())) {
        this.year = d.getFullYear()
        this.month = d.getMonth()
        this.day = this.type === 'month' ? '' : d.getDate()
      }
    },
    selectDay (day) {
      this.day = day
      const date = `${this.year}-${this.fixZero(this.month + 1)}-${this.fixZero(this.day)}`
      this.date = new Date(date).format(this.format)
      this.$emit('update', this.date)
    },
    selectMonth (month) {
      this.monthsShow = this.type === 'month'
      this.month = month
      this.day = ''
      if (this.type === 'month') {
        const date = `${this.year}-${this.fixZero(this.month + 1)}`
        this.date = new Date(date).format(this.format)
        this.$emit('update', this.date)
      }
    },
    monthchange (month) {
      this.month = month
    },
    yearchange (year) {
      this.year = year
    },
    monthTableShow (show) {
      this.monthsShow = show
    },
    updateDay (num, type) {
      this.monthsShow = false
      let date = new Date(this.year, this.month, this.day)
      type === 'plus' && date.setDate(date.getDate() + num)
      type === 'sub' && date.setDate(date.getDate() - num)
      if (new Date(date) > new Date(this.maxDate)) date = this.maxDate
      if (new Date(date) < new Date(this.minDate)) date = this.minDate
      this.$emit('update', new Date(date).format(this.format), true)
    },
    updateMonthBykeydown (num, type) {
      const [year, month] = this.updateMonth(this.year, this.month, num, type)
      this.$emit('update', new Date(year, month).format(this.format), true)
    }
  }
}
</script>
