<template lang="pug">
.c-datepicker(
  @click="open"
)
  .c-datepicker__icon.c-datepicker__hovericon(
    v-if="!disabled && (date != '' || daterange != '')"
    @click="resetDate"
    :class="className"
  )
    c-icon(name="x-circle")
  .c-datepicker__icon(:class="className")
    c-icon(name="calendar")
  c-input(
    v-if="type == 'daterange' || type == 'monthrange'"
    :value="daterange"
    :placeholder="placeholder"
    :disabled="disabled"
    width="normal"
    :size="size"
    readonly
    @focusin.native="open"
    @focusout.native="onBlur"
  )
  c-input(
    v-else-if="type == 'date' || type == 'month'"
    v-model="showDate"
    :size="size"
    width="normal"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="dateChange"
    @focusin.native="open"
    @focusout.native="onBlur"
    @keydown.native="onKeyDown"
  )

  .c-datepicker__panel(
    ref="datepickerPanel"
    :class="{'withSidebar': (optionList.length > 0 || hasSidebarSlot) && isOpen == true, 'withBorder': isOpen == true }")
    .c-datepicker__sidebar(v-if="(hasSidebarSlot || optionList.length > 0 )&& isOpen")
      slot(name="dateSideBar"
        :datepicker="datepicker")
        ul
          template(v-for="option in optionList")
            li.optionbtn(@click="optionClick(option)")
              a {{option.text}}
    c-calendar(
      ref="calendar"
      v-if="type == 'date' || type == 'month'"
      :type="type"
      :pattern="datePattern"
      :value="date"
      :show="isOpen"
      :size="size"
      :minDate="minDate"
      :maxDate="maxDate"
      @update="setDate"
    )
    .c-datepicker__body(
      v-if="type == 'daterange'"
    )
      c-daterange(
        :value="date"
        :size="size"
        :show="isOpen"
        :minDate="minDate"
        :maxDate="maxDate"
        :pattern="datePattern"
        @change="setDateRange"
      )
    .c-datepicker__body(
      v-if="type == 'monthrange'"
    )
      c-daterange(
        :value="date"
        :size="size"
        :show="isOpen"
        type="month"
        :minDate="minDate"
        :maxDate="maxDate"
        :pattern="datePattern"
        @change="setDateRange"
      )
</template>

<script>
import './index.css'
import validatable from '@scripts/mixins/validatable'
import resettable from '@scripts/mixins/resettable'
import { getPopupStyle } from '@util'

import Icon from '../icon/index.vue'
import Input from '../input/index.vue'
import Calendar from '../calendar/index.vue'

export default {
  name: 'c-datepicker',
  model: {
    event: 'change'
  },
  mixins: [resettable, validatable],
  components: {
    'c-icon': Icon,
    'c-input': Input,
    'c-calendar': Calendar
  },
  props: {
    value: {
      type: [String, Array],
      default () {
        return ''
      }
    },
    pattern: {
      type: String
    },
    size: String,
    disabled: Boolean,
    type: {
      /* date, daterange, month */
      type: String,
      default: 'date'
    },
    placeholder: String,
    minDate: String,
    maxDate: String,
    extraOption: Object
  },

  computed: {
    hasSidebarSlot () {
      return this.$slots.dateSideBar || this.$scopedSlots.dateSideBar
    },
    datepicker () {
      return this
    },
    className () {
      return [
        this.size ? `is-size-${this.size}` : '',
        this.disabled ? 'disabled' : ''
      ]
    },
    daterange () {
      if (this.type.indexOf('range') === -1) return []
      const [start, end] = this.date
      return !start && !end ? '' : `${start} 至 ${end}`
    },
    datePattern () {
      return this.pattern ? this.pattern : this.type.indexOf('month') > -1 ? 'yyyy-MM' : 'yyyy-MM-dd'
    },
    optionList () {
      return this.extraOption ? this.extraOption.optionList : []
    }
  },

  data () {
    return {
      date: '',
      showDate: '',
      datepickerPanel: '',
      isOpen: false,
      mousedownInPanel: false
    }
  },

  beforeDestroy () {
    if (this.datepickerPanel.remove) {
      this.datepickerPanel.remove()
    } else {
      this.datepickerPanel.parentNode.removeChild(this.datepickerPanel)
    }
    window.removeEventListener('resize', this.resize, false)
  },

  watch: {
    isOpen () {
      if (this.isOpen) {
        this.resize()
        window.addEventListener('mousedown', this.onMouseDown, true)
        window.addEventListener('mouseup', this.onMouseUp, true)
      } else {
        window.removeEventListener('mousedown', this.onMouseDown, true)
        window.removeEventListener('mouseup', this.onMouseUp, true)
      }
    },
    value (newVal) {
      if (newVal !== this.date) {
        this.date = newVal
        this.showDate = newVal
      }
    }
  },

  created () {
    this.date = this.value
    this.showDate = this.value
  },

  mounted () {
    if (typeof document === 'object') {
      this.datepickerPanel = this.$el.querySelector('.c-datepicker__panel')
      document.body.appendChild(this.datepickerPanel)
      this.resize()
      window.addEventListener('resize', this.resize, false)
    }
  },
  methods: {
    optionClick (option) {
      option.onClick(this)
    },
    open (e) {
      const hoverIcon = this.$el.querySelector('.c-datepicker__hovericon')
      const isHoverIcon = hoverIcon && hoverIcon.contains(e.target)
      if (this.disabled || isHoverIcon) return
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    onBlur (e) {
      const focused = e.relatedTarget
      if (this.mousedownInPanel) return
      if (focused) this.close()
    },
    onMouseDown (e) {
      const isInPicker = this.$el.contains(e.target)
      const isInPanel = this.datepickerPanel.contains(e.target)
      this.mousedownInPanel = isInPanel || isInPicker
    },
    onMouseUp (e) {
      this.mousedownInPanel = false
      this.onBodyClick(e)
    },
    onKeyDown (e) {
      if (this.type === 'daterange') return
      const keys = {
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      }
      const { keyCode } = e
      if (keyCode === keys.ESC) this.close()
      const { calendar } = this.$refs
      const date = new Date(calendar.year, calendar.month, calendar.day).format(this.datePattern)
      if (keyCode === keys.ENTER && this.type === 'date') {
        this.setDate(date)
      }
      if (keyCode === keys.UP) {
        this.type === 'date' && this.$refs.calendar.updateDay(7, 'sub')
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(3, 'sub')
      } else if (keyCode === keys.DOWN) {
        this.type === 'date' && this.$refs.calendar.updateDay(7, 'plus')
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(3, 'plus')
      } else if (keyCode === keys.LEFT) {
        this.type === 'date' && this.$refs.calendar.updateDay(1, 'sub')
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(1, 'sub')
      } else if (keyCode === keys.RIGHT) {
        this.type === 'date' && this.$refs.calendar.updateDay(1, 'plus')
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(1, 'plus')
      }
    },
    resetDate (e) {
      e.preventDefault()
      this.date = ''
      this.showDate = ''
      this.$emit('change', '')
    },
    checkDateValid (value) {
      const separtor = this.datePattern.replace(/\w/g, '').slice(0, 1)
      const dates = value.split(separtor)
      const reg = new RegExp('^\\d{4}' + separtor + '\\d{2}' + separtor + '\\d{2}$')
      const valueValid = reg.test(value)
      if (valueValid) {
        const year = parseInt(dates[0])
        const month = parseInt(dates[1])
        const day = parseInt(dates[2])
        const yearValid = year > 1987
        const monthValid = month >= 0 && month < 12
        const maxDay = year % 4 === 0 && month === 2 ? 29 : 28
        const dayValid = day >= 0 && day < maxDay
        return yearValid && monthValid && dayValid
      } else {
        return false
      }
    },
    dateChange (value) {
      const dateValid = this.checkDateValid(value)
      if (dateValid) {
        this.date = value
      }
    },
    onBodyClick (e) {
      const isInPicker = this.$el.contains(e.target)
      const isInPanel = this.datepickerPanel.contains(e.target)
      if (!isInPicker && !isInPanel) {
        this.close()
        this.$el.focus()
        if ((this.type === 'date' || this.type === 'month') && this.checkDateValid(this.showDate)) {
          this.date = this.showDate
        } else if (this.type === 'date' || this.type === 'month') {
          this.showDate = this.date
        }
      }
    },
    setDateRange (daterange) {
      this.date = daterange
      this.$emit('change', this.date)
      this.close()
    },
    setDate (date, notClose) {
      this.showDate = date
      this.$emit('change', date)
      !notClose && this.close()
    },
    getStyle () {
      return getPopupStyle(this.$el, this.datepickerPanel)
    },
    resize () {
      this.$nextTick(() => {
        this.datepickerPanel.style.cssText = this.getStyle()
      })
    }
  }
}
</script>
