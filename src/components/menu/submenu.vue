<template lang="pug">
.c-submenu(:class="{'is-open': isOpen}")
  .c-submenu__title.c-menu__item(
    @click="toggleSubmenu"
    @mouseenter="enterSubMenu"
    @mouseleave="leaveSubMenu"
  )
    slot(name="title") {{ title }}
  .c-submenu__popup(
    @mouseenter="enterPopup"
    @mouseleave="leavePopup"
    @focusin="focusIn"
    @focusout="focusOut"
    @click.capture="clickSubMenu"
  )
    slot
</template>

<script>
import { VueTypes } from '@util'

export default {
  name: 'c-submenu',
  props: {
    title: String,
    open: Boolean,
    trigger: VueTypes.oneOf(['hover', 'click']),
    delay: {
      type: Number,
      default: 60
    }
  },
  inject: ['$menu'],
  watch: {
    open: {
      immediate: true,
      handler () {
        if (this.open) {
          this.isOpen = true
        }
      }
    },
    '$menu.collapsed' (collapsed) {
      if (collapsed) {
        this.isOpen = false
      }
    }
  },
  data () {
    return {
      isOpen: false,
      hideSubMenuTimer: null, // 隐藏子菜单时延时
      showSubMenuTimer: null // hover显示子菜单延时
    }
  },
  computed: {
    isVerticalExpanding () {
      const { isVertical, collapsed } = this.$menu
      return isVertical && !collapsed
    },
    innerTrigger () {
      if (this.isVerticalExpanding) {
        return 'click'
      }

      // if not specified in props,
      // use 'hover' for vertical cases
      // and 'click' for horizontal cases
      if (this.trigger == null) {
        const { isVertical } = this.$menu
        return isVertical ? 'hover' : 'click'
      }

      return this.trigger
    }
  },
  methods: {
    toggleSubmenu () {
      if (this.innerTrigger === 'click') {
        this.isOpen = !this.isOpen
      }
    },

    enterSubMenu () {
      if (this.innerTrigger === 'hover') {
        this.enterPopup()
      }
    },

    leaveSubMenu () {
      if (this.innerTrigger === 'hover') {
        this.leavePopup()
      }
    },

    enterPopup () {
      if (this.isVerticalExpanding) {
        return
      }

      clearTimeout(this.showSubMenuTimer)
      clearTimeout(this.hideSubMenuTimer)
      this.showSubMenuTimer = setTimeout(() => {
        this.openSubMenu()
      }, this.delay)
    },

    leavePopup () {
      if (this.isVerticalExpanding) {
        return
      }

      clearTimeout(this.showSubMenuTimer)
      clearTimeout(this.hideSubMenuTimer)
      this.hideSubMenuTimer = setTimeout(() => {
        this.closeSubMenu()
      }, this.delay)
    },

    clickSubMenu () {
      if (this.isVerticalExpanding) {
        return
      }
      this.closeSubMenu()
    },

    openSubMenu () {
      this.isOpen = true
    },

    closeSubMenu () {
      this.isOpen = false
    },

    focusIn () {
      this.openSubMenu()
    },

    focusOut () {
      // do not close submenu if menu is vertical and not collapsed
      if (this.isVerticalExpanding) {
        return
      }

      this.closeSubMenu()
    }
  }
}
</script>
