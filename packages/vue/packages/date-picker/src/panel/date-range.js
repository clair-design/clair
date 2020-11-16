import {
  isValid,
  isAfter,
  differenceInCalendarMonths,
  isSameMonth,
  getYear,
  getMonth,
  addMonths
} from 'date-fns'
import CCalendar from '../components/calendar'
import { TWO } from '../const'

export default {
  name: 'CDateRange',

  inject: ['$datepicker'],

  provide() {
    return {
      $datepanel: this
    }
  },

  data() {
    return {
      selectedStartDate: null,
      selectedEndDate: null,
      isFirstDateSelected: false,
      calendar: [],
      displayedData: {}, // 面板display的年月信息, 在初始化的时候赋值, 切换年月时修改
      selectedPanel: 'start',
      dateRange: [],
      keydownPanelIndex: 0
    }
  },

  computed: {
    isArrowHidden() {
      const {
        displayedStartYear,
        displayedStartMonth,
        displayedEndYear,
        displayedEndMonth
      } = this.displayedData

      if (this.calendar.length === TWO) {
        const viewTypeStart = this.calendar[0].viewType
        const viewTypeEnd = this.calendar[1].viewType
        if (viewTypeStart !== 'date' || viewTypeEnd !== 'date') return false
      }
      // start与end面板相差的月份, 永远<-1
      const deltaMonth = differenceInCalendarMonths(
        new Date(displayedStartYear, displayedStartMonth),
        new Date(displayedEndYear, displayedEndMonth)
      )
      return deltaMonth >= -1
    },
    selectedData() {
      const start = this.selectedStartDate
      const end = this.selectedEndDate

      let selectedStartDate = [start]
      let selectedEndDate = [end]
      const selectedStartYear = getYear(start)
      const selectedStartMonth = getMonth(start)
      const selectedEndYear = getYear(end)
      const selectedEndMonth = getMonth(end)

      const selectNone = start === null && end === null
      const selectAll = start && end
      const selecting = !selectNone && !selectAll

      // 选中了一个值
      if (selecting) {
        if (this.selectedPanel === 'start') {
          selectedStartDate = [start]
          selectedEndDate = []
        } else {
          selectedEndDate = [start]
          selectedStartDate = []
        }
      }

      if (isSameMonth(start, end)) {
        selectedStartDate.push(end)
        selectedEndDate.splice(0)
      }

      return {
        selectedStartDate,
        selectedEndDate,
        selectedStartYear,
        selectedStartMonth,
        selectedEndYear,
        selectedEndMonth
      }
    }
  },

  watch: {
    '$datepicker.value'() {
      this.initDate()
    },
    '$datepicker.isOpened'() {
      this.isFirstDateSelected = false
      this.keydownPanelIndex = 0
    }
  },

  mounted() {
    this.initDate()
    // range时需要设置picker的calendar为this 而不是calendar组件
    // 因为需要处理两个面板的焦点位置
    this.$datepicker.setCalendar(this)
  },

  methods: {
    initDate() {
      const { value } = this.$datepicker
      if (!Array.isArray(value)) {
        throw new Error('Should bind an array value !')
      }
      const [start, end] = value
      this.selectedStartDate = this.getValidDate(start)
      this.selectedEndDate = this.getValidDate(end)
      this.dateRange = !this.selectedStartDate
        ? []
        : this.getSortedDate(this.selectedStartDate, this.selectedEndDate)
      this.updateDisplayData()
    },
    /**
     *  根据value初始化tmpDisplayedData数据
     */
    updateDisplayData() {
      const start = this.selectedStartDate
      const end = this.selectedEndDate

      const start2Use = start ?? new Date()
      const end2Use = end ?? new Date()

      const displayedStartYear = getYear(start2Use)
      const displayedStartMonth = getMonth(start2Use)
      let displayedEndYear = getYear(end2Use)
      let displayedEndMonth = getMonth(end2Use)

      // 若end没有选中, 或跟start选中了同一个值, 则end面板要加一个月
      if (end === null || isSameMonth(start, end)) {
        const newDate = addMonths(
          new Date(displayedEndYear, displayedEndMonth),
          1
        )
        displayedEndMonth = getMonth(newDate)
        displayedEndYear = getYear(newDate)
      }
      this.displayedData = {
        displayedStartYear,
        displayedStartMonth,
        displayedEndYear,
        displayedEndMonth
      }
    },
    change(value, panel) {
      if (!this.isFirstDateSelected) {
        this.selectedStartDate = this.getValidDate(value)
        this.selectedEndDate = null
        this.isFirstDateSelected = true
        this.selectedPanel = panel
        this.dateRange = []
      } else {
        this.selectedEndDate = this.getValidDate(value)
        this.$datepicker.change(
          this.getSortedDate(this.selectedStartDate, this.selectedEndDate)
        )
      }
    },
    getSortedDate(start, end) {
      return isAfter(end, start) ? [start, end] : [end, start]
    },
    getValidDate(value) {
      const date = typeof value === 'string' ? new Date(value) : value
      return isValid(date) ? date : null
    },
    /**
     * 判断两个range面板之间的前后关系, start不能超过end, 若超过, 则不允许切换年
     */
    checkJumpYearValid(pickedYear, pickedMonth, isStart) {
      const otherCalendar = this.calendar[isStart ? 1 : 0]
      const date = new Date(pickedYear, pickedMonth)
      const otherDate = new Date(
        otherCalendar.pickedYear,
        otherCalendar.pickedMonth
      )
      const deltaMonth = differenceInCalendarMonths(date, otherDate)
      return isStart ? deltaMonth <= -1 : deltaMonth >= 1
    },
    updateDateRange(activeDate) {
      if (
        !this.selectedStartDate ||
        (this.selectedStartDate && this.selectedEndDate)
      ) {
        return
      }

      this.dateRange = !this.selectedStartDate
        ? []
        : this.getSortedDate(this.selectedStartDate, activeDate)
    },
    onkeydown(code) {
      this.calendar[this.keydownPanelIndex].onkeydown(code)
    },
    /**
     * calendar内部切换面板时修改active所在的面板
     */
    onPanelChange(index, activeDate = null) {
      this.keydownPanelIndex = index
      const table = this.calendar[index].$refs.dateTable
      if (table) {
        table.activeDate = activeDate || table.activeDate
      }
    },
    updateDisplayedData(type, val, isStart) {
      const tableType = isStart ? 'Start' : 'End'
      this.displayedData[`displayed${tableType}${type}`] = val
    },
    setCalendar(calendar) {
      this.calendar.push(calendar)
    }
  },

  render() {
    const {
      displayedStartYear,
      displayedStartMonth,
      displayedEndYear,
      displayedEndMonth
    } = this.displayedData

    const {
      selectedStartDate,
      selectedEndDate,
      selectedStartYear,
      selectedStartMonth,
      selectedEndYear,
      selectedEndMonth
    } = this.selectedData

    const { dateRange } = this

    const shortcut =
      this.$datepicker.$scopedSlots?.shortcut?.() ||
      this.$datepicker.$slots?.shortcut

    return (
      <div>
        <div class="c-date-picker-popup__content">
          <CCalendar
            selectedDate={selectedStartDate}
            displayedMonth={displayedStartMonth}
            displayedYear={displayedStartYear}
            selectedMonth={selectedStartMonth}
            selectedYear={selectedStartYear}
            dateRange={dateRange}
            endYear={displayedEndYear}
            endMonth={displayedEndMonth}
            isStart
            isRange
          />
          <CCalendar
            selectedDate={selectedEndDate}
            displayedMonth={displayedEndMonth}
            displayedYear={displayedEndYear}
            selectedMonth={selectedEndMonth}
            selectedYear={selectedEndYear}
            dateRange={dateRange}
            startYear={displayedStartYear}
            startMonth={displayedStartMonth}
            isEnd
            isRange
          />
        </div>
        {shortcut && <div class="c-date-picker-popup__footer">{shortcut}</div>}
      </div>
    )
  }
}
