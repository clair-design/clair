export default {
  computed: {
    children() {
      // for runtime before v2.6
      if (this.$slots.default) {
        return this.$slots.default
      }

      const scopedSlot = this.$scopedSlot
      return scopedSlot.default && scopedSlot.default()
    }
  }
}
