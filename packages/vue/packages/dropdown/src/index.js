import { props as popoverProps } from 'packages/popover/src/props'
import Popover from 'packages/popover'
import { IconArrowDown } from 'packages/icon'
import { assign } from 'src/utils'

import { isNil, AutoIncreasingCounter } from '@clair/helpers'
const idGen = /*@__PURE__*/ new AutoIncreasingCounter()

const keyCodeMap = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  enter: 'Enter',
  tab: 'Tab',
  esc: 'Escape'
}

const dropDownOwnProps = {
  hideOnClick: {
    type: Boolean,
    default: true
  },

  tabindex: {
    type: Number,
    default: 0
  },

  showDelay: {
    type: Number,
    default: 100
  }
}
const props = /*@__PURE__*/ assign(
  popoverProps,
  {
    placement: /*@__PURE__*/ assign(popoverProps.placement, {
      default: 'bottom-left'
    }),
    trigger: /*@__PURE__*/ assign(popoverProps.trigger, {
      default: 'hover'
    })
  },
  dropDownOwnProps
)

export default {
  name: 'CDropdown',
  inheritAttrs: false,
  props,

  data() {
    return {
      dropdownElm: null,
      triggerElm: null,
      isVisible: false,
      selfCtrl: true,
      menuItems: [],
      currentIndex: 0,
      itemIdPrefix: 'c-dropdown__item',
      menuId: `c-dropdown__menu-${idGen.next()}`
    }
  },

  provide() {
    return { $dropdown: this }
  },

  computed: {
    canBeFocusItems() {
      return this.menuItems.filter(item => {
        return !item.disabled
      })
    },
    triggerAttributes() {
      return [['tabindex', this.tabindex]]
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler(visible) {
        this.selfCtrl = isNil(visible)
        this.isVisible = Boolean(visible)
      }
    },

    isVisible: {
      handler(visible) {
        if (!visible) {
          this.currentIndex = 0
        }
      }
    }
  },

  mounted() {
    this.initDomOperation()
  },
  beforeDestroy() {
    this.unBindListeners()
  },
  methods: {
    onVisibilityChange({ detail: { visible } }) {
      this.updateVisibility(visible)
    },
    updateVisibility(visible) {
      if (this.selfCtrl) {
        this.isVisible = visible
      } else {
        this.$emit('update:visible', visible)
      }

      const parameters = {
        detail: { visible }
      }
      this.$emit('visibility-change', parameters)
    },

    getFocusItem(idx, direction) {
      const max = this.canBeFocusItems.length - 1
      let index = idx
      switch (direction) {
        case 'down':
          index++
          break
        case 'up':
          index--
          break
        default:
      }
      if (index > max) {
        index = max
      } else if (index < 0) {
        index = 0
      }

      const nextItem = this.canBeFocusItems[index]
      this.currentIndex =
        this.menuItems.findIndex(item => item === nextItem) + 1
      return nextItem
    },

    handleItemEvent(e) {
      const { menuItems, handleItemClick } = this
      const itemIndex = menuItems.findIndex(
        item => item.$el === e.currentTarget
      )
      const item = menuItems[itemIndex]
      const itemKey = item ? item.itemKey : null
      const baseParameters = {
        detail: { itemKey }
      }
      const eventParameters = e ? { nativeEvent: e } : {}
      const parameters = { ...baseParameters, ...eventParameters }
      handleItemClick(parameters)
    },

    handleKeyDown(ev) {
      const { code } = ev
      const { up, down, enter, tab, esc } = keyCodeMap
      const activeIndex = this.canBeFocusItems.findIndex(
        item => item.$el === document.activeElement
      )
      const isMenuItem = this.menuItems.some(item => item.$el === ev.target)

      if ([up, down].includes(code)) {
        ev.preventDefault()
        let nextItem = null
        // up/down
        if (code === up) {
          // up
          nextItem = this.getFocusItem(activeIndex, 'up')
        } else {
          // down
          nextItem = this.getFocusItem(activeIndex, 'down')
        }
        nextItem.$el.focus()
      } else if (code === enter) {
        //enter选中
        isMenuItem ? this.handleItemEvent(ev) : this.handleClick()
      } else if ([tab, esc].includes(code)) {
        // tab || esc
        this.updateVisibility(false)
      }
    },

    handleItemClick(val) {
      this.$emit('item-click', val)
      if (this.hideOnClick) {
        this.updateVisibility(false)
      }
    },

    handleClick() {
      this.updateVisibility(!this.isVisible)
    },

    bindListeners() {
      this.triggerElm.addEventListener('keydown', this.handleKeyDown, true)
    },

    unBindListeners() {
      this.triggerElm.removeEventListener('keydown', this.handleKeyDown, true)
    },

    initDomOperation() {
      this.triggerElm = this.$refs.trigger
      this.triggerAttributes.forEach(([name, value]) => {
        this.triggerElm.setAttribute(name, value)
      })
      this.bindListeners()
    }
  },

  render() {
    const triggerElm = this.$scopedSlots.default?.() || (
      <span class="c-dropdown-link">
        下拉菜单<IconArrowDown class="c-dropdown-link-icon"> </IconArrowDown>
      </span>
    )
    return (
      <Popover
        ref="popover"
        scopedSlots={{
          default: () => (
            <div class="c-dropdown" ref="trigger">
              {triggerElm}
            </div>
          ),
          content: this.$scopedSlots.menu
        }}
        custom-class="c-dropdown-menu"
        role="listbox"
        id={this.menuId}
        trigger={this.trigger}
        visible={this.isVisible}
        on-visibility-change={this.onVisibilityChange}
        placement={this.placement}
        append-target={this.appendTarget}
        attrs={this.$attrs}
        aria-activedescendant={`${this.itemIdPrefix}-${this.currentIndex}`}
        show-triangle={false}
        transition={this.transition}
      ></Popover>
    )
  }
}
