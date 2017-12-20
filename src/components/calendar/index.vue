<template lang="pug">
.c-calendar
  .c-calendar__header
    a.c-calendar__prev-year(
      :class="{disabled: !isPreYearCanSelect}"
      @click="prevYear"
    )
    a.c-calendar__prev-month(
      :class="{disabled: !isPreMonthCanSelect}"
      v-show="!monthsShow"
      @click="prevMonth"
    )
    span.c-calendar__year {{this.year}}
    span.c-calendar__spacer(
      v-show="!monthsShow"
    ) -
    span.c-calendar__month(
      @click="monthsShow = true"
      v-show="!monthsShow"
    ) {{fixZero(this.month + 1)}}
    a.c-calendar__next-month(
      :class="{disabled: !isNextMonthCanSelect}"
      v-show="!monthsShow"
      @click="nextMonth"
    )
    a.c-calendar__next-year(
      :class="{disabled: !isNextYearCanSelect}"
      @click="nextYear"
    )
  .c-calendar__body
    table.c-calendar__month-table(
      v-if="monthsShow"
    )
      tbody
        tr(v-for="month in monthRows")
          td(
            v-for="item in month"
            @click="selectMonth(item)"
          )
            a.month-cell(
              :class="{'disabled': !isSelectedMonth(item)}"
            ) {{mapMonth(item)}}
    table.c-calendar__day-table(
      v-if="!monthsShow"
    )
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

export default {
  name: 'c-calendar',
  props: {
    value: String,
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
  data () {
    return {
      date: '',
      year: 1970,
      month: 1,
      day: 1,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ],
      monthsShow: false
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
    isPreMonthCanSelect () {
      return !(this.year === this.minYear && this.month === this.minMonth)
    },
    isNextMonthCanSelect () {
      return !(this.year === this.maxYear && this.month === this.maxMonth)
    },
    isPreYearCanSelect () {
      return !(this.year === this.minYear)
    },
    isNextYearCanSelect () {
      return !(this.year === this.maxYear)
    },
    monthRows () {
      const deps = 3
      const rows = []
      for (let i = 0; i < this.months.length; i += deps) {
        const getRowArr = (N) => {
          return Array.from(new Array(N), (val, index) => index + i)
        }
        rows.push(getRowArr(deps))
      }
      return rows
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
  created () {
    this.syncDate()
  },
  watch: {
    value () {
      this.syncDate()
    }
  },
  methods: {
    syncDate () {
      this.date = this.value || this.date || new Date().format(this.pattern)
      if (new Date(this.date) > new Date(this.maxDate)) this.date = this.maxDate
      if (new Date(this.date) < new Date(this.minDate)) this.date = this.minDate
      this.date = new Date(this.date).format(this.pattern)
      const d = new Date(this.date)
      this.year = d.getFullYear()
      this.month = d.getMonth()
      this.day = d.getDate()
    },
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
    isSelectedMonth (month) {
      return !((this.year === this.minYear && month < this.minMonth) ||
        (this.year === this.maxYear && month > this.maxMonth))
    },
    isSelectedDate (item) {
      return item.class === 'curmonth' &&
        new Date(this.year, this.month, item.day).format(this.pattern) ===
        new Date(this.year, this.month, this.day).format(this.pattern)
    },
    mapMonth (month) {
      return this.months[month]
    },
    selectDay (item) {
      const canSelPrevMonthDay = item.class === 'lastmonth' &&
        !(this.prevMonth() === false)
      const canSelNextMonthDay = item.class === 'nextmonth' &&
        !(this.nextMonth() === false)
      const isCurrentMonth = item.class === 'curmonth'
      if (canSelPrevMonthDay || canSelNextMonthDay || isCurrentMonth) {
        this.day = item.day
        const date = `${this.year}-${this.fixZero(this.month)}-${this.fixZero(this.day)}`
        this.date = new Date(date).format(this.pattern)
        this.$emit('update', this.date)
      }
    },
    selectMonth (month) {
      if (this.isSelectedMonth(month)) {
        this.monthsShow = false
        this.month = month
      }
    },
    fixZero (val, num = 2) {
      return (Array(num).join(0) + val).slice(-num)
    },
    prevYear () {
      if (!this.isPreYearCanSelect) return false
      this.year = this.year - 1
    },
    nextYear () {
      if (!this.isNextYearCanSelect) return false
      this.year = this.year + 1
    },
    prevMonth () {
      if (!this.isPreMonthCanSelect) return false
      let month = parseInt(this.month) - 1
      const maxMonth = 11
      const minMonth = 0
      this.year = month < 1 ? this.year - 1 : this.year
      month = month < minMonth ? maxMonth : month
      this.month = month
    },
    nextMonth () {
      if (!this.isNextMonthCanSelect) return false
      let month = this.month + 1
      const maxMonth = 11
      const minMonth = 0
      /* eslint-disable no-nested-ternary */
      this.year = month > maxMonth ? this.year + 1 : this.year
      month = month > maxMonth ? minMonth : month
      this.month = month
    }
  }
}

/**
 * 格式化日期
 * @method format
 * @static
 * @param {Date} d 日期对象
 * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
 * @return {string}  返回format后的字符串
 * @example
 var d=new Date();
 alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
 */
/* eslint-disable no-extend-native */
Date.prototype.format = function (pattern) {
  /* eslint-disable no-param-reassign */
  pattern = pattern || 'yyyy-MM-dd hh:mm:ss'
  const y = this.getFullYear().toString()
  const o = {
    M: this.getMonth() + 1, // month
    d: this.getDate(), // day
    h: this.getHours(), // hour
    m: this.getMinutes(), // minute
    s: this.getSeconds() // second
  }
  pattern = pattern.replace(/(y+)/ig, function (a, b) {
    return y.substr(4 - Math.min(4, b.length))
  })
  /* eslint-disable */
  for (const i in o) {
    pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
      return o[i] < 10 && b.length > 1 ? '0' + o[i] : o[i]
    })
  }
  return pattern
}
</script>
