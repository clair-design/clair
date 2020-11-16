import { getYear, getWeek, isSameDay } from 'date-fns'
import CDateTable from './date-table'
import { TWO, KEYS, DAY_ROW_NUM } from '../const'
import util from '../util'

export default {
  name: 'CWeekTable',

  mixins: [CDateTable],

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
    weekDatas() {
      const { rows, firstDayOfWeek, activeIndex, viewType } = this

      const weekDatas = []
      rows.forEach((row, index) => {
        const centerDate = row[Math.floor(row.length / TWO)].date
        const year = getYear(centerDate)
        const week = getWeek(centerDate, {
          weekStartsOn: firstDayOfWeek,
          firstWeekContainsDate: 4
        })
        const isSelected = this.isWeekSelected(week, year)
        const isCurrent = this.isWeekCurrent(row)
        const className = {
          'c-date-picker-week-row': true,
          'c-date-picker__week--current': isCurrent,
          'c-date-picker__week--active': index === activeIndex
        }
        let cellClsName = ''
        if (this.setCellClassName && viewType === 'week') {
          cellClsName = this.setCellClassName(`${year}w${week}`)
        }
        let isCellDisabled = false
        if (this.setCellDisabled && viewType === 'week') {
          isCellDisabled = this.setCellDisabled(`${year}w${week}`)
        }
        weekDatas.push({
          data: row,
          year,
          week,
          disabled: isCellDisabled,
          isSelected,
          isCurrent,
          className: [className, cellClsName],
          index
        })
      })
      return weekDatas
    },
    selectedIndex() {
      return this.weekDatas.find(data => data.isSelected)?.index
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
    setActiveIndex() {
      this.activeIndex = this.selectedIndex
    },
    isWeekSelected(week, year) {
      return (this.selectedDate || []).some(d => {
        const [selectedYear, selectedWeek] = d.split('w')
        return week === Number(selectedWeek) && year === Number(selectedYear)
      })
    },
    isWeekCurrent(data) {
      return data.some(d => {
        return isSameDay(d.date, new Date())
      })
    },
    keydown(code) {
      this.activeIndex =
        this.activeIndex ??
        util.getCurrentCellIndex(this.weekDatas) ??
        (code === KEYS.DOWN ? -1 : 1)
      if (code === KEYS.ENTER) {
        return this.$calendar.pickWeek(this.weekDatas[this.activeIndex])
      }

      this.activeIndex += util.getDeltaAfterKeydown(code, 1)

      if (this.activeIndex < 0) {
        this.activeIndex += DAY_ROW_NUM
        return this.$calendar.goMonth(-1)
      } else if (this.activeIndex >= DAY_ROW_NUM) {
        this.activeIndex -= DAY_ROW_NUM
        return this.$calendar.goMonth(1)
      }
    }
  },

  render() {
    const { weeks, weekDatas } = this

    return (
      <div role="grid" class="c-date-picker-calendar__weeks">
        <div role="row" class="c-date-picker-calendar__weeks__header">
          {weeks.map(week => (
            <span>{week}</span>
          ))}
        </div>
        <div role="rowgroup" class="c-date-picker-calendar__weeks__body">
          {weekDatas.map((row, i) => (
            <div role="row">
              <button
                role="gridcell"
                class={row.className}
                aria-selected={row.isSelected}
                disabled={row.disabled}
                onclick={() => this.$calendar.pickWeek(row)}
                onmouseenter={() => this.$calendar.updateDateRange(row.date)}
              >
                {row.data &&
                  row.data.map(item => (
                    <span class={item.className}>{item.day}</span>
                  ))}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
