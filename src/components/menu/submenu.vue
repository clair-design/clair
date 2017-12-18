<template lang="pug">
.c-submenu(:class="{'is-open': isOpen}")
  .c-submenu__title.c-menu__item(
    @click="toggleSubmenu"
  )
    slot(name="title") {{ title }}
  .c-submenu__popup
    slot
</template>

<script>
export default {
  name: 'c-submenu',
  props: {
    title: String,
    open: Boolean
  },
  inject: ['$menu'],
  watch: {
    open: {
      immediate: true,
      handler: function () {
        if (this.open) this.isOpen = true
      }
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleSubmenu () {
      if (this.$menu.mode !== 'vertical') return
      this.isOpen = !this.isOpen
    }
  }
}
</script>
