<template lang="pug">
.c-calendar__header
  a.c-calendar__prev-year(
    :class="{disabled: !isPreYearCanSelect}"
    @click="prevYear"
  )
    c-icon(
      type="feather"
      valign="text-top"
      name="chevrons-left"
    )
  a.c-calendar__prev-month(
    :class="{disabled: !isPreMonthCanSelect}"
    v-show="!monthsShow"
    @click="prevMonth"
    )
    c-icon(
      type="feather"
      valign="text-top"
      name="chevron-left"
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
    c-icon(
      type="feather"
      valign="text-top"
      name="chevron-right"
    )
  a.c-calendar__next-year(
    :class="{disabled: !isNextYearCanSelect}"
    @click="nextYear"
  )
    c-icon(
      type="feather"
      valign="text-top"
      name="chevrons-right"
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
    date: {
      type: String,
      default: '1970-01-01'
    },
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
    monthtableShow () {
      this.$emit('monthshow', true)
    }
  }
}
</script>
