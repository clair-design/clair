import { IconClear } from 'packages/icon'
import InputTextArea from './input-textarea'
import InputGroup from './input-group'
import { inputProps, firstUpperCase, model } from './util'

export default {
  name: 'CInput',

  props: inputProps,

  inject: {
    $formItem: { default: null }
  },

  model,

  computed: {
    clearableVisible() {
      return Boolean(this.clearable && this.value)
    },

    classNames() {
      return [
        'c-input',
        this.type && `c-input--${this.type}`,
        `c-input--${this.size}`,
        this.block ? 'c-input--block' : null
      ]
    },

    isAffixMode() {
      return (
        this.prefixIcon ||
        this.suffixIcon ||
        this.$scopedSlots['prefix-icon'] ||
        this.$scopedSlots['suffix-icon']
      )
    },

    isGroupMode() {
      return this.$scopedSlots.prefix || this.$scopedSlots.suffix
    },

    clearableVNodes() {
      if (!this.clearableVisible) {
        return ''
      }

      return (
        <span class="c-input-suffix">
          <IconClear onClick={this.clearableHandler} />
        </span>
      )
    },

    affixContainerVNodes() {
      const affixClassName = [
        'c-input-affix-container',
        `c-input-affix-container--${this.size}`,
        this.disabled && 'c-input-affix-container--disabled'
      ]

      const newProps = Object.assign({}, this.$props, {
        clearable: false,
        prefixIcon: null,
        suffixIcon: null,
        id: null
      })

      const attrs = this.disabled
        ? { id: this.id }
        : {
            id: this.id,
            tabindex: '-1'
          }

      return (
        <div class={affixClassName} {...{ attrs }}>
          {this.getPrefixOrSuffixIcon('prefix')}
          <CInput {...{ props: newProps, on: this.$listeners }} />
          {this.clearableVisible
            ? this.clearableVNodes
            : this.getPrefixOrSuffixIcon('suffix')}
        </div>
      )
    },

    // in case there is no props.value
    // cache the native `<input />`.value for each re-render
    baseVNode() {
      return (
        <input
          name={this.name}
          id={this.id}
          disabled={this.disabled}
          type={this.htmlType}
          value={this.value}
          placeholder={this.placeholder}
          class={this.classNames}
          on={this.$ownListeners}
          attrs={this.mergedInputAttrs}
          ref="input"
        />
      )
    },
    textareaProps() {
      return {
        ...this.$props,
        // override with already computed(normalized) values
        inputAttrs: this.mergedInputAttrs
      }
    },
    textarea() {
      return (
        <transition>
          <InputTextArea
            {...{
              props: this.textareaProps,
              on: this.$listeners
            }}
          />
        </transition>
      )
    },

    $ownListeners() {
      return {
        ...this.$listeners,
        input: this.inputHandler,
        keydown: this.keyDownHandler,
        blur: this.blurOrChangeHandler,
        change: this.blurOrChangeHandler
      }
    },
    mergedInputAttrs() {
      const attrNames = ['autocomplete', 'autofocus', 'readonly', 'disabled']
      const mergedAttrs = attrNames
        .map(attrName => this.mergeInputAttrsFromProps(attrName))
        .reduce((acc, attr) => Object.assign(acc, attr), {})
      return {
        ...this.inputAttrs,
        ...mergedAttrs
      }
    }
  },

  methods: {
    syncValue(value) {
      this.$emit(model.event, value)
    },
    emitCustomEvent(eventName, nativeEvent) {
      this.$emit(eventName, {
        target: {
          value: nativeEvent?.target?.value
        },
        nativeEvent
      })
    },
    inputHandler(e) {
      this.syncValue(e.target.value)
      this.$emit(e.type, e)
      this.$formItem?.handleFormItemChange(e)
    },

    keyDownHandler(e) {
      if (e.key === 'Enter') {
        this.emitCustomEvent('press-enter', e)
      }
      this.$emit(e.type, e)
    },
    blurOrChangeHandler(e) {
      const { type } = e
      this.emitCustomEvent(type, e)
      const name = firstUpperCase(type)
      this.$formItem?.[`handleFormItem${name}`](e)
    },
    clearableHandler() {
      this.$emit(model.event, '')
      this.$emit('change', {
        target: {
          value: ''
        }
      })
      this.$emit('clear')
      this.$children?.[0].$refs?.input?.focus()
    },
    getPrefixOrSuffixIcon(type) {
      if (type && this[`${type}Icon`]) {
        return <span class={`c-input-${type}`}>{this[`${type}Icon`]}</span>
      }

      // handle slot
      const $type = this.$scopedSlots?.[`${type}-icon`]?.()

      if ($type) {
        return <span class={`c-input-${type}`}>{$type}</span>
      }
      return ''
    },
    mergeInputAttrsFromProps(attrName) {
      const value = this[attrName] ?? this.inputAttrs[attrName]
      return { [attrName]: value }
    }
  },

  render() {
    // textarea
    if (this.htmlType === 'textarea') {
      return this.textarea
    }

    // 组合模式
    if (this.isGroupMode) {
      return (
        <InputGroup
          size={this.size}
          disabled={this.disabled}
          id={this.id}
          scopedSlots={this.$scopedSlots}
        >
          <CInput
            {...{
              props: { ...this.$props, id: null },
              on: this.$listeners,
              scopedSlots: {
                ['prefix-icon']: this.$scopedSlots['prefix-icon'],
                ['suffix-icon']: this.$scopedSlots['suffix-icon']
              }
            }}
          ></CInput>
        </InputGroup>
      )
    }

    // 图标
    if (this.isAffixMode || (!this.disabled && this.clearable)) {
      return <transition>{this.affixContainerVNodes}</transition>
    }

    return this.baseVNode
  }
}
