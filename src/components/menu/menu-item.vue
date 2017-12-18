<template lang="pug">
.c-menu__item(:class="classNames")
  slot
</template>

<script>
export default {
  name: 'c-menu-item',
  props: {
    mode: String,
    active: Boolean
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    classNames () {
      const classNames = []
      if (this.isActive) classNames.push('is-active')
      return classNames
    }
  },
  mounted () {
    if (this.active) this.isActive = true
  },
  methods: {}
}
</script>
