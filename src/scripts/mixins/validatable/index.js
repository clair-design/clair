/**
 * A Vue.js mixin to add validate functionality
 */
import Validator from './validator.js'
import { isPromise } from './util.js'

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
      },
      isValidatable: true,
      asyncValidationId: 0
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
  },

  mounted () {
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
        this.validate()
      }
    }
  },

  methods: {
    validate () {
      this.validity.dirty = true
      const { $formItem } = this
      const required = $formItem && !this.$parent.isValidatable && $formItem.required
      const rules = Object.assign({ required }, this.rules)
      if (!rules.msg) rules.msg = {}
      if (typeof rules.msg === 'object' && !rules.msg.required) {
        const label = $formItem && $formItem.label ? $formItem.label : ''
        const action = this.$options.name === 'c-input' ? '填写' : '选择'
        rules.msg.required = `请${action}${label.replace(/[:：]/, '')}`
      }
      const result = Validator.validate(this.value, rules)
      const setValidity = v => Object.assign(this.validity, v)
      if (isPromise(result)) {
        this.asyncValidationId++
        (() => {
          const id = this.asyncValidationId
          result.then(v => {
            if (this.asyncValidationId === id) setValidity(v)
          })
        })()
      } else {
        setValidity(result)
      }
      return result
    },
    resetValidity () {
      Object.assign(this.validity, {
        dirty: false,
        valid: true,
        msg: ''
      })
    }
  }
}
