export default {
  name: 'CForm',

  provide() {
    return {
      $form: this
    }
  },

  props: {
    labelPosition: {
      type: String,
      default: 'right',
      validator(position) {
        return ['left', 'right', 'top'].includes(position)
      }
    },
    labelWidth: [Number, String],
    inline: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      fields: []
    }
  },

  computed: {
    classes() {
      return [
        {
          'c-form': true,
          'c-form--inline': this.inline,
          'c-form--label-left': this.labelPosition === 'left',
          'c-form--label-right': this.labelPosition === 'right',
          'c-form--label-top': this.labelPosition === 'top'
        }
      ]
    }
  },

  methods: {
    handleFieldAdd(field) {
      this.fields.push(field)
    },
    handleFieldRemove(field) {
      this.fields.splice(this.fields.indexOf(field), 1)
    },
    async validate(fields = []) {
      const validateResult = {
        success: true,
        errors: []
      }

      const filteredFields =
        fields.length > 0
          ? this.fields.filter(field => fields.includes(field.prop))
          : this.fields

      const results = await Promise.all(
        filteredFields.map(field => field.validate())
      )

      results.forEach(result => {
        if (!result.success) {
          validateResult.success = false
          validateResult.errors = validateResult.errors.concat(result.errors)
        }
      })

      return validateResult
    },
    resetFields(fields = []) {
      const filteredFields =
        fields.length > 0
          ? this.fields.filter(field => fields.includes(field.prop))
          : this.fields

      filteredFields.forEach(field => {
        field.resetField()
      })
    }
  },

  render(h) {
    return <form class={this.classes}>{this.$slots.default}</form>
  }
}
