/**
 * A Vue.js mixin to add validate functionality
 */
import Validator from './validator.js'
import './index.css'

export default {

  data: () => ({
    // store validation result
    validity: {
      valid: true,
      msg: '',
      dirty: false
    }
  }),

  created: function () {
    const hasRules = this.$options.props.rules || this.rules
    if (!this.$options.props.value || !hasRules) {
      const msg = `Prop 'value' and 'rules' are required to use 'Validatable'.`
      throw new Error(msg)
    }
    const setDirty = function setDirty () {
      this.validity.dirty = true
    }
    this.$on('input', setDirty)
    this.$on('change', setDirty)
  },

  watch: {
    value: function () {
      if (this.validity.dirty) {
        Object.assign(this.validity, this.validate())
      }
    }
  },

  methods: {
    validate: function () {
      this.validity.dirty = true
      return Object.assign(
        this.validity,
        Validator.validate(this.value, this.rules)
      )
    }
  }

}
