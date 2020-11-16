import {
  isBefore,
  isAfter,
  isToday,
  isSameDay,
  getDate,
  getDay,
  getMonth,
  startOfMonth,
  lastDayOfMonth,
  subDays,
  addDays,
  getYear
} from 'date-fns'
import { isNil } from '@clair/helpers'
import { WEEKS, DAY_ROW_NUM, DAY_COL_NUM, KEYS, TWO } from '../const'
import util from '../util'

export default {
  name: 'CDateTable',

  inject: ['$datepicker', '$calendar'],

  props: {
    selectedDate: {
      type: Array,
      validator(dates) {
        return dates.every(date => isNil(date) || date instanceof Date)
      }
    },
    pickedMonth: Number,
    pickedYear: Number,
    firstDayOfWeek: Number,
    setCellDisabled: Function,
    setCellClassName: Function,
    lang: String,
    isRange: Boolean,
    viewType: String,
    dateRange: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      activeDate: null // for keyboard event
    }
  },

  computed: {
    weeks() {
      return [...WEEKS, ...WEEKS].slice(
        this.firstDayOfWeek,
        this.firstDayOfWeek + WEEKS.length
      )
    },
    dates() {
      const dates = []
      const {
        firstDayOfWeek,
        pickedYear,
        pickedMonth,
        activeDate,
        viewType,
        dateRange
      } = this

      const pickedDate = pickedYear
        ? new Date(pickedYear, pickedMonth)
        : new Date()

      const firstDateOfCurrMonth = startOfMonth(pickedDate)
      const lastDateOfCurrMonth = lastDayOfMonth(pickedDate)
      const firstDayOfMonth = getDay(firstDateOfCurrMonth)
      const prevMonthDayNum =
        firstDayOfMonth > firstDayOfWeek
          ? firstDayOfMonth - firstDayOfWeek
          : DAY_COL_NUM + firstDayOfMonth - firstDayOfWeek

      const startTime = subDays(firstDateOfCurrMonth, prevMonthDayNum)
      for (let i = 0; i < DAY_COL_NUM * DAY_ROW_NUM; i++) {
        const date = addDays(startTime, i)
        const deltaMonth =
          (isBefore(date, firstDateOfCurrMonth) && -1) ||
          (isAfter(date, lastDateOfCurrMonth) && 1) ||
          0
        const isCurrentMonth = deltaMonth === 0
        const isSelected = this.isDateSelected(date)
        const isCurrent = isToday(date)

        const className = {
          'c-date-picker__day--current': isCurrent,
          'c-date-picker__day--active': isSameDay(date, activeDate),
          'c-date-picker__day--dimmed': !isCurrentMonth,
          'c-date-picker__day--selected': isCurrentMonth && isSelected,
          'c-date-picker__day--highlight': false
        }
        if (dateRange.length > 1) {
          const notBefore = isAfter(date, dateRange[0])
          const notAfter = isBefore(date, dateRange[1])
          const isSame =
            isSameDay(date, dateRange[0]) || isSameDay(date, dateRange[1])
          className['c-date-picker__day--highlight'] =
            isSame || (notBefore && notAfter)
          className['c-date-picker__day--selected'] = isCurrentMonth && isSame
        }
        let cellClsName = ''
        if (this.setCellClassName && viewType === 'date') {
          cellClsName = this.setCellClassName(date)
        }

        let isCellDisabled = false
        if (this.setCellDisabled && viewType === 'date') {
          isCellDisabled = this.setCellDisabled(date)
        }

        dates.push({
          index: i,
          date,
          day: getDate(date),
          disabled: isCellDisabled,
          isSelected,
          isCurrent,
          isCurrentMonth,
          className: [className, cellClsName]
        })
      }
      return dates
    },
    rows() {
      const rows = []
      for (let i = 0; i < DAY_ROW_NUM; i++) {
        rows.push(this.dates.slice(i * DAY_COL_NUM, (i + 1) * DAY_COL_NUM))
      }
      return rows
    },
    selectedActiveDate() {
      return this.dates.find(date => date.isSelected)?.date
    }
  },

  watch: {
    activeDate(val) {
      if (!val) return
      this.dates.forEach(({ className, date }) => {
        className['c-date-picker__day--active'] = isSameDay(date, val)
      })
    },
    selectedDate: {
      handler(val) {
        if (val.length !== 1) return
        this.activeDate = this.selectedActiveDate
      },
      deep: true
    },
    '$datepicker.isOpened'(val) {
      if (!val) this.activeDate = this.selectedActiveDate
    }
  },

  methods: {
    isDateSelected(date) {
      return (this.selectedDate || []).some(
        d => d instanceof Date && isSameDay(d, date)
      )
    },
    keydown(code) {
      this.activeDate = this.activeDate || this.getCurrentActive()
      const inCurrent = this.isActiveInCurrentTable()
      if (!inCurrent) {
        const firstDate = this.dates.find(date => date.day === 1)
        this.activeDate = firstDate.date
        this.$calendar.updateDateRange(this.activeDate)
        return
      }
      if (code === KEYS.ENTER) {
        this.$calendar.pickDate({
          date: this.activeDate,
          disabled: this.isActiveDisabled(this.activeDate)
        })
        return
      }
      const delta = util.getDeltaAfterKeydown(code, DAY_COL_NUM)
      this.activeDate = addDays(this.activeDate, delta)
      this.$calendar.updateDateRange(this.activeDate)
      if (getMonth(this.activeDate) !== this.pickedMonth) {
        return this.$calendar.goMonth(delta < 0 ? -1 : 1, true, true)
      }
    },
    isActiveDisabled() {
      const item = this.dates.find(date =>
        isSameDay(date.date, this.activeDate)
      )
      return item ? item.disabled : true
    },
    isActiveInCurrentTable() {
      const activeYear = getYear(this.activeDate)
      const activeMonth = getMonth(this.activeDate)
      return this.pickedYear === activeYear && this.pickedMonth === activeMonth
    },
    getCurrentActive() {
      return !this.isRange || this.dateRange.length === TWO
        ? this.selectedDate[0] ?? new Date()
        : new Date()
    },
    // called by calendar
    resetActiveDate() {
      this.activeDate = null
    }
  },

  render() {
    const { weeks, rows } = this

    return (
      <div role="grid" class="c-date-picker-calendar__days">
        <div role="row" class="c-date-picker-calendar__days__header">
          {weeks.map(week => (
            <span>{week}</span>
          ))}
        </div>
        <div role="rowgroup" class="c-date-picker-calendar__days__body">
          {rows.map(row => (
            <div role="row">
              {row &&
                row.map(item => (
                  <button
                    role="gridcell"
                    class={item.className}
                    aria-selected={item.isSelected}
                    disabled={item.disabled}
                    onclick={() => this.$calendar.pickDate(item)}
                    onmouseenter={() =>
                      this.$calendar.updateDateRange(item.date)
                    }
                  >
                    {item.day}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
