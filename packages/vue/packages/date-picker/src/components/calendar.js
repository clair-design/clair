import { pick } from 'lodash-es'
import CPickerHeader from './picker-header'
import CDateTable from './date-table'
import CWeekTable from './week-table'
import CMonthTable from './month-table'
import CQuarterTable from './quarter-table'
import CYearTable from './year-table'
import {
  TYPE_DATE,
  TYPE_WEEK,
  TYPE_MONTH,
  TYPE_QUARTER,
  TYPE_YEAR,
  TEN,
  TWO
} from '../const'

export default {
  name: 'CCalendar',

  inject: ['$datepicker', '$datepanel'],

  provide() {
    return {
      $calendar: this
    }
  },

  props: {
    selectedDate: Array,
    displayedYear: Number,
    displayedMonth: Number,
    selectedYear: Number,
    selectedMonth: Number,
    isStart: Boolean,
    isEnd: Boolean,
    isRange: Boolean,
    dateRange: {
      type: Array,
      default: () => {
        return []
      }
    },
    startYear: Number,
    startMonth: Number,
    endYear: Number,
    endMonth: Number
  },

  data() {
    return {
      viewType: null,
      initTypeView: null,
      pickedYear: null,
      pickedMonth: null
    }
  },

  computed: {
    type() {
      return this.$datepicker.type
    }
  },

  watch: {
    selectedDate: {
      handler() {
        this.initDate()
      },
      deep: true
    },
    '$datepicker.isOpened'(val) {
      if (val) {
        this.initDate()
      }
    },
    viewType(newVal, oldVal) {
      if (oldVal) {
        this.$datepicker.focusPanel()
      }
    },
    displayedMonth(val) {
      this.pickedMonth = val
    },
    displayedYear(val) {
      this.pickedYear = val
    },
    pickedMonth(val) {
      this.updateRangeDisplayedData('Month')
    },
    pickedYear(val) {
      this.updateRangeDisplayedData('Year')
    }
  },

  mounted() {
    this.initDate()

    // isRange
    if (Array.isArray(this.$datepanel.calendar)) {
      this.$datepanel.setCalendar(this)
    } else {
      this.$datepicker.setCalendar(this)
    }
  },

  methods: {
    initDate() {
      this.viewType = this.$datepicker.viewType
      this.initTypeView = this.viewType
      this.pickedYear = this.displayedYear
      this.pickedMonth = this.displayedMonth
    },
    changeViewType(type) {
      this.viewType = type
    },
    change(value) {
      const panel = this.isRange ? this.$datepanel : this.$datepicker
      panel.change(value, this.isStart ? 'start' : 'other')
    },
    pickDate({ date, disabled }) {
      if (disabled) return
      this.change(date)
    },
    pickWeek({ year, week, disabled }) {
      if (disabled) return
      const formatWeek = `0${week}`.slice(-TWO)
      this.change(`${year}w${formatWeek}`)
    },
    pickMonth({ month, year, disabled }) {
      if (disabled) return
      this.pickedMonth = month
      if (this.type.includes(TYPE_MONTH)) {
        this.change(new Date(year, month))
      } else {
        this.viewType = this.initTypeView
      }
    },
    pickQuarter({ quarter, year, disabled }) {
      if (disabled) return
      this.change(`${year}q${quarter}`)
    },
    pickYear({ year, disabled }) {
      if (disabled) return
      this.pickedYear = year
      if (this.type.includes(TYPE_YEAR)) {
        this.change(new Date(`${year}`))
      } else {
        this.viewType =
          this.initTypeView === TYPE_QUARTER ? TYPE_QUARTER : TYPE_MONTH
      }
    },
    goYear(diff, isButtonClickable = true) {
      if (!isButtonClickable) return
      // 需要判断跳转之后, 两个range面板直接的前后关系, start不能超过end
      const deltaYear = diff * (this.viewType === TYPE_YEAR ? TEN : 1)
      if (this.isRange) {
        const valid = this.$datepanel.checkJumpYearValid(
          this.pickedYear + deltaYear,
          this.pickedMonth,
          this.isStart
        )
        if (!valid) return
      }
      this.pickedYear += deltaYear
    },
    /**
     * @param {*} diff month diff
     * @param {*} fromKeydown from keyboard event
     * @param {*} isButtonClickable !isArrowHidden, default for true
     */
    goMonth(diff, fromKeydown, isButtonClickable = true) {
      if (!isButtonClickable) return
      const isStartDateGoNext = this.isStart && diff > 0
      const isEndDateGoPrev = this.isEnd && diff < 0
      if (
        fromKeydown &&
        this.isRange &&
        this.$datepanel.isArrowHidden &&
        (isStartDateGoNext || isEndDateGoPrev)
      ) {
        // 面板通过keyboard事件切换了年月, 并且此时两个面板月份相邻,
        // 此时焦点要从start换到end,或者相反
        this.$datepanel.onPanelChange(
          this.isStart ? 1 : 0,
          this.$refs.dateTable.activeDate
        )
        this.$refs.dateTable.resetActiveDate()
        return
      }
      const month = this.pickedMonth + diff
      const minMonth = 0
      const maxMonth = 11
      if (month > maxMonth) {
        this.pickedMonth = minMonth
        this.goYear(1)
      } else if (month < minMonth) {
        this.pickedMonth = maxMonth
        this.goYear(-1)
      } else {
        this.pickedMonth = month
      }
    },
    updateRangeDisplayedData(type) {
      if (!this.isRange) return
      this.$datepanel.updateDisplayedData(
        type,
        this[`picked${type}`],
        this.isStart
      )
    },
    updateDateRange(activeDate) {
      this.$datepanel.updateDateRange?.(activeDate)
    },
    onkeydown(code) {
      this.$refs[`${this.viewType}Table`]?.keydown(code)
    },
    clickCalendar() {
      if (this.isRange) {
        // 面板click切换年月份时, 将焦点置为当前面板, 此时isStart&index=0
        this.$datepanel.onPanelChange(this.isStart ? 0 : 1)
      }
    }
  },

  render() {
    const {
      viewType,
      selectedYear,
      selectedMonth,
      pickedYear,
      pickedMonth,
      startYear,
      startMonth,
      endYear,
      endMonth,
      clickCalendar,
      isStart
    } = this

    const {
      setCellClassName,
      setCellDisabled,
      viewType: pickerViewType
    } = this.$datepicker

    const commonProps = {
      viewType: pickerViewType,
      setCellClassName,
      setCellDisabled
    }

    const tableProps = Object.assign(
      {},
      pick(this, [
        'selectedDate',
        'viewType',
        'pickedYear',
        'pickedMonth',
        'dateRange',
        'isRange'
      ]),
      pick(this.$datepicker, ['firstDayOfWeek']),
      commonProps
    )

    return (
      <div class="c-date-picker-calendar" onclick={clickCalendar}>
        <CPickerHeader
          pickedYear={pickedYear}
          pickedMonth={pickedMonth}
          viewType={viewType}
          isStart={isStart}
        />
        {viewType === TYPE_DATE && (
          <CDateTable {...{ props: tableProps }} ref="dateTable" />
        )}
        {viewType === TYPE_WEEK && (
          <CWeekTable {...{ props: tableProps }} ref="weekTable" />
        )}
        {viewType === TYPE_MONTH && (
          <CMonthTable
            {...{ props: commonProps }}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            pickedYear={pickedYear}
            startYear={startYear}
            startMonth={startMonth}
            endYear={endYear}
            endMonth={endMonth}
            ref="monthTable"
          />
        )}
        {viewType === TYPE_QUARTER && (
          <CQuarterTable
            {...{ props: commonProps }}
            selectedDate={this.selectedDate}
            pickedYear={pickedYear}
            ref="quarterTable"
          />
        )}
        {viewType === TYPE_YEAR && (
          <CYearTable
            {...{ props: commonProps }}
            selectedYear={selectedYear}
            pickedYear={pickedYear}
            startYear={startYear}
            endYear={endYear}
            ref="yearTable"
          />
        )}
      </div>
    )
  }
}
