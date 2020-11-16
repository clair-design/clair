import { format, isSameDay, isValid, addDays, isBefore } from 'date-fns'
import Popover from 'packages/popover'
import { IconCalendar, IconClear } from 'packages/icon'
import { AutoIncreasingCounter } from '@clair/helpers'
import CDatePanel from './panel/date'
import CWeekPanel from './panel/week'
import CQuarterPanel from './panel/quarter'
import CDateRangePanel from './panel/date-range'
import {
  TYPE_DATE,
  TYPE_WEEK,
  TYPE_MONTH,
  TYPE_YEAR,
  MAX_WEEK_NUMBER,
  MAX_QUARTER_NUMBER,
  WEEKS,
  WEEK_CENTER_INDEX,
  TYPE_QUARTER,
  KEYS,
  TWO
} from './const'
import { getYear } from 'date-fns'

const counter = /*@__PURE__*/ new AutoIncreasingCounter()

const dateFormatValid = value => {
  const date = new Date('1970-01-01')
  const formatDate = new Date(format(date, value))
  return isSameDay(date, formatDate)
}

export default {
  name: 'CDatePicker',

  inject: {
    $formItem: {
      default: null
    }
  },

  provide() {
    return {
      $datepicker: this
    }
  },

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    value: {
      type: [Date, Array, String],
      required: true,
      validator: value => {
        if (Array.isArray(value)) {
          return !value.length || value.length === TWO
        }
        return true
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    size: {
      type: String,
      default: () => {
        return 'normal'
      },
      validator: value => {
        return ['large', 'normal', 'small'].includes(value)
      }
    },
    type: {
      type: String,
      default: () => {
        return 'date'
      },
      validator: value => {
        return [
          'date',
          'week',
          'month',
          'quarter',
          'year',
          'daterange',
          'monthrange'
        ].includes(value)
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return '选择日期'
      }
    },
    startPlaceholder: {
      type: String,
      default: () => {
        return '开始日期'
      }
    },
    endPlaceholder: {
      type: String,
      default: () => {
        return '结束日期'
      }
    },
    clearable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    readonly: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    format: {
      type: String,
      validator: dateFormatValid
    },
    valueFormat: {
      type: String,
      validator: dateFormatValid
    },
    firstDayOfWeek: {
      type: Number,
      default: () => {
        return 0
      }
    },
    setCellDisabled: Function,
    setCellClassName: Function
  },

  data() {
    return {
      isOpened: false,
      panelEl: null,
      isHovering: false,
      isComposing: false,
      customInputValue: null,
      id: `c-date-picker-${counter.next()}`,
      calendar: null, // used for keydown event
      weekReg: /^(\d{4}) 第(\d{2})周$/,
      quarterReg: /^(\d{4}) 第(\d)季度$/,
      isFocused: false
    }
  },

  computed: {
    shouldShowClearIcon() {
      const hasValue = this.isRange
        ? this.value && Array.isArray(this.value) && this.value.length
        : this.value !== undefined && this.value !== ''
      return this.clearable && !this.disabled && this.isHovering && hasValue
    },
    defaultFormat() {
      const { type } = this
      if (type.includes(TYPE_MONTH)) {
        return 'yyyy-MM'
      } else if (type === TYPE_YEAR) {
        return 'yyyy'
      }
      return 'yyyy-MM-dd'
    },
    isRange() {
      return this.type.includes('range')
    },
    viewType() {
      const types = [TYPE_DATE, TYPE_WEEK, TYPE_MONTH, TYPE_QUARTER, TYPE_YEAR]
      return types.find(type => this.type.startsWith(type))
    },
    isWeek() {
      return this.viewType === TYPE_WEEK
    },
    isMonth() {
      return this.viewType === TYPE_MONTH
    },
    isQuarter() {
      return this.viewType === TYPE_QUARTER
    }
  },

  watch: {
    value() {
      this.formatCustomValue()
    },
    isOpened() {
      if (this.isOpened) {
        this.$nextTick(() => {
          if (this.readonly) {
            this.$el?.focus()
          } else if (!this.isRange) {
            this.$el.querySelector('input')?.focus()
          }
          this.focus()
        })
      } else {
        this.$el?.focus()
      }
      this.$emit('visibility-change', this.isOpened)
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.panelEl = this.$refs.panel
    })
    this.formatCustomValue()
  },

  methods: {
    close() {
      this.isOpened = false
      this.resetValue()
    },
    open() {
      if (this.disabled) return
      this.isOpened = true
    },
    focus(event) {
      if (this.isFocused) return
      this.$emit('focus')
      this.isFocused = true
      window.addEventListener('click', this.bodyClickHandler, true)
    },
    blur(event) {
      this.$emit('blur')
      this.$formItem?.handleFormItemBlur?.()
      this.isFocused = false
      window.removeEventListener('click', this.bodyClickHandler, true)
    },
    clear(event) {
      event.stopPropagation()
      this.$emit('clear')
      this.change(this.isRange ? [] : '')
    },
    bodyClickHandler(event) {
      if (!this.$el || !this.$refs.panel) return

      const { panel } = this.$refs
      const isInPanel = panel.contains(event.target)
      const isInFooter = panel
        .querySelector('.c-date-picker-popup__footer')
        ?.contains(event.target)
      const isInPicker = this.$el.contains(event.target)

      if ((!isInPicker && !isInPanel) || isInFooter) {
        this.close()
        this.$nextTick(() => {
          this.$el?.blur()
          this.blur()
        })
      }
    },
    isKeysKeepDefault(code) {
      return [KEYS.LEFT, KEYS.RIGHT, KEYS.BACKSPACE].includes(code)
    },
    onKeydown(e) {
      const { code } = e
      const {
        isOpened,
        open,
        close,
        clear,
        onPanelKeydown,
        focusPanel,
        readonly,
        isComposing
      } = this

      if (isComposing) return

      const isInputFocused =
        document.activeElement.parentElement === this.$refs.datepicker
      const isContainerFocused =
        document.activeElement === this.$refs.datepicker

      if (code === KEYS.TAB) this.blur()
      // tab/esc/输入框 enter 关闭
      if (
        code === KEYS.TAB ||
        code === KEYS.ESC ||
        (isInputFocused && code === KEYS.ENTER)
      ) {
        return close()
      }

      if (isContainerFocused && code === KEYS.BACKSPACE) {
        this.isOpened = false
        return clear(e)
      }

      const isFocusedInputEditable = isInputFocused && !readonly

      // 输入框内左右键等保持默认行为
      if (isFocusedInputEditable && this.isKeysKeepDefault(code)) return

      if (Object.values(KEYS).includes(code)) {
        e.preventDefault()
      }

      // div focus 展开
      if (code === KEYS.ENTER) {
        focusPanel()
        open()
      }

      if (!isOpened) return

      const downOrUpFromInput =
        isInputFocused && (code === KEYS.DOWN || code === KEYS.UP)

      if (!isFocusedInputEditable || downOrUpFromInput) {
        focusPanel()
        onPanelKeydown(e)
      }
    },
    onPanelKeydown(e) {
      const { code } = e

      if (Object.values(KEYS).includes(code)) {
        e.preventDefault()
        if (code === KEYS.TAB || code === KEYS.ESC) {
          return this.close()
        }

        this.calendar?.onkeydown(code)
      }
    },
    setCalendar(calendar) {
      this.calendar = calendar
    },
    focusPanel() {
      this.$refs.panel?.focus()
    },
    /**
     * 当关闭时, 重新计算输入框里的值
     */
    resetValue() {
      let valid
      let changeData
      if (this.isRange) {
        valid =
          this.customInputValue.length &&
          this.customInputValue.every(this.isInputValid)
        if (valid) {
          const [startCustomDate, endCustomDate] = this.customInputValue.map(
            this.formatInput
          )
          // range的值必须 前<=后 & valid
          valid =
            isBefore(new Date(startCustomDate), new Date(endCustomDate)) ||
            isSameDay(new Date(startCustomDate), new Date(endCustomDate))
          changeData = [startCustomDate, endCustomDate]
        }
      } else {
        valid = this.isInputValid(this.customInputValue)
        if (valid) {
          changeData = this.formatInput(this.customInputValue)
        }
      }
      // 若input可编辑&值有效, 则emit change
      if (!this.readonly && valid) {
        this.change(changeData)
      } else {
        // 若input内容不合法, 则根据当前value, 重置customInputValue
        this.formatCustomValue()
      }
    },
    isInputValid(input) {
      if (this.isWeek) {
        const reg = this.weekReg
        const weekDate = input.match(reg)
        if (weekDate && reg.test(input)) {
          const year = Number(weekDate[1])
          const week = Number(weekDate[2])
          if (week > MAX_WEEK_NUMBER || week <= 0) return false

          const lastYearDays = new Date(year, 0).getDay() - this.firstDayOfWeek
          const weekCenter = addDays(
            new Date(year, 0),
            (week - 1) * WEEKS.length + WEEK_CENTER_INDEX - lastYearDays
          )
          // 考虑到某些年份只有52周, 如果写入xxxx第53周, false
          return year === getYear(weekCenter)
        }
        return false
      }
      if (this.isQuarter) {
        const reg = this.quarterReg
        const quarterDate = input.match(reg)
        if (quarterDate && reg.test(input)) {
          const quarter = Number(quarterDate[2])
          if (quarter > MAX_QUARTER_NUMBER || quarter <= 0) return false
          return true
        }
        return false
      }
      return isValid(new Date(input))
    },
    formatInput(input) {
      if (this.isWeek) {
        return input.replace(this.weekReg, '$1w$2')
      } else if (this.isQuarter) {
        return input.replace(this.quarterReg, '$1q$2')
      }
      return input
    },
    change(value) {
      let date = this.formatDisplayedValue
      const usedFormat = this.valueFormat || this.defaultFormat
      let isSameValue = false
      if (this.isRange) {
        date = value.map(v => this.getFormatValue(v, usedFormat))
        isSameValue =
          date.length && date.every((d, i) => Object.is(d, this.value[i]))
      } else {
        date = this.getFormatValue(value, usedFormat)
        isSameValue = Object.is(date, this.value)
      }

      this.isOpened = false
      this.formatCustomValue()

      if (isSameValue) return

      const event = {
        target: {
          value: date
        },
        nativeEvent: window.event
      }
      this.$emit('update:value', date)
      this.$emit('change', event)
      this.$formItem?.handleFormItemChange?.()
    },
    /**
     * value改变时, 更新input框展示的值
     */
    formatCustomValue() {
      this.customInputValue = this.isRange
        ? this.value.map(this.formatDisplayedValue)
        : this.formatDisplayedValue(this.value)
    },
    formatDisplayedValue(date) {
      if (this.isWeek) {
        return date.replace(/w(\d{2})$/, ' 第$1周')
      }
      if (this.isQuarter) {
        return date.replace(/q(\d)$/, ' 第$1季度')
      }
      return this.getFormatValue(date, this.format || this.defaultFormat)
    },
    customChange(event, index) {
      const text = event?.target?.value
      if (this.isRange && Array.isArray(this.customInputValue)) {
        this.customInputValue[index] = text
      } else if (!this.isRange) {
        this.customInputValue = text
      }
    },
    getFormatValue(value, formatText) {
      if (this.isWeek || this.isQuarter) {
        return value
      }
      const date = new Date(value)
      return value && isValid(date) ? format(date, formatText) : ''
    },
    onCompositionStart(e) {
      this.isComposing = true
    },
    onCompositionEnd(e) {
      this.isComposing = false
    }
  },

  render(h) {
    const {
      id,
      size,
      disabled,
      readonly,
      type,
      placeholder,
      startPlaceholder,
      endPlaceholder,
      clear,
      open,
      isOpened,
      isRange,
      isWeek,
      isQuarter,
      shouldShowClearIcon,
      focus,
      onKeydown,
      onPanelKeydown,
      customInputValue,
      customChange,
      onCompositionStart,
      onCompositionEnd
    } = this

    const pickerClass = {
      'c-date-picker': true,
      [`c-date-picker--${size}`]: true,
      'c-date-picker--open': isOpened,
      'c-date-picker--disabled': disabled,
      'c-date-picker-range': isRange
    }

    const popupClass = {
      'c-date-picker-popup': true,
      'c-date-picker-popup-range': type.includes('range'),
      [`c-date-picker-popup--${size}`]: true
    }

    const attrs = {
      ref: 'input',
      tabindex: '-1',
      type: 'text',
      class: `c-date-picker__input c-input c-input--${size}`,
      disabled,
      readonly
    }

    const events = {
      compositionstart: onCompositionStart,
      compositionend: onCompositionEnd
    }

    const inputEle = isRange ? (
      [
        <input
          {...{ attrs }}
          placeholder={startPlaceholder}
          value={customInputValue && customInputValue[0]}
          oninput={e => {
            this.customChange(e, 0)
          }}
          {...{ on: events }}
        />,
        <span class="c-date-picker-range__separator">-</span>,
        <input
          {...{ attrs }}
          placeholder={endPlaceholder}
          value={customInputValue && customInputValue[1]}
          oninput={e => {
            this.customChange(e, 1)
          }}
          {...{ on: events }}
        />
      ]
    ) : (
      <input
        {...{ attrs }}
        placeholder={placeholder}
        value={customInputValue}
        oninput={e => customChange(e)}
        {...{ on: events }}
      />
    )

    let panelEle = <CDatePanel />
    if (isRange) {
      panelEle = <CDateRangePanel />
    } else if (isWeek) {
      panelEle = <CWeekPanel />
    } else if (isQuarter) {
      panelEle = <CQuarterPanel />
    }

    return (
      <Popover
        trigger="none"
        visible={isOpened}
        showTriangle={false}
        id={id}
        customClass={popupClass}
        placement="bottom-left"
        scopedSlots={{
          content: () => (
            <transition name="c-date-picker-panel" appear>
              <div
                ref="panel"
                tabindex={disabled ? -1 : 0}
                onkeydown={onPanelKeydown}
              >
                {panelEle}
              </div>
            </transition>
          )
        }}
      >
        <div
          aria-haspopup="true"
          aria-expanded={isOpened}
          aria-owns={id}
          tabindex={disabled ? -1 : 0}
          class={pickerClass}
          ref="datepicker"
          onkeydown={onKeydown}
          onmouseenter={() => {
            this.isHovering = true
          }}
          onmouseleave={() => {
            this.isHovering = false
          }}
          onclick={open}
          onfocus={focus}
        >
          {inputEle}
          {shouldShowClearIcon ? (
            <IconClear onclick={clear} class="c-icon--clear" />
          ) : (
            <IconCalendar />
          )}
        </div>
      </Popover>
    )
  }
}
