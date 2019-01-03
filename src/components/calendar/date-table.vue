<template lang="pug">
table.c-calendar__day-table
  thead
    tr
      th(
        v-for="item in weeks"
      ) {{item}}
  tbody
    tr(
      v-for="row,rowIndex in dayRows"
    )
      td(v-for="item,itemIndex in row"
        :class="getCellCls(item)"
        @click="selectDay(item)"
        @mouseenter="onMouseEnter($event)"
      )
        a.day-cell(
          :data-rowindex="rowIndex"
          :data-index="itemIndex"
        ) {{item.day}}
</template>

<script>
import './index.css'
import Mixin from './mixin.js'

export default {
  name: 'c-datetable',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    year: [String, Number],
    month: [String, Number],
    day: [String, Number],
    start: String,
    end: String,
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
    },
    rangeObj: {
      type: Object,
      default () {
        return {
          endDate: '',
          selecting: false
        }
      }
    }
  },
  mixins: [Mixin],
  data () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    rangeDay () {
      const endYear = new Date(this.end).getFullYear()
      const endMonth = new Date(this.end).getMonth()
      const endDay = new Date(this.end).getDate()
      return this.year === endYear && this.month === endMonth ? endDay : ''
    },
    minTime () {
      return new Date(this.minYear, this.minMonth, this.minDay).getTime()
    },
    maxTime () {
      return new Date(this.maxYear, this.maxMonth, this.maxDay).getTime()
    },
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
    dayRows () {
      const lines = 6
      const weekDays = 7
      const allDays = lines * weekDays
      const rows = []
      const getRowArr = (N, i = 1) => {
        return Array.from(new Array(N), (val, index) => index + i)
      }
      const mapDayObj = (list, classname, year, month) => {
        return list.map(item => {
          return {
            class: classname,
            day: item,
            month: month,
            year: year
          }
        })
      }
      const lastDayOfCurrentMonth = new Date(this.year, this.month + 1, 0)
      const dayCountOfCurrentMonth = lastDayOfCurrentMonth.getDate()
      const lastDayOfLastMonth = new Date(this.year, this.month, 0)
      const dayCountOfLastMonth = lastDayOfLastMonth.getDate()
      const yearOfLastMonth = lastDayOfLastMonth.getFullYear()
      const monthOfLastMonth = lastDayOfLastMonth.getMonth()
      const lastDayOfNextMonth = new Date(this.year, this.month + 2, 0)
      const yearOfNextMonth = lastDayOfNextMonth.getFullYear()
      const monthOfNextMonth = lastDayOfNextMonth.getMonth()

      const startWeek = new Date(this.year, this.month, 1).getDay()
      const lastMonthDayCount = startWeek || weekDays
      const nextMonthDays = allDays - lastMonthDayCount - dayCountOfCurrentMonth
      const lastMonthDates = mapDayObj(
        getRowArr(dayCountOfLastMonth).slice(-lastMonthDayCount),
        'lastmonth', yearOfLastMonth, monthOfLastMonth)
      const currentMonthDates = mapDayObj(getRowArr(dayCountOfCurrentMonth),
        'curmonth', this.year, this.month)
      const nextMonthDates = mapDayObj(getRowArr(nextMonthDays), 'nextmonth', yearOfNextMonth, monthOfNextMonth)
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
    getCellCls (item) {
      const clsArr = [item.class]
      this.isSelectedDate(item) && clsArr.push('active')
      this.isDateDisabled(item) && clsArr.push('disabled')
      !this.isSelectedDate(item) && this.rangeObj.selecting && this.isDayInRange(item) && clsArr.push('day-cell-range')
      return clsArr
    },
    isDayInRange (item) {
      if (item.class !== 'curmonth') return false
      const startTime = new Date(this.start).getTime()
      const endTime = new Date(this.end).getTime()
      const currentTime = new Date(this.year, this.month, item.day).getTime()
      const hoverTime = new Date(this.rangeObj.endDate).getTime()
      if (startTime && endTime) {
        return currentTime > startTime && currentTime < endTime
      } else if (startTime) {
        return startTime > hoverTime
          ? currentTime > hoverTime && currentTime < startTime
          : currentTime > startTime && currentTime < hoverTime
      }
      return false
    },
    onMouseEnter (e) {
      if (e.target.tagName === 'TD') {
        const rowIndex = e.target.querySelector('a').getAttribute('data-rowindex')
        const columnIndex = e.target.querySelector('a').getAttribute('data-index')
        const dayItem = this.dayRows[rowIndex][columnIndex]
        /* eslint-disable no-nested-ternary */
        const type = dayItem.class === 'lastmonth' ? 'sub' : dayItem.class === 'nextmonth' ? 'plus' : ''
        const [year, month] = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month]

        this.$emit('rangeChange', {
          rangeObj: {
            endDate: new Date(year, month, dayItem.day).format(this.pattern),
            selecting: true
          }
        })
      }
    },
    isDateDisabled (item) {
      const curTime = new Date(item.year, item.month, item.day).getTime()
      return curTime < this.minTime || curTime > this.maxTime
    },
    isSelectedDate (item) {
      const isCurMonth = item.class === 'curmonth'
      const isRange = this.type === 'range'
      const currentDate = new Date(this.year, this.month, item.day).format(this.pattern)
      const isSelectedDay = currentDate === new Date(this.year, this.month, this.day).format(this.pattern)
      const isStart = currentDate === this.start
      const isEnd = currentDate === this.end
      const isHoverDate = currentDate === this.rangeObj.endDate
      return isCurMonth && ((!isRange && isSelectedDay) ||
        (isRange && (isStart || isEnd || (!(this.start && this.end) && isHoverDate))))
    },
    markRange (item) {
      let start = ''
      let end = ''
      let selecting = true
      const type = item.class === 'lastmonth' ? 'sub' : item.class === 'nextmonth' ? 'plus' : ''
      const [year, month] = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month]
      const day = item.day
      if (this.start && this.end) {
        start = new Date(year, month, day).format(this.pattern)
        selecting = false
      } else if (!this.start && !this.end) {
        start = new Date(year, month, day).format(this.pattern)
      } else if (this.start && !this.end) {
        const startDate = new Date(year, month, day)
        start = new Date(this.start).getTime() > startDate.getTime() ? startDate.format(this.pattern) : this.start
        end = new Date(this.start).getTime() > startDate.getTime() ? this.start : startDate.format(this.pattern)
      } else if (!this.start && this.end) {
        const endDate = new Date(year, month, day)
        start = new Date(this.end).getTime() > endDate.getTime() ? endDate.format(this.pattern) : this.end
        end = new Date(this.end).getTime() > endDate.getTime() ? this.end : endDate.format(this.pattern)
      }
      this.$emit('change', {
        start: start,
        end: end,
        rangeObj: {
          endDate: new Date(this.year, this.month, day).format(this.pattern),
          selecting: selecting
        }
      })
    },
    selectDay (item) {
      if (this.isDateDisabled(item)) {
        return
      }
      const canSelPrevMonthDay = item.class === 'lastmonth' &&
        !(this.prevMonth() === false)
      const canSelNextMonthDay = item.class === 'nextmonth' &&
        !(this.nextMonth() === false)
      const isCurrentMonth = item.class === 'curmonth'

      if (canSelPrevMonthDay || canSelNextMonthDay || isCurrentMonth) {
        if (this.type === 'range') {
          this.markRange(item)
        } else {
          this.$emit('change', item.day)
        }
      }
    }
  }
}
</script>
