<template lang="pug">
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
    @click="monthtableShow"
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
</template>

<script>
import './index.css'
import Mixin from './mixin.js'

export default {
  name: 'c-dateheader',
  props: {
    monthsShow: Boolean,
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
    }
  },
  mixins: [Mixin],
  data () {
    return {}
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
    }
  },
  methods: {
    prevYear () {
      if (!this.isPreYearCanSelect) return false
      this.$emit('yearchange', this.year - 1)
    },
    nextYear () {
      if (!this.isNextYearCanSelect) return false
      this.$emit('yearchange', this.year + 1)
    },
    prevMonth () {
      if (!this.isPreMonthCanSelect) return false
      let month = parseInt(this.month) - 1
      const maxMonth = 11
      const minMonth = 0
      if (month < minMonth) {
        this.$emit('yearchange', this.year - 1)
      }
      month = month < minMonth ? maxMonth : month
      this.$emit('monthchange', month)
    },
    nextMonth () {
      if (!this.isNextMonthCanSelect) return false
      let month = this.month + 1
      const maxMonth = 11
      const minMonth = 0
      if (month > maxMonth) {
        this.$emit('yearchange', this.year + 1)
      }
      month = month > maxMonth ? minMonth : month
      this.$emit('monthchange', month)
    },
    monthtableShow () {
      this.$emit('monthshow', true)
    }
  }
}
</script>
