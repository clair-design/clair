export default {
  name: 'CDropdownItem',

  inject: {
    $dropdown: {
      default: null
    }
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    divided: {
      type: Boolean,
      default: false
    },

    itemKey: ''
  },

  computed: {
    index() {
      return this.$dropdown.menuItems.indexOf(this) + 1
    }
  },

  mounted() {
    this.$dropdown.menuItems.push(this)
  },

  methods: {
    handleClick(e) {
      this.$dropdown.handleItemEvent(e)
    }
  },

  render() {
    const { disabled, divided, handleClick, $dropdown, index } = this
    const { itemIdPrefix, currentIndex, handleKeyDown } = $dropdown
    return (
      <li
        id={`${itemIdPrefix}-${index}`}
        class={[
          'c-dropdown-menu__item',
          { 'is-disabled': disabled },
          { 'c-dropdown-menu__item--divided': divided }
        ]}
        ref="menuItem"
        role="option"
        aria-selected={index === currentIndex}
        on-click={handleClick}
        on-keydown={handleKeyDown}
        tabindex={disabled ? null : -1}
      >
        {this.$scopedSlots.default?.()}
      </li>
    )
  }
}
