import { listenToMediaQuery } from '@clair/helpers'
export const mixin = {
  data() {
    return {
      size: 'lg',
      removeListener: () => void 0
    }
  },
  computed: {
    sizeStringArray() {
      return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    },
    size2Use() {
      return this.getClosestSize(
        this.sizeStringArray,
        this.size,
        size => this.$props[size]
      )
    }
  },
  methods: {
    updateSize({ detail: { size } } = { detail: { size: 'lg' } }) {
      this.size = size
    },
    getClosestSize(candidates, size, predicate = () => true) {
      const index = candidates.indexOf(size)
      // invalid size
      if (index < 0) {
        return null
      }
      if (predicate(size)) {
        return size
      }

      // search down, mobile first
      for (let i = index - 1; i >= 0; i--) {
        const candidate = candidates[i]
        if (predicate(candidate)) {
          return candidate
        }
      }
      // valid size keyword
      // but have not set such prop
      // treat as non-responsive
      return null
    }
  },
  mounted() {
    this.removeListener = listenToMediaQuery(this.updateSize).removeListener
  },
  beforeDestroy() {
    this.removeListener()
  }
}
