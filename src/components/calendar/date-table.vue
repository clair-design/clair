<template lang="pug">
table.c-calendar__day-table
  thead
    tr
      th(
        v-for="item in weeks"
      ) {{item}}
  tbody
    tr(
      v-for="row in dayRows"
    )
      td(v-for="item in row")
        a.day-cell(
          :class="[{'active': isSelectedDate(item)}, {'disabled': isDateDisabled(item)}, item.class]"
          @click="selectDay(item)"
        ) {{item.day}}
</template>

<script>
import './index.css'
import Mixin from './mixin.js'

export default {
  name: 'c-datetable',
  props: {
    year: [String, Number],
    month: [String, Number],
    day: [String, Number],
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
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth () {
      return new Date(this.maxDate).getMonth()
    },
    minDay () {
      return new Date(this.minDate).getDate()
    },
    maxDay () {
      return new Date(this.maxDate).getDate()
    },
    dayRows () {
      const lines = 6
      const weekDays = 7
      const allDays = lines * weekDays
      const rows = []
      const getRowArr = (N, i = 1) => {
        return Array.from(new Array(N), (val, index) => index + i)
      }
      const mapDayObj = (list, classname) => {
        return list.map(item => {
          return {
            class: classname,
            day: item
          }
        })
      }
      const currentMonthDays = new Date(this.year, this.month + 1, 0).getDate()
      const lastMonthDays = new Date(this.year, this.month, 0).getDate()
      const startWeek = new Date(this.year, this.month, 1).getDay()
      const lastMonthDayCount = startWeek || weekDays
      const nextMonthDays = allDays - lastMonthDayCount - currentMonthDays
      const lastMonthDates = mapDayObj(
        getRowArr(lastMonthDays).slice(-lastMonthDayCount),
        'lastmonth')
      const currentMonthDates = mapDayObj(getRowArr(currentMonthDays),
        'curmonth')
      const nextMonthDates = mapDayObj(getRowArr(nextMonthDays), 'nextmonth')
      const allDate = [
        ...lastMonthDates,
        ...currentMonthDates,
        ...nextMonthDates
      ]
      for (let i = 0; i < allDays; i += weekDays) {
        rows.push(allDate.slice(i, i + weekDays))
      }
      return rows
    }
  },
  methods: {
    isDateDisabled (item) {
      const months = 12
      const isPrevMonthValid = item.class === 'lastmonth' &&
        !this.isSelectedMonth((this.month - 1) % months)
      const isNextMonthValid = item.class === 'nextmonth' &&
        !this.isSelectedMonth((this.month + 1) % months)
      const isCurMonthValid = item.class === 'curmonth' &&
        ((this.year === this.minYear && this.month === this.minMonth &&
        item.day < this.minDay) || (this.year === this.maxYear &&
        this.month === this.maxMonth && item.day > this.maxDay))
      return isCurMonthValid || isPrevMonthValid || isNextMonthValid
    },
    isSelectedDate (item) {
      return item.class === 'curmonth' &&
        new Date(this.year, this.month, item.day).format(this.pattern) ===
        new Date(this.year, this.month, this.day).format(this.pattern)
    },
    selectDay (item) {
      const canSelPrevMonthDay = item.class === 'lastmonth' &&
        !(this.prevMonth() === false)
      const canSelNextMonthDay = item.class === 'nextmonth' &&
        !(this.nextMonth() === false)
      const isCurrentMonth = item.class === 'curmonth'
      if (canSelPrevMonthDay || canSelNextMonthDay || isCurrentMonth) {
        this.$emit('change', item.day)
      }
    }
  }
}
</script>
