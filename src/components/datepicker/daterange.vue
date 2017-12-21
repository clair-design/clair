<template lang="pug">
  .c-datepicker__range
    .c-datepicker__content.c-calendar
      c-dateheader(
        :minDate="minDate"
        :maxDate="maxDate"
        :year="startYear"
        :month="startMonth"
        :day="startDay"
        :monthshow="startMonthsShow"
        @monthchange="startMonthChange"
        @yearchange="startYearChange"
        @monthshow="startMonthTableShow"
      )
      .c-calendar__body
        c-monthtable(
          v-if="startMonthsShow"
          :minDate="minDate"
          :maxDate="maxDate"
          :year="startYear"
          @change="startSelectMonth"
          )
        c-datetable(
          v-if="!startMonthsShow"
          :minDate="minDate"
          :maxDate="maxDate"
          :year="startYear"
          :month="startMonth"
          :day="startDay"
          @change="startSelectDay"
        )
    .c-datepicker__content.c-calendar
      c-dateheader(
        :minDate="minDate"
        :maxDate="maxDate"
        :year="endYear"
        :month="endMonth"
        :day="endDay"
        :monthshow="endMonthsShow"
        @monthchange="endMonthChange"
        @yearchange="endYearChange"
        @monthshow="endMonthTableShow"
      )
      .c-calendar__body
        c-monthtable(
          v-if="endMonthsShow"
          :minDate="minDate"
          :maxDate="maxDate"
          :year="endYear"
          @change="endSelectMonth"
          )
        c-datetable(
          v-if="!endMonthsShow"
          :minDate="minDate"
          :maxDate="maxDate"
          :year="endYear"
          :month="endMonth"
          :day="endDay"
          @change="endSelectDay"
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
export default {
  name: 'c-daterange',
  props: {
    value: Array,
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
      start: '',
      end: '',
      startYear: 1970,
      endYear: 1970,
      startMonth: 1,
      endMonth: 1,
      startDay: 1,
      endDay: 1,
      startMonthsShow: false,
      endMonthsShow: false
    }
  },
  created () {
    const [start, end] = this.value
    this.start = start
    this.end = end
    const [startYear, startMonth, startDay] = this.syncDate(this.start)
    this.startYear = startYear
    this.startMonth = startMonth
    this.startDay = startDay
    const [endYear, endMonth, endDay] = this.syncDate(this.end)
    this.endYear = endYear
    this.endMonth = endMonth
    this.endDay = endDay
  },
  watch: {
    value (newVal) {
      const [start, end] = this.value
      this.start = start
      this.end = end
      const [startYear, startMonth, startDay] = this.syncDate(this.start)
      this.startYear = startYear
      this.startMonth = startMonth
      this.startDay = startDay
      const [endYear, endMonth, endDay] = this.syncDate(this.end)
      this.endYear = endYear
      this.endMonth = endMonth
      this.endDay = endDay
    }
  },
  computed: {

  },
  methods: {
    fixZero (val, num = 2) {
      return (Array(num).join(0) + val).slice(-num)
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
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ]
    },
    updateStartDate () {
      if (this.startDay) {
        const date = `${this.startYear}-${this.fixZero(this.startMonth + 1)}-${this.fixZero(this.startDay)}`
        this.start = new Date(date).format(this.pattern)
      }
    },
    updateEndDate () {
      if (this.endDay) {
        const date = `${this.endYear}-${this.fixZero(this.endMonth + 1)}-${this.fixZero(this.endDay)}`
        this.end = new Date(date).format(this.pattern)
      }
    },
    startMonthChange (month) {
      this.startMonth = month
      this.updateStartDate()
    },
    startYearChange (year) {
      this.startYear = year
      this.updateStartDate()
    },
    startMonthTableShow (show) {
      this.startMonthsShow = show
    },
    startSelectMonth (month) {
      this.startMonthsShow = false
      this.startMonth = month
      this.startDay = ''
    },
    startSelectDay (day) {
      this.startDay = day
      this.updateStartDate()
    },
    endMonthChange (month) {
      this.endMonth = month
      this.updateEndDate()
    },
    endYearChange (year) {
      this.endYear = year
      this.updateEndDate()
    },
    endMonthTableShow (show) {
      this.endMonthsShow = show
    },
    endSelectMonth (month) {
      this.endMonthsShow = false
      this.endMonth = month
      this.endDay = ''
    },
    endSelectDay (day) {
      this.endDay = day
      this.updateEndDate()
    },
    cancel () {
      [this.start, this.end] = this.value
      this.$emit('change', this.value)
    },
    confirmRange () {
      this.$emit('change', [this.start, this.end])
    }
  }
}
</script>
