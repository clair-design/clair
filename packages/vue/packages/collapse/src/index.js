const V_MODEL_EVENT = 'update:value'

export default {
  name: 'CCollapse',
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  model: {
    event: V_MODEL_EVENT,
    prop: 'value'
  },
  provide() {
    return {
      $collapse: this
    }
  },
  methods: {
    toggleActiveNames(item) {
      const { name, isActive } = item
      const { value } = this
      let model = value
      if (this.accordion) {
        this.$emit(V_MODEL_EVENT, isActive ? [] : [name])
      } else {
        const isNameActive = value.includes(name)
        if (isNameActive) {
          model = value.filter(item => item !== name)
        } else {
          model = value.concat(name)
        }
        this.$emit(V_MODEL_EVENT, model)
      }
      this.$emit('change', {
        detail: { name, isActive }
      })
    }
  },
  render(h) {
    return <div class="c-collapse">{this.$scopedSlots.default?.()}</div>
  }
}
