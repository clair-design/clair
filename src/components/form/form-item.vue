<template lang="pug">
.c-form-item(:class="classNames")
  label.c-form-item__label(
    v-if="label || $slots.label"
    :style="labelStyle"
  )
    slot(name="label") {{ label }}
  .c-form-item__control
    slot
    .c-form-item__error(:style="errorStyle")
      | {{ errorMsg }}
</template>

<script>
export default {
  name: 'c-form-item',
  provide () {
    return {
      '$formItem': this
    }
  },
  inject: {
    $form: { default: null }
  },
  props: {
    label: String,
    required: Boolean,
    flex: Boolean,
    labelWidth: String
  },
  data () {
    return {
      validatable: null
    }
  },
  computed: {
    hasError () {
      const { validatable } = this
      return validatable && !validatable.validity.valid
    },
    errorStyle () {
      const visibility = this.hasError ? 'visible' : 'hidden'
      return { visibility }
    },
    errorMsg () {
      return this.hasError ? this.validatable.validity.msg : ''
    },
    classNames () {
      const classNames = []
      if (this.required) classNames.push('is-required')
      if (this.flex) classNames.push('is-flex')
      return classNames
    },
    actualLabelWidth () {
      if (this.labelWidth) return this.labelWidth
      return this.$form && this.$form.labelWidth
    },
    labelStyle () {
      return {
        width: this.actualLabelWidth
      }
    }
  },
  watch: {
    validatable () {
      if (this.validatable && this.required) {
        this.validatable.rules.required = true
      }
    }
  },
  created () {
    this.$on('validatable-attached', v => {
      this.validatable = v
    })
    this.$on('validatable-detached', v => {
      this.validatable = null
    })
  },
  methods: {}
}
</script>
