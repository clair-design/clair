import {
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
  IconArrowLeft,
  IconArrowRight
} from 'packages/icon'
import {
  TYPE_DATE,
  TYPE_WEEK,
  TYPE_MONTH,
  TYPE_YEAR,
  TEN,
  TYPE_QUARTER
} from '../const'

export default {
  name: 'CPickerHeader',

  inject: ['$calendar', '$datepanel'],

  props: {
    pickedYear: Number,
    pickedMonth: Number,
    viewType: String,
    isStart: Boolean
  },

  data() {
    return {}
  },

  computed: {
    startYear() {
      return this.pickedYear - (this.pickedYear % TEN)
    },
    endYear() {
      return this.startYear + (TEN - 1)
    },
    hideArrow() {
      const hideValue = this.isStart ? 'right' : 'left'
      return this.$datepanel.isArrowHidden && this.viewType === 'date'
        ? hideValue
        : ''
    }
  },

  render() {
    const {
      startYear,
      endYear,
      viewType,
      pickedYear,
      pickedMonth,
      hideArrow
    } = this

    const isDateTable = viewType === TYPE_DATE || viewType === TYPE_WEEK
    const isMonthTable = viewType === TYPE_MONTH || viewType === TYPE_QUARTER

    const canLeftYearShown = hideArrow !== 'left'
    const canLeftMonthShown = hideArrow !== 'left' && isDateTable
    const canRightYearShown = hideArrow !== 'right'
    const canRightMonthShown = hideArrow !== 'right' && isDateTable

    return (
      <div class="c-date-picker-calendar__header">
        <button
          disabled={!canLeftYearShown}
          onclick={() => this.$calendar.goYear(-1, canLeftYearShown)}
        >
          {canLeftYearShown && <IconDoubleArrowLeft />}
        </button>
        <button
          disabled={!canLeftMonthShown}
          onclick={() => this.$calendar.goMonth(-1, false, canLeftMonthShown)}
        >
          {canLeftMonthShown && <IconArrowLeft />}
        </button>
        {isDateTable && (
          <div>
            <button
              onclick={() => {
                this.$calendar.changeViewType('year')
              }}
            >
              {pickedYear}年
            </button>
            <button
              onclick={() => {
                this.$calendar.changeViewType('month')
              }}
            >
              {pickedMonth + 1}月
            </button>
          </div>
        )}
        {isMonthTable && (
          <div>
            <button
              onclick={() => {
                this.$calendar.changeViewType('year')
              }}
            >
              {pickedYear}年
            </button>
          </div>
        )}
        {viewType === TYPE_YEAR && (
          <div>
            <button>
              {startYear}年 - {endYear}年
            </button>
          </div>
        )}
        <button
          disabled={!canRightMonthShown}
          onclick={() => this.$calendar.goMonth(1, false, canRightMonthShown)}
        >
          {canRightMonthShown && <IconArrowRight />}
        </button>
        <button
          disabled={!canRightYearShown}
          onclick={() => this.$calendar.goYear(1, canRightYearShown)}
        >
          {canRightYearShown && <IconDoubleArrowRight />}
        </button>
      </div>
    )
  }
}
