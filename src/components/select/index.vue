<template lang="pug">
.c-select(
  role="combobox"
  aria-autocomplete="list"
  aria-haspopup="true"
  :aria-expanded="isOpen"
  aria-disabled="disabled"
  :tabindex="disabled ? -1 : 0"
  :class="classNames"
  @keydown="onKeyDown"
)
  .c-select__inner(
    @click="toggleOpen"
  )
    input.c-select__input(
      tabindex="-1"
      type="text"
      :class="{ 'can-input': canInput }"
      :placeholder="placeholder"
      :value="selectedLabels"
    )
    i.c-select__caret
  .c-select__selection(
    v-if="multiple"
    @click="toggleOpen"
  )
    slot(name="selection")
      .c-chip(
        v-if="multiple && selectedOptions.length"
        v-for="option in selectedOptions"
        :class="{ 'is-disabled': option.disabled }"
      )
        span {{ option.label }}
        .c-chip__close(@click.stop="unselectOption(option)")
  transition(name="fade-in-down")
    .c-select__menu(
      role="menu"
      aria-activedescendant
      v-show="isOpen"
      :style="menuStyle"
    )
      slot
        c-option(
          ref="$options"
          v-for="(option, index) in options"
          :label="option.label"
          :isActive="activeIndex == index"
          :isSelected="selectedIndex.indexOf(index) > -1"
          :disabled="option.disabled"
        )
</template>

<script>
import './index.css'
import { getPosition } from './position.js'

export default {

  name: 'c-select',

  props: {
    value: [Number, String, Object, Array],
    options: Array,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: '请选择...'
    },
    multiple: Boolean,
    combobox: Boolean,
    searchable: Boolean,
    size: String,
    width: String
  },

  model: {
    event: 'change'
  },

  provide () {
    return { $select: this }
  },

  data () {
    return {
      isOpen: false,
      menuStyle: {
        top: 'auto',
        left: 'auto',
        minWidth: 0
      },
      activeIndex: -1,
      selectedIndex: [],
      selectionEl: null,
      menuEl: null
    }
  },

  computed: {
    canInput () {
      return this.combobox || this.searchable
    },
    classNames () {
      const classNames = [
        {
          'is-open': this.isOpen,
          'is-disabled': this.disabled
        }
      ]
      if (this.size) classNames.push(`is-${this.size}`)
      if (this.width) classNames.push(`is-${this.width}`)
      return classNames
    },
    selectedOptions () {
      return this.selectedIndex.map(index => this.options[index])
    },
    selectedLabels () {
      return this.selectedOptions
        .map(option => option.label)
        .join(', ')
    },
    selectedValues () {
      return this.selectedOptions.map(option => option.value)
    }
  },

  watch: {
    isOpen () {
      if (this.isOpen) {
        const { top, left } = getPosition(this.menuEl, this.$el)
        this.menuStyle.top = `${top}px`
        this.menuStyle.left = `${left}px`
        this.menuStyle.minWidth = `${this.$el.offsetWidth}px`
        window.addEventListener('click', this.onBodyClick, true)
      } else {
        window.removeEventListener('click', this.onBodyClick, true)
      }
    },

    value: {
      immediate: true,
      handler: function (value) {
        if (this.multiple) {
          if (!Array.isArray(value) || value.length === 0) {
            this.selectedIndex = []
            return
          }
          this.selectedIndex = value.map(v => this.getIndex(v))
        } else {
          const index = this.getIndex(value)
          if (index > -1) this.$set(this.selectedIndex, 0, index)
        }
      }
    },

    selectedIndex: {
      immediate: true,
      handler: function () {
        if (!this.multiple || this.$isServer) return
        this.$nextTick(function () {
          const h = this.$el.querySelector('.c-select__selection').offsetHeight
          const minHeight = 12
          this.$el.style.height = h > minHeight ? `${h}px` : 'auto'
        })
      }
    }
  },

  mounted () {
    // render menu in body
    if (typeof document === 'object') {
      this.menuEl = this.$el.querySelector('.c-select__menu')
      this.selectionEl = this.$el.querySelector('.c-select__selection')
      document.body.appendChild(this.menuEl)
    }

    // hover the option
    this.$on('option-activated', option => {
      this.activeIndex = this.$refs.$options.indexOf(option)
    })

    // select the option
    this.$on('option-clicked', this.onOptionClick)
  },

  destroyed () {
    this.menuEl && document.body.removeChild(this.menuEl)
  },

  methods: {
    toggleOpen () {
      this.isOpen = !this.isOpen
    },

    getIndex (value) {
      return this.options.findIndex(option => option.value === value)
    },

    open () {
      this.isOpen = true
      const [ selected ] = this.selectedIndex
      this.activeIndex = selected > -1 ? selected : 0
    },

    close () {
      this.isOpen = false
    },

    getNextIndex (current) {
      const next = this.options.findIndex((option, index) => {
        return index > current && !option.disabled
      })
      return next > 0 ? next : current
    },

    getPreviousIndex (current) {
      let prev = -1
      for (let i = current - 1; i < this.options.length && i >= 0; i--) {
        if (!this.options[i].disabled) {
          prev = i
          break
        }
      }
      return prev > -1 ? prev : current
    },

    activateNext () {
      const next = this.getNextIndex(this.activeIndex)
      this.activeIndex = next
    },

    activatePrevious () {
      const prev = this.getPreviousIndex(this.activeIndex)
      this.activeIndex = prev
    },

    selectPrevious () {
      const prev = this.getPreviousIndex(this.selectedIndex[0])
      this.selectIndex(prev)
    },

    selectNext () {
      const next = this.getNextIndex(this.selectedIndex[0])
      this.selectIndex(next)
    },

    selectIndex (index) {
      const option = this.$refs.$options[index]
      if (this.multiple) {
        if (option.isSelected) { // 已经选中则取消
          const arrIndex = this.selectedIndex.indexOf(index)
          this.selectedIndex.splice(arrIndex, 1)
        } else {
          this.selectedIndex.push(index)
        }
      } else {
        this.$set(this.selectedIndex, 0, index)
        this.close()
      }
      this.emitChange()
    },

    unselectOption (option) {
      const index = this.options.indexOf(option)
      const arrIndex = this.selectedIndex.indexOf(index)
      this.selectedIndex.splice(arrIndex, 1)
      this.emitChange()
    },

    onBodyClick (e) {
      const isInSelect = this.$el.contains(e.target)
      const isInMenu = this.menuEl.contains(e.target)
      if (!isInSelect && !isInMenu) {
        this.close()
        this.$el.focus()
      }
    },

    onOptionClick (option) {
      const index = this.$refs.$options.indexOf(option)
      this.selectIndex(index)
    },

    onKeyDown (e) {
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
      const {
        isOpen,
        multiple,
        open,
        close,
        selectIndex,
        selectPrevious,
        selectNext,
        activeIndex,
        activateNext,
        activatePrevious
      } = this

      if (Object.values(keys).includes(keyCode)) e.preventDefault()

      // open menu on space, up, down key
      const openTrigger = [
        keys.SPACE,
        keys.ENTER,
        keys.UP,
        keys.DOWN
      ].includes(keyCode)
      if (openTrigger && !isOpen) return open()

      // close menu on escape
      if (keyCode === keys.ESC && isOpen) return close()

      // press enter to select
      if (keyCode === keys.ENTER && isOpen) return selectIndex(activeIndex)

      // use left, right to navigate on closed state of non-multiple select
      const canSelect = !isOpen && !multiple
      if (canSelect && keyCode === keys.LEFT) return selectPrevious()
      if (canSelect && keyCode === keys.RIGHT) return selectNext()

      // use up, down to navigate on open state
      if (isOpen && keyCode === keys.UP) return activatePrevious()
      if (isOpen && keyCode === keys.DOWN) return activateNext()
    },

    emitChange () {
      const value = this.multiple ? this.selectedValues : this.selectedValues[0]
      this.$emit('change', value)
    }
  }
}
</script>
