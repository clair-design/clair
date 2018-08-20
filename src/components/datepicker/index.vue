<template lang="pug">
.c-datepicker(
  @click="open"
)
  .c-datepicker__icon.c-datepicker__hovericon(
    v-if="date != '' || daterange != ''"
    @click="resetDate"
    :class="className"
  )
    c-icon(name="x-circle")
  .c-datepicker__icon(:clas="className")
    c-icon(name="calendar")
  c-input(
    v-if="type == 'daterange' || type == 'monthrange'"
    v-model="daterange"
    :placeholder="placeholder"
    :disabled="disabled"
    width="normal"
    :size="size"
    @change="dateChange"
    @focusin.native="open"
    @focusout.native="onBlur"
  )
  c-input(
    v-else-if="type == 'date' || type == 'month'"
    v-model="date"
    :size="size"
    width="normal"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="dateChange"
    @focusin.native="open"
    @focusout.native="onBlur"
    @keydown.native="onKeyDown"
  )

  .c-datepicker__panel
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
        @change="setDateRange"
      )
</template>

<script>
import './index.css'
import validatable from '../../scripts/mixins/validatable'
import resettable from '../../scripts/mixins/resettable'

export default {
  name: 'c-datepicker',
  model: {
    event: 'change'
  },
  mixins: [resettable, validatable],
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
    maxDate: String
  },

  computed: {
    className () {
      return this.size ? `is-size-${this.size}` : ''
    },
    daterange () {
      if (this.type.indexOf('range') === -1) return []
      const [start, end] = this.date
      return !start && !end ? '' : `${start} 至 ${end}`
    },
    datePattern () {
      return this.pattern ? this.pattern : this.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'
    }
  },

  data () {
    return {
      date: '',
      datepickerPanel: '',
      isOpen: false,
      mousedownInPanel: false
    }
  },

  beforeDestroy () {
    this.datepickerPanel.remove()
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
      }
    }
  },

  created () {
    this.date = this.value
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
      this.$emit('change', '')
    },
    dateChange (value) {
      this.$emit('change', value)
    },
    onBodyClick (e) {
      const isInPicker = this.$el.contains(e.target)
      const isInPanel = this.datepickerPanel.contains(e.target)
      if (!isInPicker && !isInPanel) {
        this.close()
        this.$el.focus()
      }
    },
    setDateRange (daterange) {
      this.date = daterange
      this.$emit('change', this.date)
      this.close()
    },
    setDate (date, notClose) {
      this.date = date
      this.$emit('change', date)
      !notClose && this.close()
    },
    getStyle () {
      const clientRect = this.$el.getBoundingClientRect()
      const windowH = window.innerHeight
      const marginTop = 2
      const scrollHeight = document.body.scrollWidth > window.innerWidth ? 20 : 0
      const droplistHeight = this.datepickerPanel.clientHeight
      const defaultTop = clientRect.top + clientRect.height + marginTop + window.pageYOffset
      const clientHeight = clientRect.height + marginTop

      const clientY = clientRect.y
      const compTop = windowH - droplistHeight - scrollHeight
      const left = clientRect.left + window.pageXOffset
      const top = droplistHeight + clientHeight + clientY + scrollHeight > windowH ? compTop : defaultTop
      return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: 9;
      `
    },
    resize () {
      this.$nextTick(() => {
        this.datepickerPanel.style.cssText = this.getStyle()
      })
    }
  }
}
</script>
