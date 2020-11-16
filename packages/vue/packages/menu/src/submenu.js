import { IconArrowDown } from 'packages/icon'
import { SUBMENU_OPEN_TIME } from './utils'

export default {
  name: 'CSubmenu',

  inject: {
    $menu: { default: null },
    $submenu: { default: null }
  },

  provide() {
    return {
      $submenu: this
    }
  },

  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      active: false,
      hovered: false,
      titlePaddingLeft: '',
      expanded: false,
      dropDownMaxHeight: '0px',
      isRightDropdown: false
    }
  },

  computed: {
    expandDropdownAndMenuArrow() {
      let expanded = false
      if (this.$menu.mode === 'horizontal') {
        expanded = this.hovered
      } else {
        expanded = this.$menu.collapsed ? this.hovered : this.expanded
      }

      return expanded
    },
    dropdownClasses() {
      return {
        'c-submenu__dropdown': true,
        'c-submenu__dropdown--right': this.isRightDropdown,
        'c-submenu__dropdown--open': this.expandDropdownAndMenuArrow
      }
    },
    titleClasses() {
      return {
        'c-submenu__title': true,
        'c-submenu__title--hovered': this.hovered,
        'c-submenu__title--active': this.active
      }
    },
    menuArrowClasses() {
      return {
        'c-menu-arrow': true,
        'c-menu-arrow--expanded': this.expandDropdownAndMenuArrow
      }
    },
    titleStyles() {
      return {
        paddingLeft: this.titlePaddingLeft || null
      }
    },
    dropDownStyles() {
      if (this.$menu.mode === 'horizontal' || this.$menu.collapsed) {
        return null
      }

      return {
        maxHeight: this.dropDownMaxHeight
      }
    }
  },

  mounted() {
    const { scrollHeight } = this.$refs.dropdown
    this.dropDownMaxHeight = this.expanded ? `${scrollHeight}px` : '0px'
  },

  methods: {
    handleHover() {
      if (this.disabled) return

      this.hovered = true

      if (this.$menu.mode === 'horizontal') {
        const isOverWidth =
          this.$refs.dropdown.getBoundingClientRect().right > window.innerWidth
        if (isOverWidth) {
          this.isRightDropdown = true
        }
      }
    },
    handleHoverLeave() {
      if (this.disabled) return

      this.hovered = false
    },
    handleTitleClick() {
      if (
        this.$menu.mode === 'horizontal' ||
        this.$menu.collapsed ||
        this.disabled
      ) {
        return
      }

      this.toggleSubmenu()
      this.$menu.updateExpandedSubmenu(this.name, this.expanded)
    },
    toggleSubmenu() {
      const dropDownExpanded = this.expanded
      this.expanded = !this.expanded
      const { scrollHeight } = this.$refs.dropdown
      this.dropDownMaxHeight = `${scrollHeight}px`

      /**
       * when expand,
       * set the `max-height` to 'none' when the animation is finished.
       * when close,
       * set the `max-height` to '0px' immediately.
       *
       * in case of clicking twice in a very short time (lt SUBMENU_OPEN_TIME),
       * the timer should be cleared before setting a new one
       */
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(
        () => {
          this.dropDownMaxHeight = dropDownExpanded ? '0px' : 'none'
        },
        dropDownExpanded ? 0 : SUBMENU_OPEN_TIME
      )
    },
    expandSubmenu() {
      if (this.expanded) return

      this.toggleSubmenu()
    },
    closeSubmenu() {
      if (!this.expanded) return

      this.toggleSubmenu()
    },
    updateActive(status) {
      this.active = status
      this.$submenu?.updateActive(status)
    },
    setTitlePaddingLeft(value) {
      this.titlePaddingLeft = value
    }
  },

  render() {
    return (
      <div
        class="c-submenu"
        role="menuitem"
        aria-haspopup="true"
        aria-disabled={this.disabled}
        aria-expanded={this.hovered}
        on-mouseenter={this.handleHover}
        on-mouseleave={this.handleHoverLeave}
      >
        <div
          style={this.titleStyles}
          class={this.titleClasses}
          tabindex={this.disabled ? -1 : 0}
          aria-disabled={this.disabled}
          on-click={this.handleTitleClick}
        >
          <div class="c-menu-item__inner">
            {this.$scopedSlots.title?.()}
            <IconArrowDown class={this.menuArrowClasses} />
          </div>
        </div>

        <div
          ref="dropdown"
          style={this.dropDownStyles}
          class={this.dropdownClasses}
          role="menu"
        >
          {this.$scopedSlots.default?.()}
        </div>
      </div>
    )
  }
}
