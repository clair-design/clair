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
  @click="toggleOpen"
)
  i.c-select__caret
  .c-select__selection
    .c-select__placeholder(
      v-if="showPlaceholder"
    ) {{ placeholder }}
    .c-select__value(
      v-if="!multiple && selectedOptions.length"
    ) {{ selectedOptions[0].label }}
    .c-chip(
      v-if="multiple"
      v-for="option in selectedOptions"
      :class="{ 'is-disabled': option.disabled }"
    )
      slot(name="selection" :option="option")
        span {{ option.label }}
      .c-chip__close(@click.stop="unselectOption(option)")
    .c-select__input(
      v-show="showInput"
      :class="multiple ? 'is-multiple' : 'is-single'"
    )
      input(
        v-model="query"
        autocomplete="off"
        @click.stop
        @blur="$el.focus()"
        @keydown.delete="onDeleteKey"
        @input="onSearchInput"
      )
  transition(name="fade-in-down")
    .c-select__menu(
      role="menu"
      aria-activedescendant
      v-show="isOpen"
      :style="menuStyle"
      :class="size ? 'is-'+size : ''"
    )
      slot(
        name="no-match"
        v-if="autocomplete && !filteredOptions.length"
      )
        .c-select__empty 无匹配选项
      c-option(
        ref="$options"
        v-for="(option, index) in filteredOptions"
        :label="option.label"
        :isActive="activeOption == option"
        :isSelected="selectedOptions.indexOf(option) > -1"
        :disabled="option.disabled"
        :option="option"
      )
        slot(
          name="menu-item"
          :label="option.label"
          :isActive="activeOption == option"
          :isSelected="selectedOptions.indexOf(option) > -1"
          :disabled="option.disabled"
          :index="index"
          :option="option"
        )
</template>

<script>
import './index.css'
import { getPosition, POSITION } from './position.js'

// ensure each option has label and value
const normalizeOptions = options => {
  return options.map(option => {
    if (typeof option === 'string') return { label: option, value: option }
    return option
  })
}

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
    autocomplete: Boolean,
    size: String,
    width: String,
    filter: {
      type: Function,
      default: (options, query) => {
        const q = query.trim().toLowerCase()
        if (!q) return options
        return options
          .filter(option => option.label.toLowerCase().indexOf(q) > -1)
      }
    }
  },

  model: {
    event: 'change'
  },

  provide () {
    return { $select: this }
  },

  inject: {
    $form: { default: null }
  },

  data () {
    return {
      isOpen: false,
      menuStyle: {
        top: 'auto',
        left: 'auto',
        minWidth: 0
      },
      activeOption: null,
      selectedOptions: [],
      filteredOptions: [],
      selectionEl: null,
      menuEl: null,
      query: '',
      promiseId: 0
    }
  },

  computed: {
    normalizedOptions () {
      return normalizeOptions(this.options)
    },
    canInput () {
      return this.combobox || this.autocomplete
    },
    showInput () {
      return this.canInput && this.isOpen
    },
    classNames () {
      const classNames = [
        {
          'is-open': this.isOpen,
          'is-disabled': this.disabled
        }
      ]
      const { size, width, $form } = this
      const actualSize = size || ($form && $form.size)
      const actualWidth = width || ($form && $form.width)
      if (actualSize) classNames.push(`is-${actualSize}`)
      if (actualWidth) classNames.push(`is-${actualWidth}`)
      return classNames
    },
    selectedValues () {
      return this.selectedOptions.map(option => option.value)
    },
    showPlaceholder () {
      const empty = !this.selectedOptions.length
      return empty && !this.isOpen
    }
  },

  watch: {
    isOpen () {
      if (this.isOpen) {
        this.menuStyle.minWidth = `${this.$el.offsetWidth}px`
        this.positionMenu()
        window.addEventListener('click', this.onBodyClick, true)
      } else {
        window.removeEventListener('click', this.onBodyClick, true)
      }
    },

    value: {
      immediate: true,
      handler: function (value) {
        const isEmpty = value === void 0 || value === null || value === ''
        if (isEmpty) return
        if (this.multiple) {
          const isArray = Array.isArray(value)
          const isEmptyArray = isArray && value.length === 0
          if (isEmptyArray) return
          const valueArr = isArray ? value : [value]
          this.selectedOptions = valueArr
            .map(v => this.getOption(v))
            .filter(option => option)
        } else {
          const option = this.getOption(value)
          if (option) {
            this.selectedOptions = [option]
          }
        }
      }
    },

    selectedOptions: function () {
      if (!this.multiple || this.$isServer) return
      this.$nextTick(function () {
        this.positionMenu()
      })
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
      this.activeOption = option
    })

    // select the option
    this.$on('option-clicked', option => this.selectOption(option))

    // watch options, query to filter options
    this.$watch(
      function () {
        return [this.normalizedOptions, this.query, this.isOpen]
      },
      function filterOptions () {
        const { autocomplete, query } = this
        if (!autocomplete) {
          this.filteredOptions = this.normalizedOptions
          return
        }
        const filtered = this.filter(this.normalizedOptions, query)
        if (typeof filtered.then === 'function') {
          const promiseId = Date.now()
          this.promiseId = promiseId
          filtered.then(options => {
            if (this.promiseId > promiseId) return
            this.filteredOptions = normalizeOptions(options)
          })
        } else {
          this.filteredOptions = normalizeOptions(filtered)
        }
      }
    )
  },

  beforeDestroy () {
    const { menuEl } = this

    if (!menuEl) {
      return
    }

    // DOM Level 4
    if (typeof menuEl.remove === 'function') {
      menuEl.remove()
    } else {
      menuEl.parentNode.removeChild(menuEl)
    }
  },

  methods: {
    toggleOpen () {
      if (this.disabled) return
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    },

    getOption (value) {
      const fn = option => option.value === value
      return this.filteredOptions.find(fn) ||
        this.normalizedOptions.find(fn) ||
        this.selectedOptions.find(fn)
    },

    open () {
      this.isOpen = true;
      [this.activeOption] = this.filteredOptions
      if (this.showInput) {
        this.query = ''
        this.$nextTick(_ => {
          this.$el.querySelector('input').focus()
        })
      }
    },

    close () {
      this.isOpen = false
    },

    getNextOption (current) {
      const currentIndex = this.filteredOptions.indexOf(current)
      const next = this.filteredOptions.find((option, index) => {
        return index > currentIndex && !option.disabled
      })
      return next || current
    },

    getPreviousOption (current) {
      let prev = null
      const currentIndex = this.filteredOptions.indexOf(current)
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!this.filteredOptions[i].disabled) {
          prev = this.filteredOptions[i]
          break
        }
      }
      return prev || current
    },

    activateNext () {
      const next = this.getNextOption(this.activeOption)
      this.activeOption = next
    },

    activatePrevious () {
      const prev = this.getPreviousOption(this.activeOption)
      this.activeOption = prev
    },

    selectPrevious () {
      const prev = this.getPreviousOption(this.selectedOptions[0])
      this.selectOption(prev)
    },

    selectNext () {
      const next = this.getNextOption(this.selectedOptions[0])
      this.selectOption(next)
    },

    selectOption (option) {
      if (this.multiple) {
        if (this.autocomplete) this.query = ''
        const isSelected = this.selectedOptions.includes(option)
        if (isSelected) return this.unselectOption(option)
        this.selectedOptions.push(option)
      } else {
        this.selectedOptions = [option]
        this.close()
      }
      this.emitChange()
    },

    unselectOption (option) {
      const index = this.selectedOptions.indexOf(option)
      this.selectedOptions.splice(index, 1)
      this.emitChange()
    },

    positionMenu () {
      const pos = this.canInput ? POSITION.BOTTOM : POSITION.TOP
      const { top, left } = getPosition(this.menuEl, this.$el, pos)
      this.menuEl.style.top = `${top}px`
      this.menuEl.style.left = `${left}px`
    },

    onBodyClick (e) {
      const isInSelect = this.$el.contains(e.target)
      const isInMenu = this.menuEl.contains(e.target)
      if (!isInSelect && !isInMenu) {
        this.close()
        this.$el.focus()
      }
    },

    onDeleteKey (e) {
      if (!this.query) this.selectedOptions.pop()
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
        selectOption,
        selectPrevious,
        selectNext,
        activeOption,
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
      if (keyCode === keys.ENTER && isOpen) return selectOption(activeOption)

      // use left, right to navigate on closed state of non-multiple select
      const canSelect = !isOpen && !multiple
      if (canSelect && keyCode === keys.LEFT) return selectPrevious()
      if (canSelect && keyCode === keys.RIGHT) return selectNext()

      // use up, down to navigate on open state
      if (isOpen && keyCode === keys.UP) return activatePrevious()
      if (isOpen && keyCode === keys.DOWN) return activateNext()
    },

    onSearchInput (e) {
      this.$emit('searchinput', e.target.value)
    },

    emitChange () {
      const value = this.multiple ? this.selectedValues : this.selectedValues[0]
      this.$emit('change', value)
    }
  }
}
</script>
