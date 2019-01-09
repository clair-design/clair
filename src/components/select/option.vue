<template lang="pug">
.c-select__option(
  role="menuitem"
  aria-selected="isSelected"
  :class="classNames"
  @mouseenter="activate"
  @mouseleave="deactivate"
  @mousedown.prevent="noop"
  @click="onClick"
)
  slot {{ label }}
</template>

<script>
export default {
  name: 'c-option',
  props: {
    label: [String, Number, Boolean],
    disabled: Boolean,
    isActive: Boolean,
    isSelected: Boolean,
    option: Object,
    value: [String, Number, Object]
  },
  inject: ['$select'],
  computed: {
    classNames () {
      return {
        'is-hover': this.isActive,
        'is-selected': this.isSelected,
        'is-disabled': this.disabled
      }
    }
  },
  methods: {
    activate () {
      this.$select.$emit('option-activated', this.option)
    },
    deactivate () {
      this.$select.$emit('option-deactivated', this.option)
    },
    onClick (e) {
      e.preventDefault()
      if (this.disabled) return
      this.$select.$emit('option-clicked', this.option)
    }
  }
}
</script>
