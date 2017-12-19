<template lang="pug">
.c-form(:class="classNames")
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
      const i = validatables.findIndex(v)
      this.validatables.splice(i, 1)
    })
  },
  methods: {}
}
</script>
