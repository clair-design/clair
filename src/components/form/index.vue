<template lang="pug">
form.c-form(
  :class="classNames"
  @submit="onSubmit"
)
  slot
</template>

<script>
import './index.css'
import { toClassNames } from '../../js/utils'

const block = 'c-form'
const modifiers = ['inline']
const getClassName = toClassNames(block, modifiers)

export default {
  name: block,
  props: {
    inline: Boolean,
    labelWidth: String,
    size: String,
    width: String
  },
  provide () {
    return {
      '$form': this
    }
  },
  data () {
    return {
      validatables: []
    }
  },
  computed: {
    classNames () {
      const classes = getClassName.call(this)
      if (this.size) classes.push(`is-${this.size}`)
      return classes
    }
  },
  created () {
    const { validatables } = this
    this.$on('validatable-attached', v => validatables.push(v))
    this.$on('validatable-detached', v => {
      const i = validatables.indexOf(v)
      this.validatables.splice(i, 1)
    })
  },
  methods: {
    onSubmit (e) {
      this.$emit('submit', e)
    },
    isValid () {
      return this.validatables
        .map(v => v.validate())
        .every(result => result.valid)
    },
    resetValidity () {
      this.validatables.forEach(v => v.resetValidity())
    },
    reset () {
      this.$emit('reset')
      this.resetValidity()
    }
  }
}
</script>
