<template lang="pug">
.c-datepicker(
  @click="open"
)
  c-icon(name="calendar").c-datepicker__icon
  c-input(
    v-if="type == 'daterange'"
    v-model="daterange"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    @change="dateChange"
  )
  c-input(
    v-else-if="type == 'date'"
    v-model="date"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="dateChange"
  )

  .c-datepicker__panel
    c-calendar(
      v-if="type == 'date'"
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

</template>

<script>
import './index.css'

export default {
  name: 'c-datepicker',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: String | Array,
      default () {
        return ''
      }
    },
    size: String,
    disabled: Boolean,
    type: {
      /* date, daterange */
      type: String,
      default: 'date'
    },
    placeholder: String,
    minDate: String,
    maxDate: String
  },

  computed: {
    daterange () {
      if (this.type === 'date') return []
      const [start, end] = this.date
      return !start && !end ? '' : `${start} 至 ${end}`
    }
  },

  data () {
    return {
      date: '',
      datepickerPanel: '',
      isOpen: false
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
        window.addEventListener('click', this.onBodyClick, true)
      } else {
        window.removeEventListener('click', this.onBodyClick, true)
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
      this.datepickerPanel = document.querySelector('.c-datepicker__panel')
      document.body.appendChild(this.datepickerPanel)
      this.resize()
      window.addEventListener('resize', this.resize, false)
    }
  },
  methods: {
    open () {
      if (this.disabled) return
      this.isOpen = true
    },
    close () {
      this.isOpen = false
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
    setDate (date) {
      this.date = date
      this.$emit('change', date)
      this.close()
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
