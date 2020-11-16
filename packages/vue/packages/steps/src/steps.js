export default {
  name: 'CSteps',

  props: {
    activeKey: {
      type: String,
      default: '1'
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    isDot: {
      type: Boolean,
      default: false
    }
  },

  provide() {
    return {
      $steps: this
    }
  },

  computed: {
    classNames() {
      const { isVertical, isDot } = this
      return [
        'c-steps',
        !isVertical && !isDot ? 'c-steps--horizontal' : null,
        isVertical ? 'c-steps--vertical' : null,
        !isVertical && isDot ? 'c-steps--dotted' : null
      ]
    }
  },

  data() {
    return {
      currentKey: this.activeKey,
      steps: []
    }
  },

  watch: {
    activeKey(newKey) {
      this.setCurrentKey(newKey)
    }
  },

  methods: {
    setCurrentKey(key) {
      if (this.currentKey !== key) {
        this.currentKey = key
      }
    }
  },

  render(h) {
    return <div class={this.classNames}>{this.$scopedSlots.default?.()}</div>
  }
}
