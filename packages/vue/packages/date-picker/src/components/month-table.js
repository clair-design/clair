import { getYear, getMonth, isBefore, isAfter } from 'date-fns'
import { ROW_NUM, COL_NUM, MONTHS, KEYS } from '../const'
import util from '../util'

export default {
  name: 'CMonthTable',

  inject: ['$calendar', '$datepicker'],

  props: {
    selectedYear: Number,
    selectedMonth: Number,
    pickedYear: Number,
    startYear: Number,
    startMonth: Number,
    endYear: Number,
    endMonth: Number,
    viewType: String,
    setCellDisabled: Function,
    setCellClassName: Function
  },

  data() {
    return {
      activeIndex: null
    }
  },

  computed: {
    isSameYear() {
      return this.selectedYear === this.pickedYear
    },
    months() {
      const months = []
      const { pickedYear, selectedMonth, viewType } = this

      for (let i = 0; i < MONTHS.length; i++) {
        const isSelected = this.isSameYear && i === selectedMonth
        const isCurrent =
          pickedYear === getYear(new Date()) && i === getMonth(new Date())
        const className = {
          'c-date-picker__month--current': isCurrent,
          'c-date-picker__month--selected': isSelected
        }
        let cellClsName = ''
        if (this.setCellClassName && viewType === 'month') {
          cellClsName = this.setCellClassName(new Date(pickedYear, i))
        }

        let isCellDisabled = false
        if (this.setCellDisabled && viewType === 'month') {
          isCellDisabled = this.setCellDisabled(new Date(pickedYear, i))
        }
        months.push({
          year: pickedYear,
          month: i,
          monthName: MONTHS[i],
          className: [className, cellClsName],
          disabled: this.isMonthDisabled(pickedYear, i) || isCellDisabled,
          isSelected,
          isCurrent,
          index: i
        })
      }
      return months
    },
    monthsWithActive() {
      return this.months.map((item, i) => {
        return {
          ...item,
          className: [
            {
              'c-date-picker__month--active': i === this.activeIndex
            },
            ...item.className
          ]
        }
      })
    },
    rows() {
      const rows = []
      for (let i = 0; i < ROW_NUM; i++) {
        rows.push(this.monthsWithActive.slice(i * COL_NUM, (i + 1) * COL_NUM))
      }
      return rows
    },
    selectedIndex() {
      return this.months.find(data => data.isSelected)?.index
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
      // 只能是打开的时候set, 关闭的时候 当前的datas可能不是当前selected的datas, 无法setSelected
      if (val) {
        this.setActiveIndex()
      }
    }
  },

  methods: {
    setActiveIndex(index) {
      this.activeIndex = this.selectedIndex
    },
    isMonthDisabled(year, month) {
      const { startYear, startMonth, endYear, endMonth } = this
      const isBeforeMinMonth = isBefore(
        new Date(year, month),
        new Date(startYear, startMonth + 1)
      )
      const isAfterMaxMonth = isAfter(
        new Date(year, month),
        new Date(endYear, endMonth - 1)
      )
      return isBeforeMinMonth || isAfterMaxMonth
    },
    keydown(code) {
      this.activeIndex =
        this.activeIndex ??
        util.getCurrentCellIndex(this.months) ??
        (code === KEYS.DOWN ? -COL_NUM : COL_NUM)
      if (code === KEYS.ENTER) {
        return this.$calendar.pickMonth(this.months[this.activeIndex])
      }

      this.activeIndex += util.getDeltaAfterKeydown(code, COL_NUM)
      const total = this.months.length

      if (this.activeIndex < 0) {
        this.activeIndex += total
        return this.$calendar.goYear(-1)
      } else if (this.activeIndex >= total) {
        this.activeIndex -= total
        return this.$calendar.goYear(1)
      }
    }
  },

  render() {
    const { rows } = this

    return (
      <div role="grid" class="c-date-picker-calendar__months">
        {rows.map(row => (
          <div role="row">
            {row &&
              row.map(item => (
                <button
                  role="gridcell"
                  class={item.className}
                  aria-selected={item.isSelected}
                  disabled={item.disabled}
                  onclick={() => this.$calendar.pickMonth(item)}
                >
                  {item.monthName}
                </button>
              ))}
          </div>
        ))}
      </div>
    )
  }
}
