<template lang="pug">
.c-submenu(:class="{'is-open': isOpen}")
  .c-submenu__title.c-menu__item(
    @click="toggleSubmenu"
    @mouseenter="enterSubMenu"
    @mouseleave="leaveSubMenu"
  )
    slot(name="title") {{ title }}
  .c-submenu__popup(
    @mouseenter="enterSubMenu"
    @mouseleave="leaveSubMenu"
    @focusin="openSubMenu"
    @focusout="closeSubMenu"
    @click.capture="clickSubMenu"
  )
    slot
</template>

<script>

export default {
  name: 'c-submenu',
  props: {
    title: String,
    open: Boolean,
    delay: {
      type: Number,
      default: 200
    }
  },
  inject: ['$menu'],
  watch: {
    open: {
      immediate: true,
      handler: function () {
        if (this.open) this.isOpen = true
      }
    },
    '$menu.collapsed': function (collapsed) {
      if (collapsed) this.isOpen = false
    }
  },
  data () {
    return {
      isOpen: false,
      hideSubMenuTimer: null, // 隐藏子菜单时延时
      showSubMenuTimer: null // hover显示子菜单延时
    }
  },
  methods: {
    toggleSubmenu () {
      this.isOpen = !this.isOpen
    },
    enterSubMenu () {
      if (this.hideSubMenuTimer) clearTimeout(this.hideSubMenuTimer)
      const { isVertical, collapsed } = this.$menu
      if (isVertical && !collapsed) return
      this.showSubMenuTimer = setTimeout(_ => {
        this.openSubMenu()
      }, this.delay)
    },
    leaveSubMenu () {
      if (this.showSubMenuTimer) clearTimeout(this.showSubMenuTimer)
      const { isVertical, collapsed } = this.$menu
      if (isVertical && !collapsed) return
      this.hideSubMenuTimer = setTimeout(_ => {
        this.closeSubMenu()
      }, this.delay)
    },
    clickSubMenu () {
      if (this.$menu.isVertical && !this.$menu.collapsed) return
      this.closeSubMenu()
    },
    openSubMenu () {
      this.isOpen = true
    },
    closeSubMenu () {
      this.isOpen = false
    }
  }
}
</script>
