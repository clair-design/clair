import CInput from 'packages/input'
import CCascaderPanel from 'packages/cascader-panel'
import CPopover from 'packages/popover'
import { props as popoverProps } from 'packages/popover/src/props'
import { IconArrowDown, IconClear } from 'packages/icon'
import { pick } from 'lodash-es'
import { assign } from 'src/utils'

const propsFromPopover = /*@__PURE__*/ pick(popoverProps, [
  'customClass',
  'customStyle',
  'transition',
  'showDelay',
  'hideDelay',
  'appendTarget'
])
const propsFromCascaderPanel = /*@__PURE__*/ pick(CCascaderPanel.props, [
  'options',
  'filter',
  'changeOnSelect',
  'lazy',
  'lazyMethod',
  'dataMap'
])

const propsFromInput = /*@__PURE__*/ pick(CInput.props, [
  'size',
  'placeholder',
  'disabled',
  'clearable'
])
const props = /*@__PURE__*/ assign(
  propsFromPopover,
  propsFromCascaderPanel,
  propsFromInput,
  {
    value: { type: Array },
    separator: { type: String, default: '/' },
    filterable: Boolean,
    expandTrigger: {
      type: String,
      default: 'click',
      validator: value => ['hover', 'click'].includes(value)
    }
  }
)

const CodeMap = {
  enter: 'Enter',
  space: 'Space',
  down: 'ArrowDown'
}

export default {
  name: 'CCascader',
  props,
  data() {
    return {
      popoverVisible: false,
      hoverState: false,
      isComposing: false,
      inputValue: '',
      showText: ''
    }
  },

  computed: {
    cascaderTriggerType() {
      return this.disabled ? 'none' : 'click'
    }
  },

  mounted() {
    if (this.$refs.cPanel?.checkedNode) {
      this.showText = this.$refs.cPanel.checkedNode.labelPath.join(
        this.separator
      )
    }
  },

  methods: {
    handleVisibilityChange(event) {
      const { visible } = event.detail
      this.$emit('visibility-change', { target: { value: visible } })
      if (visible) {
        this.$nextTick(_ => {
          // #180 面板展开时，应重新刷新展开状态。
          this.$refs.cPanel?.autoExpand(true)
        })
      } else if (this.transition === 'none') this.inputValue = ''
    },
    handleArrowIconClick(e) {
      e.stopPropagation()
      if (!this.disabled) {
        this.updatePanelVisibility(!this.popoverVisible)
      }
    },
    handleClearIconClick(e) {
      e.stopPropagation()
      this.updatePanelVisibility(false)
      this.$emit('input', [])
    },
    handleCascaderChange(event) {
      const { valuePath, labelPath } = event.detail
      this.showText = labelPath.join(this.separator)
      this.$emit('change', { target: { value: { valuePath, labelPath } } })
      this.$emit('input', valuePath)
    },
    handleCascaderExpandChange(event) {
      const { valuePath, labelPath } = event.detail
      this.$emit('expand-change', {
        target: { value: { valuePath, labelPath } }
      })
    },
    handleCascaderClose() {
      this.updatePanelVisibility(false)
    },
    handleAfterLeave() {
      this.inputValue = ''
      this.$emit('after-leave')
    },
    handleAfterEnter() {
      this.$emit('after-enter')
    },
    handleInputFocus(e) {
      // todo: 等input组件修改event事件后，修改此处逻辑
      this.$emit('focus', { nativeEvent: e })
    },
    handleInputBlur(e) {
      // todo: 等input组件修改event事件后，修改此处逻辑
      this.$emit('blur', { nativeEvent: e })
    },
    handleInputKeydown(e) {
      // todo: 等input组件修改event事件后，修改此处逻辑
      if (this.disabled) return
      const { code } = e
      if (!this.popoverVisible) {
        if (
          code === CodeMap.down ||
          code === CodeMap.enter ||
          code === CodeMap.space
        ) {
          this.updatePanelVisibility(true)
        }
      } else {
        switch (code) {
          case CodeMap.enter:
            !this.isComposing && this.updatePanelVisibility(false)
            break
          case CodeMap.down:
            e.preventDefault()
            this.$refs.cPanel?.focusFirstNode()
            break
          default:
            break
        }
      }
    },
    handleUpdateVisible(visible) {
      this.popoverVisible = visible
    },
    handleMouseenter() {
      this.hoverState = true
    },
    handleMouseleave() {
      this.hoverState = false
    },
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionEnd() {
      this.isComposing = false
    },
    updatePanelVisibility(visible) {
      this.$refs.cPopover?.updateVisibility(visible)
    }
  },

  render() {
    const scopedSlots = {
      default: () => {
        // 用户鼠标悬停且开启clearable且有选中内容时且未禁用且未输入搜索词时，展示清空按钮，否则展示上下翻转按钮。
        const showClearIcon =
          this.hoverState &&
          this.clearable &&
          this.value.length &&
          !this.disabled &&
          !this.inputValue
        const slot = showClearIcon ? (
          <IconClear
            nativeOnClick={this.handleClearIconClick}
            class="c-cascader__suffix"
          />
        ) : (
          <IconArrowDown
            nativeOnClick={this.handleArrowIconClick}
            class={{
              'c-cascader__suffix': true,
              'c-cascader__suffix--reverse': this.popoverVisible
            }}
          />
        )

        /**
         * 1. 这里使用了slot，等Input组件实现改为scopedSlot后，再修改。
         * 2. readonly原生参数无效，导致filterable参数无效。Input组件修改后问题解决
         */
        return (
          <CInput
            v-model={this.inputValue}
            readonly={!this.filterable}
            placeholder={this.showText || this.placeholder}
            disabled={this.disabled}
            size={this.size}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onKeydown={this.handleInputKeydown}
            oncompositionstart={this.handleCompositionStart}
            oncompositionend={this.handleCompositionEnd}
            aria-expanded={String(this.popoverVisible)}
          >
            <template slot="suffix-icon">{slot}</template>
          </CInput>
        )
      },
      content: () => {
        if (this.disabled) return null
        const events = {
          on: {
            'expand-change': this.handleCascaderExpandChange,
            change: this.handleCascaderChange,
            close: this.handleCascaderClose
          }
        }
        return (
          <CCascaderPanel
            ref="cPanel"
            options={this.options}
            query={this.inputValue}
            value={this.value}
            {...events}
            filter={this.filter}
            changeOnSelect={this.changeOnSelect}
            lazy={this.lazy}
            lazyMethod={this.lazyMethod}
            trigger={this.expandTrigger}
            dataMap={this.dataMap}
            scopedSlots={this.$scopedSlots}
            class={this.customClass}
            style={this.customStyle}
            bordered={false}
          />
        )
      }
    }

    const events = {
      on: {
        'visibility-change': this.handleVisibilityChange,
        'after-leave': this.handleAfterLeave,
        'after-enter': this.handleAfterEnter,
        'update:visible': this.handleUpdateVisible
      },
      nativeOn: {
        mouseenter: this.handleMouseenter,
        mouseleave: this.handleMouseleave
      }
    }
    return (
      <div
        class={{
          'c-cascader': true,
          'c-cascader--filled': this.showText
        }}
      >
        <CPopover
          ref="cPopover"
          placement="bottom-left"
          trigger={this.cascaderTriggerType}
          {...events}
          scopedSlots={scopedSlots}
          click-toggle={!this.filterable}
          visible={this.popoverVisible}
          transition={this.transition}
          showDelay={this.showDelay}
          hideDelay={this.hideDelay}
          customClass="c-cascader__popover"
          showTriangle={false}
          appendTarget={this.appendTarget}
        />
      </div>
    )
  }
}
