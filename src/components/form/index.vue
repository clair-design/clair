<template lang="pug">
form.c-form(
  :class="classNames"
  @submit="onSubmit"
)
  slot
</template>

<script>
import './index.css'
import { toClassNames } from '../../js/util'

const block = 'c-form'
const modifiers = ['inline']
const getClassName = toClassNames(block, modifiers)

export default {
  name: block,
  props: {
    inline: Boolean,
    labelWidth: String
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
      return getClassName.call(this)
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
      this.validatables.forEach(v => {
        Object.assign(v.validity, {
          dirty: false,
          valid: true,
          msg: ''
        })
      })
    }
  }
}
</script>
