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
        :monthsShow="startMonthsShow"
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
          :month="startMonth"
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
        :monthsShow="endMonthsShow"
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
          :month="endMonth"
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
import Button from '../button/index.vue'

export default {
  name: 'c-daterange',
  components: {
    'c-button': Button
  },
  props: {
    value: [Array, String],
    size: String,
    show: Boolean,
    type: {
      type: String,
      default: 'date'
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
      },
      format: ''
    }
  },
  created () {
    const [start, end] = this.value
    this.start = start || ''
    this.end = end || ''
    this.startMonthsShow = this.isMonthRange
    this.endMonthsShow = this.isMonthRange
    this.updateDate()
    this.format = this.pattern ? this.pattern : this.isMonthRange ? 'yyyy-MM' : 'yyyy-MM-dd'
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
    isMonthRange () {
      return this.type === 'month'
    },
    className () {
      return this.size ? `is-${this.size}` : 'md'
    },
    startMaxDate () {
      return new Date(this.endYear, this.endMonth, 0).format(this.format)
    },
    endMinDate () {
      return new Date(this.startYear, this.startMonth + 1, 1).format(this.format)
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
      } else if (!endMonth && endMonth !== 0) {
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
      this.startMonthsShow = this.isMonthRange
      this.startMonth = month
      this.startDay = ''
      if (this.isMonthRange) {
        this.start = new Date(this.startYear, this.startMonth).format(this.format)
        this.updateDate()
      }
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
      this.endMonthsShow = this.isMonthRange
      this.endMonth = month
      this.endDay = ''
      if (this.isMonthRange) {
        this.end = new Date(this.endYear, this.endMonth).format(this.format)
        this.updateDate()
      }
    },
    cancel () {
      [this.start, this.end] = this.value
      this.$emit('change', this.value)
    },
    confirmRange () {
      if (this.start && this.end) {
        this.$emit('change', [this.start, this.end])
      } else {
        this.cancel()
      }
    }
  }
}
</script>
