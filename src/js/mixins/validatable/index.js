/**
 * A Vue.js mixin to add validate functionality
 */
import Validator from './validator.js'

export default {

  props: {
    rules: {
      type: Object,
      default: _ => ({})
    }
  },

  data () {
    return {
      // store validation result
      validity: {
        valid: true,
        msg: '',
        dirty: false
      }
    }
  },

  inject: {
    '$form': { default: null },
    '$formItem': { default: null }
  },

  created () {
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

    const { $form, $formItem } = this
    if ($form) $form.$emit('validatable-attached', this)
    if ($formItem) $formItem.$emit('validatable-attached', this)
  },

  beforeDestroy () {
    const { $form, $formItem } = this
    if ($form) $form.$emit('validatable-detached', this)
    if ($formItem) $formItem.$emit('validatable-detached', this)
  },

  watch: {
    value () {
      if (this.validity.dirty) {
        Object.assign(this.validity, this.validate())
      }
    }
  },

  methods: {
    validate () {
      this.validity.dirty = true
      return Object.assign(
        this.validity,
        Validator.validate(this.value, this.rules)
      )
    }
  }

}
