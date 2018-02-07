<template lang="pug">
  .c-datepicker__range(
    v-show="show"
    :class="className"
    )
    .c-datepicker__content.c-calendar
      c-dateheader(
        :minDate="minDate"
        :maxDate="startMaxDate"
        :year="startYear"
        :month="startMonth"
        :monthshow="startMonthsShow"
        @monthchange="startMonthChange"
        @yearchange="startYearChange"
        @monthshow="startMonthTableShow"
      )
      .c-calendar__body
        c-monthtable(
          v-if="startMonthsShow"
          :minDate="minDate"
          :maxDate="startMaxDate"
          :year="startYear"
          @change="startSelectMonth"
          )
        c-datetable(
          v-if="!startMonthsShow"
          type="range"
          :minDate="minDate"
          :maxDate="maxDate"
          :year="startYear"
          :month="startMonth"
          :day="startDay"
          :start="start"
          :end="end"
          :range-obj="rangeObj"
          @monthchange="startMonthChange"
          @yearchange="startYearChange"
          @change="selectDay"
          @rangeChange="onRangeChange"
        )
    .c-datepicker__content.c-calendar
      c-dateheader(
        :minDate="endMinDate"
        :maxDate="maxDate"
        :year="endYear"
        :month="endMonth"
        :monthshow="endMonthsShow"
        @monthchange="endMonthChange"
        @yearchange="endYearChange"
        @monthshow="endMonthTableShow"
      )
      .c-calendar__body
        c-monthtable(
          v-if="endMonthsShow"
          :minDate="endMinDate"
          :maxDate="maxDate"
          :year="endYear"
          @change="endSelectMonth"
          )
        c-datetable(
          v-if="!endMonthsShow"
          type="range"
          :minDate="minDate"
          :maxDate="maxDate"
          :year="endYear"
          :month="endMonth"
          :day="endDay"
          :start="start"
          :end="end"
          :range-obj="rangeObj"
          @monthchange="endMonthChange"
          @yearchange="endYearChange"
          @change="selectDay"
          @rangeChange="onRangeChange"
        )
    p.c-datepicker__text {{start}} 至 {{end}}
    .c-datepicker__btns
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
import Mixin from '../calendar/mixin.js'

export default {
  name: 'c-daterange',
  props: {
    value: [Array, String],
    size: String,
    show: Boolean,
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
      start: '',
      end: '',
      startYear: 1970,
      endYear: 1970,
      startMonth: 1,
      endMonth: 1,
      startDay: 1,
      endDay: 1,
      startMonthsShow: false,
      endMonthsShow: false,
      rangeObj: {
        endDate: '',
        selecting: true
      }
    }
  },
  created () {
    const [start, end] = this.value
    this.start = start || ''
    this.end = end || ''
    this.updateDate()
  },
  watch: {
    show (newVal) {
      this.resetDate()
    },
    value (newVal) {
      this.resetDate()
    }
  },
  computed: {
    className () {
      return this.size ? `is-${this.size}` : 'md'
    },
    startMaxDate () {
      return new Date(this.endYear, this.endMonth, 0).format(this.pattern)
    },
    endMinDate () {
      return new Date(this.startYear, this.startMonth + 1, 1).format(this.pattern)
    }
  },
  methods: {
    resetDate () {
      const [start, end] = this.value
      this.start = start
      this.end = end
      this.rangeObj = {
        endDate: '',
        selecting: true
      }
      this.updateDate()
    },
    updateDate () {
      const [startYear, startMonth, startDay] = this.syncDate(this.start)
      if (!this.start) {
        this.startYear = new Date().getFullYear()
        this.startMonth = new Date().getMonth()
        this.startDay = ''
      } else {
        this.startYear = startYear
        this.startMonth = startMonth
        this.startDay = startDay
      }
      const [endYear, endMonth, endDay] = this.syncDate(this.end)
      this.endYear = endYear || this.startYear

      if (endMonth === this.startMonth) {
        [this.endYear, this.endMonth] = this.updateMonth(this.endYear, endMonth, 1, 'plus')
      } else if (!endMonth) {
        [this.endYear, this.endMonth] = this.updateMonth(this.endYear, this.startMonth, 1, 'plus')
      } else {
        this.endMonth = endMonth
      }

      this.endDay = endYear === this.startYear && endMonth === this.startMonth ? '' : endDay
    },
    onRangeChange (obj) {
      this.rangeObj = obj.rangeObj
    },
    syncDate (time) {
      const d = new Date(time)
      if (!isNaN(d.getTime())) {
        return [
          d.getFullYear(),
          d.getMonth(),
          d.getDate()
        ]
      }
      return [
        '',
        '',
        ''
      ]
    },
    startMonthChange (month) {
      this.startMonth = month
    },
    startYearChange (year) {
      this.startYear = year
    },
    startMonthTableShow (show) {
      this.startMonthsShow = show
    },
    startSelectMonth (month) {
      this.startMonthsShow = false
      this.startMonth = month
      this.startDay = ''
    },
    selectDay (dateObj) {
      this.start = dateObj.start
      this.end = dateObj.end
      this.updateDate()
    },
    endMonthChange (month) {
      this.endMonth = month
    },
    endYearChange (year) {
      this.endYear = year
    },
    endMonthTableShow (show) {
      this.endMonthsShow = show
    },
    endSelectMonth (month) {
      this.endMonthsShow = false
      this.endMonth = month
      this.endDay = ''
    },
    cancel () {
      [this.start, this.end] = this.value
      this.$emit('change', this.value)
    },
    confirmRange () {
      this.end = this.end || this.rangeObj.endDate
      this.$emit('change', [this.start, this.end])
    }
  }
}
</script>
