import { getYear, getMonth, isValid } from 'date-fns'
import CCalendar from '../components/calendar'

export default {
  name: 'CDate',

  inject: ['$datepicker'],

  provide() {
    return {
      $datepanel: this
    }
  },

  computed: {
    selectedDate() {
      const { value } = this.$datepicker
      const date = new Date(value)
      return value && isValid(date) ? date : null
    },
    displayedYear() {
      return getYear(this.selectedDate || new Date())
    },
    displayedMonth() {
      return getMonth(this.selectedDate || new Date())
    }
  },

  render() {
    const { selectedDate, displayedMonth, displayedYear } = this

    const shortcut =
      this.$datepicker.$scopedSlots?.shortcut?.() ||
      this.$datepicker.$slots?.shortcut

    return (
      <div>
        <div class="c-date-picker-popup__content">
          <CCalendar
            selectedDate={[selectedDate]}
            selectedYear={getYear(selectedDate)}
            selectedMonth={getMonth(selectedDate)}
            displayedMonth={displayedMonth}
            displayedYear={displayedYear}
            dateRange={[]}
          />
        </div>
        {shortcut && <div class="c-date-picker-popup__footer">{shortcut}</div>}
      </div>
    )
  }
}
