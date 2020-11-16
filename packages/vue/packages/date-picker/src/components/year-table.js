import { getYear } from 'date-fns'
import { ROW_NUM, COL_NUM, TWO, TEN, KEYS } from '../const'
import util from '../util'

export default {
  name: 'CYearTable',

  inject: ['$calendar', '$datepicker'],

  props: {
    selectedYear: Number,
    pickedYear: Number,
    startYear: Number,
    endYear: Number,
    setCellDisabled: Function,
    setCellClassName: Function,
    viewType: String
  },

  data() {
    return {
      activeIndex: null
    }
  },

  computed: {
    years() {
      const years = []
      const {
        pickedYear,
        selectedYear,
        startYear,
        endYear,
        activeIndex,
        viewType
      } = this
      const start = pickedYear - (pickedYear % TEN)
      for (let i = -1; i < COL_NUM * ROW_NUM - 1; i++) {
        const year = start + i
        const isPrev = i === -1
        const isNext = i === TEN
        const isSelected = year === selectedYear
        const isCurrent = year === getYear(new Date())
        const className = {
          'c-date-picker__year--current': isCurrent,
          'c-date-picker__year--dimmed': isPrev || isNext,
          'c-date-picker__year--selected': isSelected,
          'c-date-picker__month--active': i + 1 === activeIndex
        }
        let cellClsName = ''
        if (this.setCellClassName && viewType === 'year') {
          cellClsName = this.setCellClassName(new Date(`${year}`))
        }

        let isCellDisabled = false
        if (this.setCellDisabled && viewType === 'year') {
          isCellDisabled = this.setCellDisabled(new Date(`${year}`))
        }
        years.push({
          year,
          className: [className, cellClsName],
          disabled: year < startYear || year > endYear || isCellDisabled,
          isSelected,
          index: i + 1,
          isCurrent
        })
      }
      return years
    },
    rows() {
      const rows = []
      for (let i = 0; i < ROW_NUM; i++) {
        rows.push(this.years.slice(i * COL_NUM, (i + 1) * COL_NUM))
      }
      return rows
    },
    selectedIndex() {
      return this.years.find(data => data.isSelected)?.index
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
    keydown(code) {
      this.activeIndex =
        this.activeIndex ??
        util.getCurrentCellIndex(this.years) ??
        (code === KEYS.DOWN ? -TWO : ROW_NUM)
      if (code === KEYS.ENTER) {
        return this.$calendar.pickYear(this.years[this.activeIndex])
      }

      this.activeIndex += util.getDeltaAfterKeydown(code, COL_NUM)
      const total = this.years.length
      if (this.activeIndex === 0) {
        this.activeIndex -= TWO
      } else if (this.activeIndex === total - 1) {
        this.activeIndex += TWO
      }

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
                  onclick={() => this.$calendar.pickYear(item)}
                >
                  {item.year}
                </button>
              ))}
          </div>
        ))}
      </div>
    )
  }
}
