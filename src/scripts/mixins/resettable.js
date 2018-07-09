/**
 * A Vue.js mixin to add reset functionality to form fields
 */
export default {
  inject: {
    $form: { default: null }
  },

  data () {
    return {
      initialValue: void 0,
      isResettable: true
    }
  },

  created () {
    // skip inner components
    if (this.$parent.isResettable) return

    const { model } = this.constructor.extendOptions
    const prop = (model && model.prop) || 'value'
    const event = (model && model.event) || 'input'
    this.$prop = prop
    this.$event = event

    // listen form reset event
    if (this.$form) {
      this.$form.$on('reset', e => this.reset())
    }

    // remember initial value
    if (this.initialValue === void 0) {
      this.initialValue = this[this.$prop]
    }
  },

  methods: {
    reset () {
      this.$emit(this.$event, this.initialValue)
    }
  }
}
