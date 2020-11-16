import { AutoIncreasingCounter } from '@clair/helpers'
import { isSameRoute } from './utils'

const counter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CMenuItem',

  inject: {
    $menu: { default: null },
    $submenu: { default: null }
  },

  props: {
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: null
    },
    replace: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      id: `c-menu-item-${counter.next()}`,
      paddingLeft: ''
    }
  },

  computed: {
    classes() {
      return {
        'c-menu-item': true,
        'c-menu-item--active': this.isActive
      }
    },
    styles() {
      return {
        paddingLeft: this.paddingLeft
      }
    },
    isActive() {
      return this.$menu.activeMenuName === this.name
    }
  },

  methods: {
    handleClick() {
      if (this.disabled) return

      this.$menu.setActiveItem(this.name)
      this.$menu.resetSubmenu()
      this.$submenu?.updateActive(true)
      this.handleUseRouter()
      this.$menu.$emit('select', { detail: { name: this.name } })
    },
    handleUseRouter() {
      const { to, $router, $route, $menu } = this
      if (!$menu.useRouter || !$router || to === null) {
        return
      }
      const targetRoute = $router.resolve(to).route
      if (isSameRoute($route, targetRoute)) {
        return
      }
      this.replace ? $router.replace(to) : $router.push(to)
    },
    setPaddingLeft(value) {
      this.paddingLeft = value
    }
  },

  render(h) {
    return (
      <div
        style={this.styles}
        id={this.id}
        class={this.classes}
        role="menuitem"
        aria-disabled={this.disabled}
        tabindex={this.disabled ? -1 : 0}
        on-click={this.handleClick}
      >
        <div class="c-menu-item__inner">{this.$scopedSlots.default?.()}</div>
      </div>
    )
  }
}
