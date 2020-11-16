import AsyncValidator from 'async-validator'
import { get, set } from 'lodash-es'

export default {
  name: 'CFormItem',

  provide() {
    return {
      $formItem: this
    }
  },

  inject: {
    $form: { default: null }
  },

  props: {
    label: String,
    labelWidth: {
      type: [Number, String],
      default() {
        return this.$form && this.$form.labelWidth
      }
    },
    helperText: String,
    prop: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      initialValue: null,
      errorMessage: '',
      isError: false
    }
  },

  computed: {
    style() {
      return {
        width: isNaN(this.labelWidth) ? this.labelWidth : `${this.labelWidth}px`
      }
    },
    classes() {
      return [
        {
          'c-form-item': true,
          'c-form-item--with-help':
            this.$slots['helper-text'] || this.helperText || this.isError,
          'is-error': this.isError,
          'is-required': this.isRequired
        }
      ]
    },
    labelContent() {
      if (this.$slots.label === undefined && this.label === undefined) {
        return ''
      }

      return (
        <label class="c-form-item__label" style={this.style}>
          {this.$slots.label || this.label}
        </label>
      )
    },
    helperTextContent() {
      if (
        this.$slots['helper-text'] === undefined &&
        this.helperText === undefined
      ) {
        return ''
      }

      return (
        <div class="c-form-item__helper-text">
          {this.$slots['helper-text'] || this.helperText}
        </div>
      )
    },
    errorMessageContent() {
      if (!this.errorMessage) {
        return ''
      }

      return <div class="c-form-item__error">{this.errorMessage}</div>
    },
    fieldValue() {
      if (!this.$form.model || !this.prop) {
        return
      }

      return get(this.$form.model, this.prop)
    },
    fieldRules() {
      if (!this.$form.model || !this.prop) {
        return []
      }

      return this.rules.length > 0
        ? this.rules
        : get(this.$form.rules, this.prop) ?? []
    },
    isRequired() {
      return Boolean(this.fieldRules.find(rule => rule.required))
    }
  },

  mounted() {
    if (!this.prop) {
      return
    }

    this.initialValue = this.fieldValue
    this.$form.handleFieldAdd(this)
  },

  methods: {
    async validate(trigger = '') {
      const rules = this.getFilteredRules(trigger)
      const validateResult = {
        success: true,
        errors: []
      }

      if (!rules.length) {
        return validateResult
      }

      rules.forEach(rule => delete rule.trigger)

      const validator = new AsyncValidator({
        [this.prop]: rules
      })

      try {
        await validator.validate(
          {
            [this.prop]: this.fieldValue
          },
          { firstFields: true },
          (errors, fields) => {
            if (errors) {
              this.isError = true
              this.errorMessage = errors[0].message
              validateResult.success = false
              validateResult.errors = errors
              return
            }

            this.isError = false
            this.errorMessage = ''
          }
        )
      } catch (e) {}

      return validateResult
    },
    resetField() {
      this.isError = false
      this.errorMessage = ''
      set(this.$form.model, this.prop, this.initialValue)
    },
    getFilteredRules(trigger = '') {
      return this.fieldRules
        .filter(
          rule => !rule.trigger || trigger === '' || rule.trigger === trigger
        )
        .map(rule => Object.assign({}, rule))
    },
    handleFormItemBlur() {
      this.validate('blur')
    },
    handleFormItemChange() {
      this.validate('change')
    }
  },

  beforeDestroy() {
    if (!this.prop) {
      return
    }

    this.$form.handleFieldRemove(this)
  },

  render(h) {
    return (
      <div class={this.classes}>
        {this.labelContent}
        <div class="c-form-item__content">
          <div class="c-form-item__wrapper">{this.$slots.default}</div>
          {this.helperTextContent}
          {this.errorMessageContent}
        </div>
      </div>
    )
  }
}
