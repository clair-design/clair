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
    @focus.capture="focusSubMenu"
    @blur.capture="blurSubMenu"
  )
    slot
</template>

<script>
// 隐藏子菜单时延时
let hideSubMenuTimer = null

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
      isOpen: false
    }
  },
  methods: {
    toggleSubmenu () {
      this.isOpen = !this.isOpen
    },
    enterSubMenu () {
      if (hideSubMenuTimer) clearTimeout(hideSubMenuTimer)
      const { isVertical, collapsed } = this.$menu
      if (isVertical && !collapsed) return
      this.isOpen = true
    },
    leaveSubMenu () {
      const { isVertical, collapsed } = this.$menu
      if (isVertical && !collapsed) return
      hideSubMenuTimer = setTimeout(_ => {
        this.isOpen = false
      }, this.delay)
    },
    focusSubMenu () {
      this.isOpen = true
    },
    blurSubMenu () {
      this.isOpen = false
    }
  }
}
</script>
