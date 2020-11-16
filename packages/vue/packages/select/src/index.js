import { throttle } from 'lodash-es'
import { isNil } from '@clair/helpers'
import CTag from 'packages/tag/src'
import { IconArrowDown, IconClear } from 'packages/icon'
import Popover from 'packages/popover'
import { AutoIncreasingCounter } from '@clair/helpers'

const counter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CSelect',

  inject: {
    $formItem: {
      default: null
    }
  },

  provide() {
    return {
      $select: this
    }
  },

  model: {
    event: 'update:value'
  },

  props: {
    value: {
      type: [String, Number, Object, Array],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['large', 'normal', 'small'].includes(value)
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '加载中'
    },
    noDataText: {
      type: String,
      default: '无数据'
    },
    noMatchText: {
      type: String,
      default: '无匹配数据'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function,
      default: (option, query) => {
        return option._label.toLowerCase().includes(query.toLowerCase())
      }
    },
    filterThrottle: {
      type: Number,
      default: 0
    },
    async: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    appendTarget: {
      validator(val) {
        if (typeof window === 'undefined') {
          return true
        }
        return val instanceof Element
      }
    }
  },

  data() {
    return {
      isOpen: false,
      menuEl: null,
      options: [],
      selectedOptions: [],
      activeOption: null,
      query: '',
      isHover: false,
      isComposing: false,
      menuId: `c-select-${counter.next()}`,
      triggerQuery: throttle(
        () => {
          this.$emit('query-change', this.query)
        },
        this.filterThrottle,
        {
          leading: true,
          trailing: true
        }
      ),
      queryChange: ({ target }) => {
        this.query = target.value
        if (this.async) this.triggerQuery()
      }
    }
  },

  computed: {
    shouldShowClearIcon() {
      const hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length
        : !isNil(this.value)
      return this.clearable && !this.disabled && this.isHover && hasValue
    },
    filteredOptions() {
      if (this.filtering && this.query) {
        return this.options.filter(option => {
          return this.filter(option, this.query)
        })
      }
      return this.options
    },
    filtering() {
      return (this.filterable || this.async) && this.isOpen
    },
    displayPlaceholder() {
      return this.filtering ? this.selectedOptions[0]?._label : this.placeholder
    },
    displayValue() {
      return this.filtering ? this.query : this.selectedOptions[0]?._label
    },
    hasSelectMultiple() {
      return this.multiple && this.selectedOptions.length > 0
    },
    hasOption() {
      return this.filteredOptions?.length
    },
    noOptionText() {
      return this.filtering && this.query ? this.noMatchText : this.noDataText
    }
  },

  watch: {
    isOpen() {
      if (this.isOpen) {
        // focus to selected option or last focused option or the first one
        this.activeOption =
          this.selectedOptions[0] ?? this.activeOption ?? this.options[0]
        this.styleMenu()
        this.query = ''
        window.addEventListener('click', this.bodyClickHandler, true)
      } else {
        window.removeEventListener('click', this.bodyClickHandler, true)
      }
      this.$emit('visibility-change', this.isOpen)
    },
    value() {
      this.formatSelectedOptions(true)
    },
    options() {
      if (this.options.length) {
        ;[this.activeOption] = this.options
        this.formatSelectedOptions()
      }
    },
    filteredOptions() {
      if (this.async) return
      const isOptionAllShown =
        this.filteredOptions.length === this.options.length

      this.activeOption = isOptionAllShown
        ? this.selectedOptions[0] || this.options[0]
        : this.filteredOptions[0]
    }
  },

  mounted() {
    if (this.multiple && !Array.isArray(this.value)) {
      throw new Error('Should bind an array value in multiple mode!')
    }
    this.$nextTick(() => {
      this.menuEl = this.$refs.menu
    })
  },

  methods: {
    formatSelectedOptions(isValueChanged = false) {
      const value = this.value ?? (this.multiple ? [] : null)
      if (isNil(value) || (this.multiple && !value.length)) {
        this.selectedOptions = []
        return
      }
      const lastSelectedLabels = this.selectedOptions.map(op => op._label)
      this.selectedOptions = []

      if (this.multiple) {
        return value.forEach(v => {
          const option = this.options.find(op => op._value === v)
          if (option) {
            this.selectedOptions.push(option)
            // option changed & has selected
          } else if (!isValueChanged && lastSelectedLabels.length) {
            // backup value just for displayValue
            this.selectedOptions.push({
              _label: v,
              _value: v
            })
          }
        })
      }
      const option = this.options.find(op => op._value === value)
      if (option) {
        this.selectedOptions.push(option)
      } else if (!isValueChanged && lastSelectedLabels.length) {
        this.selectedOptions.push({
          _label: lastSelectedLabels[0] || value,
          _value: value
        })
      }
    },
    styleMenu() {
      if (!this.menuEl) return

      Object.assign(this.menuEl.style, {
        minWidth: `${this.$el.offsetWidth}px`
      })
      this.focusOnInput()
    },
    toggle({ target }) {
      const { tagName } = target
      if (this.disabled || (this.filtering && tagName === 'INPUT')) return

      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    },
    close() {
      this.isOpen = false
    },
    open() {
      this.isOpen = true
      if (this.filtering) {
        this.focusOnInput()
      }
    },
    focusOnInput() {
      this.$nextTick(() => {
        this.$el.querySelector('input')?.focus()
      })
    },
    focus(e) {
      this.$emit('focus', e)
    },
    blur(e) {
      this.$emit('blur', e)
      this.$formItem?.handleFormItemBlur?.()
    },
    setSelectedOption(option = {}) {
      if (this.multiple) {
        if (option.selected) {
          this.unSelectOption(option)
        } else {
          const values = this.selectedOptions.map(op => op._value)
          values.push(option._value)
          this.emitChange(values)
        }
      } else {
        this.emitChange(option._value)
        this.close()
      }
    },
    addOption(option) {
      this.options.push(option)
    },
    addSelectedOption(option) {
      this.selectedOptions.push(option)
    },
    setActiveOption(option) {
      if (!option) return
      this.activeOption = option
    },
    unSelectOption(option) {
      if (this.disabled || option.disabled) return

      const index = this.findOptionIndex(this.selectedOptions, option)
      if (index < 0) return
      const values = this.selectedOptions.map(op => op._value)
      values.splice(index, 1)
      this.emitChange(values)
    },
    removeTag(option) {
      this.unSelectOption(option)
      this.query = ''
      this.$emit('remove-tag', option)
    },
    emitChange(value) {
      if (Object.is(value, this.value)) return

      const event = {
        target: {
          value
        },
        nativeEvent: window.event
      }
      this.$emit('update:value', value)
      this.$emit('change', event)
      if (this.multiple) {
        this.$nextTick(this.styleMenu)
      }
      this.$formItem?.handleFormItemChange?.()
    },
    removeOption(option) {
      const index = this.findOptionIndex(this.options, option)
      if (index > -1) {
        this.options.splice(index, 1)
      }
    },
    clear(e) {
      e.stopPropagation()
      this.$emit('clear', e)
      this.selectedOptions = []
      this.emitChange(this.multiple ? [] : null)
      this.query = ''
    },
    bodyClickHandler(event) {
      const isInSelect = this.$el.contains(event.target)
      const isInMenu = this.menuEl.contains(event.target)
      const isMultiFilterInput = event.target.classList.contains(
        'c-select__tags__input'
      )
      const isMultiFilterInputReadOnly =
        event.target.getAttribute('readonly') === 'readonly'
      if (isMultiFilterInput && this.filtering && !isMultiFilterInputReadOnly) {
        event.stopPropagation()
      }
      if (!isInSelect && !isInMenu) {
        this.close()
      }
    },
    activatePrev() {
      const currentIndex = this.findOptionIndex(
        this.filteredOptions,
        this.activeOption
      )
      const prevOptions = this.filteredOptions.slice(0, currentIndex)
      const option = prevOptions.reverse().find(op => !op.disabled)
      this.setActiveOption(option)
    },
    activateNext() {
      const currentIndex = this.findOptionIndex(
        this.filteredOptions,
        this.activeOption
      )
      const nextOptions = this.filteredOptions.slice(currentIndex + 1)
      const option = nextOptions.find(op => !op.disabled)
      this.setActiveOption(option)
    },
    findOptionIndex(options, option) {
      return options.findIndex(op => op === option)
    },
    onKeydown(e) {
      const keys = {
        TAB: 'Tab',
        ENTER: 'Enter',
        ESC: 'Escape',
        SPACE: 'Space',
        UP: 'ArrowUp',
        DOWN: 'ArrowDown'
      }
      const { code } = e
      const {
        isOpen,
        isComposing,
        open,
        close,
        filtering,
        setSelectedOption,
        activeOption,
        activateNext,
        activatePrev
      } = this

      if (code === keys.TAB) return close()

      if (e.target.tagName === 'INPUT' && code === keys.SPACE && filtering) {
        return
      }

      if (Object.values(keys).includes(code)) e.preventDefault()

      if (code === keys.ESC && isOpen) return close()

      const openTrigger = [keys.SPACE, keys.ENTER, keys.UP, keys.DOWN].includes(
        code
      )
      if (openTrigger && !isOpen) return open()

      if (
        (code === keys.ENTER || code === keys.SPACE) &&
        isOpen &&
        !isComposing
      ) {
        return setSelectedOption(activeOption)
      }

      if (isOpen && code === keys.UP) activatePrev()
      if (isOpen && code === keys.DOWN) activateNext()

      this.activeOption?.scrollIntoView?.()
    },
    onDeleteKey(e) {
      const delKeyCode = 'Backspace'
      if (!this.multiple || e.code !== delKeyCode || this.query) return
      const option = this.selectedOptions[this.selectedOptions.length - 1]
      this.unSelectOption(option)
    },
    onCompositionStart(e) {
      this.isComposing = true
    },
    onCompositionEnd(e) {
      this.isComposing = false
    },
    afterEnter() {
      if (!this.isOpen) return
      this.activeOption?.scrollIntoView?.()
    }
  },

  render(h) {
    const {
      size,
      disabled,
      clear,
      loading,
      loadingText,
      filterable,
      filtering,
      hasOption,
      noOptionText,
      queryChange,
      focus,
      blur,
      isOpen,
      selectedOptions,
      shouldShowClearIcon,
      removeTag,
      toggle,
      onKeydown,
      onDeleteKey,
      onCompositionStart,
      onCompositionEnd,
      $slots,
      displayPlaceholder,
      displayValue,
      hasSelectMultiple,
      menuId,
      appendTarget,
      afterEnter
    } = this

    const selectClass = {
      'c-select': true,
      [`c-select--${size}`]: true,
      'c-select--open': isOpen,
      'c-select--disabled': disabled,
      'c-select__multiple': hasSelectMultiple
    }

    const dropDownClass = {
      'c-select__dropdown': true,
      [`c-select__dropdown--${size}`]: true,
      'c-select__dropdown--multiple': this.multiple
    }

    const menuEl = (
      <div class={dropDownClass} ref="menu">
        {!loading && !hasOption && (
          <div class="c-select__option--empty">{noOptionText}</div>
        )}
        {loading && <div class="c-select__option--empty">{loadingText}</div>}
        {!loading && $slots.default}
      </div>
    )

    const tags = hasSelectMultiple
      ? selectedOptions.map(op => {
          return (
            <CTag closable={!op.disabled} onclose={removeTag.bind(this, op)}>
              {op._label}
            </CTag>
          )
        })
      : null

    const inputAttrs = {
      ref: 'input',
      tabindex: -1,
      type: 'text',
      readonly: !filtering
    }
    const events = {
      input: queryChange,
      keydown: onDeleteKey,
      focus,
      blur,
      compositionstart: onCompositionStart,
      compositionend: onCompositionEnd
    }

    return (
      <Popover
        trigger="none"
        placement="bottom-left"
        visible={isOpen}
        showTriangle={false}
        appendTarget={appendTarget}
        id={menuId}
        role="listbox"
        scopedSlots={{
          content: () => menuEl
        }}
        on-after-enter={afterEnter}
        transition="c-popover-slide-down"
      >
        <div
          role="combobox"
          aria-controls={menuId}
          aria-autocomplete="list"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          aria-multiselectable={hasSelectMultiple}
          tabindex={disabled ? -1 : 0}
          class={selectClass}
          onclick={toggle}
          onkeydown={onKeydown}
          onmouseenter={() => {
            this.isHover = true
          }}
          onmouseleave={() => {
            this.isHover = false
          }}
        >
          {hasSelectMultiple ? (
            <div class="c-select__tags">
              {tags}
              {!disabled && filterable && (
                <input
                  class="c-select__tags__input"
                  value={filtering ? displayValue : ''}
                  {...{ attrs: inputAttrs, on: events }}
                />
              )}
            </div>
          ) : (
            <input
              class={`c-input c-input--${size}`}
              value={displayValue}
              disabled={disabled}
              placeholder={displayPlaceholder}
              {...{ attrs: inputAttrs, on: events }}
            />
          )}
          <span class="c-select__suffix">
            {shouldShowClearIcon ? (
              <IconClear onclick={clear} class="c-icon-clear" />
            ) : (
              <IconArrowDown class={{ 'c-icon-reverse': isOpen }} />
            )}
          </span>
        </div>
      </Popover>
    )
  }
}
