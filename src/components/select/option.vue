<template lang="pug">
.c-select__option(
  role="menuitem"
  aria-selected="isSelected"
  :class="classNames"
  @mouseenter="activate"
  @mouseleave="deactivate"
  @click="onClick"
  @mousedown.prevent="nil"
) {{ label }}
</template>

<script>
export default {
  name: 'c-option',
  props: {
    label: String,
    disabled: Boolean,
    isActive: Boolean,
    isSelected: Boolean,
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
      this.$select.$emit('option-activated', this)
    },
    deactivate () {
      this.$select.$emit('option-deactivated', this)
    },
    onClick (e) {
      e.preventDefault()
      if (this.disabled) return
      this.$select.$emit('option-clicked', this)
    },
    nil (e) {}
  }
}
</script>
