import { findComponentsDownward } from './utils'
import Submenu from './submenu'
import MenuItem from './menu-item'
import {
  VERTICAL_MENU_PADDING_LEFT,
  HORIZONTAL_MENU_PADDING_LEFT
} from './utils'

export default {
  name: 'CMenu',

  provide() {
    return {
      $menu: this
    }
  },

  model: {
    prop: 'activeName',
    event: 'selectItem'
  },

  props: {
    mode: {
      type: String,
      default: 'vertical',
      validator: mode => ['vertical', 'horizontal'].includes(mode)
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    activeName: {
      type: [String, Number],
      default: ''
    },
    expandedNames: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'light',
      validator: type => ['light', 'dark'].includes(type)
    },
    width: {
      type: String,
      default: '100%'
    },
    useRouter: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      activeMenuName: this.activeName,
      activeMenuId: '',
      submenus: [],
      menuItems: []
    }
  },

  computed: {
    classes() {
      return {
        'c-menu': true,
        'c-menu--dark': this.theme === 'dark',
        'c-menu--collapsed': this.mode === 'vertical' && this.collapsed
      }
    },
    styles() {
      if (this.mode === 'horizontal' || this.collapsed) {
        return null
      }

      return {
        width: this.width
      }
    }
  },

  mounted() {
    this.submenus = findComponentsDownward({
      context: this,
      componentName: Submenu.name
    })
    this.menuItems = findComponentsDownward({
      context: this,
      componentName: MenuItem.name
    })

    this.setChildrenStyle()
    this.setExpandedSubmenu()
    this.setActiveDescendant()
  },

  methods: {
    setActiveItem(name) {
      this.activeMenuName = name
      this.setActiveDescendant()

      this.$emit('selectItem', name)
    },
    resetSubmenu() {
      this.submenus.forEach(({ component }) => {
        component.updateActive(false)
        component.handleHoverLeave()
      })
    },
    setExpandedSubmenu() {
      this.submenus.forEach(({ component }) => {
        if (this.expandedNames.includes(component.name)) {
          component.expandSubmenu()
        } else {
          component.closeSubmenu()
        }
      })
    },
    updateExpandedSubmenu(submenuName, expanded) {
      const expandedNamesSet = new Set([...this.expandedNames])
      expandedNamesSet[`${expanded ? 'add' : 'delete'}`](submenuName)

      this.$emit('update:expandedNames', [...expandedNamesSet])
    },
    setChildrenStyle() {
      if (this.mode === 'vertical') {
        // According to the menu-item & submenu level setting padding left
        this.submenus.forEach(({ component, level }) => {
          component.setTitlePaddingLeft(
            `${
              this.collapsed
                ? HORIZONTAL_MENU_PADDING_LEFT
                : VERTICAL_MENU_PADDING_LEFT * level
            }px`
          )
        })
        this.menuItems.forEach(({ component, level }) => {
          component.setPaddingLeft(
            `${
              this.collapsed
                ? HORIZONTAL_MENU_PADDING_LEFT
                : VERTICAL_MENU_PADDING_LEFT * level
            }px`
          )
        })
      }
    },
    setActiveDescendant() {
      if (!this.activeMenuName) return

      const foundMenuItem = this.menuItems.find(
        ({ component }) => component.name === this.activeMenuName
      )
      this.activeMenuId = foundMenuItem?.component.id
    }
  },

  watch: {
    collapsed() {
      this.setChildrenStyle()
    },
    activeName(value) {
      if (this.activeMenuName === value) return

      this.activeMenuName = value
      this.setActiveDescendant()
    },
    expandedNames() {
      this.setExpandedSubmenu()
    }
  },

  render(h) {
    return (
      <div
        style={this.styles}
        class={this.classes}
        role="menubar"
        aria-orientation={this.mode}
        aria-activedescendant={this.activeMenuId}
      >
        {this.$scopedSlots.default?.()}
      </div>
    )
  }
}
