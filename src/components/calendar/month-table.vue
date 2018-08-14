<template lang="pug">
  table.c-calendar__month-table
    tbody
      tr(v-for="monthRow in monthRows")
        td(
          v-for="item in monthRow"
          @click="selectMonth(item)"
        )
          a.month-cell(
            :class="{'disabled': !isSelectedMonth(item), 'active':isSelectedMonth(item) && item === month}"
          ) {{mapMonth(item)}}
</template>

<script>
import './index.css'
import Mixin from './mixin.js'

export default {
  name: 'c-monthtable',
  props: {
    month: [Number, String],
    year: [Number, String],
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
  computed: {
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
    }
  },
  data () {
    return {
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ]
    }
  },
  methods: {
    selectMonth (month) {
      if (!this.isSelectedMonth(month)) return
      this.$emit('change', month)
    },
    mapMonth (month) {
      return this.months[month]
    }
  }
}
</script>
