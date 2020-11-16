import { getYear, getMonth, addDays } from 'date-fns'
import CCalendar from '../components/calendar'
import { WEEKS, WEEK_CENTER_INDEX } from '../const'

export default {
  name: 'CWeek',

  inject: ['$datepicker'],

  provide() {
    return {
      $datepanel: this
    }
  },

  computed: {
    pickerValue() {
      return this.$datepicker.value
    },
    displayedYear() {
      return this.selectedYear || getYear(new Date())
    },
    displayedMonth() {
      return this.selectedMonth === null
        ? getMonth(new Date())
        : this.selectedMonth
    },
    selectedYear() {
      return Number(this.pickerValue?.split('w')[0])
    },
    selectedMonth() {
      if (!this.pickerValue) return null

      const [year, week] = this.pickerValue.split('w')
      // lastYearDays 表示与上一年最后几天在同一周的日期的数量
      const lastYearDays =
        new Date(year, 0).getDay() - this.$datepicker.firstDayOfWeek
      // 若lastYearDays > WEEK_CENTER_INDEX, 则当年的第一周即为当年第一天所在的周
      // 否则,当年所在第一天的周为上一年的最后一周
      const deltaWeek = lastYearDays > WEEK_CENTER_INDEX ? week : week - 1
      // 计算当前week中间的日期
      const weekCenter = addDays(
        new Date(year, 0),
        deltaWeek * WEEKS.length + WEEK_CENTER_INDEX - lastYearDays
      )
      return getMonth(weekCenter)
    }
  },

  render() {
    const { displayedMonth, displayedYear, selectedYear, selectedMonth } = this

    return (
      <div>
        <div class="c-date-picker-popup__content">
          <CCalendar
            selectedDate={[this.pickerValue]}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            displayedMonth={displayedMonth}
            displayedYear={displayedYear}
            dateRange={[]}
          />
        </div>
      </div>
    )
  }
}
