import { getYear, getMonth } from 'date-fns'
import CMonthTable from './month-table'
import { KEYS, ROW_NUM } from '../const'
import util from '../util'

export default {
  name: 'CQuarterTable',

  mixins: [CMonthTable],

  inject: ['$datepicker'],

  props: {
    selectedDate: Array
  },

  data() {
    return {
      activeIndex: null
    }
  },

  computed: {
    quarters() {
      const { rows, pickedYear, activeIndex, viewType } = this

      const quarters = []
      rows.forEach((row, index) => {
        const isSelected = this.isQuarterSelected(index + 1, pickedYear)
        const isCurrent = this.isQuarterCurrent(row)
        const className = {
          'c-date-picker-month-row': true,
          'c-date-picker__quarter--current': isCurrent,
          'c-date-picker__quarter--active': index === activeIndex
        }
        let cellClsName = ''
        if (this.setCellClassName && viewType === 'quarter') {
          cellClsName = this.setCellClassName(`${pickedYear}q${index + 1}`)
        }

        let isCellDisabled = false
        if (this.setCellDisabled && viewType === 'quarter') {
          isCellDisabled = this.setCellDisabled(`${pickedYear}q${index + 1}`)
        }
        quarters.push({
          data: row,
          year: pickedYear,
          quarter: index + 1,
          disabled: isCellDisabled,
          isSelected,
          isCurrent,
          className: [className, cellClsName],
          index
        })
      })
      return quarters
    },
    selectedIndex() {
      return this.quarters.find(data => data.isSelected)?.index
    }
  },

  watch: {
    '$datepicker.value': {
      handler() {
        this.setActiveIndex()
      },
      immediate: true
    },
    '$datepicker.isOpened'(val) {
      if (val) {
        this.setActiveIndex()
      }
    }
  },

  methods: {
    setActiveIndex(index) {
      this.activeIndex = this.selectedIndex
    },
    isQuarterSelected(quarter, year) {
      return (this.selectedDate || []).some(d => {
        const [selectedYear, selectedQuarter] = d.split('q')
        return (
          quarter === Number(selectedQuarter) && year === Number(selectedYear)
        )
      })
    },
    isQuarterCurrent(data) {
      const currentYear = getYear(new Date())
      const currentMonth = getMonth(new Date())
      return data.some(
        ({ year, month }) => year === currentYear && month === currentMonth
      )
    },
    keydown(code) {
      this.activeIndex =
        this.activeIndex ??
        util.getCurrentCellIndex(this.quarters) ??
        (code === KEYS.DOWN ? -1 : 1)
      if (code === KEYS.ENTER) {
        return this.$calendar.pickQuarter(this.quarters[this.activeIndex])
      }

      this.activeIndex += util.getDeltaAfterKeydown(code, 1)

      if (this.activeIndex < 0) {
        this.activeIndex += ROW_NUM
        return this.$calendar.goYear(-1)
      } else if (this.activeIndex >= ROW_NUM) {
        this.activeIndex -= ROW_NUM
        return this.$calendar.goYear(1)
      }
    }
  },

  render() {
    return (
      <div
        role="grid"
        class="c-date-picker-calendar__months c-date-picker-calendar__quarters__body"
      >
        {this.quarters.map((row, i) => (
          <div role="row">
            <button
              role="gridcell"
              class={row.className}
              aria-selected={row.isSelected}
              disabled={row.disabled}
              onclick={() => this.$calendar.pickQuarter(row)}
              onmouseenter={() => this.$calendar.updateDateRange(row.date)}
            >
              {row.data && row.data.map(item => <span>{item.monthName}</span>)}
            </button>
          </div>
        ))}
      </div>
    )
  }
}
