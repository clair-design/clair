import { getYear } from 'date-fns'
import CCalendar from '../components/calendar'

export default {
  name: 'CQuarter',

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
    selectedYear() {
      return Number(this.pickerValue?.split('q')[0])
    }
  },

  render() {
    const { displayedYear, selectedYear } = this

    return (
      <div>
        <div class="c-date-picker-popup__content">
          <CCalendar
            selectedDate={[this.pickerValue]}
            selectedYear={selectedYear}
            displayedYear={displayedYear}
            dateRange={[]}
          />
        </div>
      </div>
    )
  }
}
