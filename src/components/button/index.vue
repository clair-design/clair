<template lang="pug">
  router-link(
    v-if="href"
    tag="button"
    class="c-button"
    :class="classNames"
    :to="href"
  )
    c-icon(v-if="iconType" :name="iconType")
    span(v-if="$slots.default")
      slot
  button(
    v-else
    class="c-button"
    :class="classNames"
    @click="onClick"
  )
    c-icon(v-if="iconType" :name="iconType")
    span(v-if="$slots.default")
      slot
</template>

<script>
  // import css
  import './index.css'

  import {
    toVueProps,
    toClassNames
  } from '../../js/util'

  const name = 'c-button'
  const block = `c-button`
  const modifiers = [
    'primary',
    'danger',
    'round',
    'outline',
    'loading'
  ]
  const props = Object.assign(
    {
      href: String,
      size: String,
      icon: String
    },
    toVueProps(modifiers)
  )
  const classNames = toClassNames(block, modifiers)

  export default {
    name,
    props,
    computed: {
      iconType () {
        return this.loading ? 'spinner' : this.icon
      },
      classNames () {
        const classList = classNames.call(this)
        if (this.size) classList.push(`c-button--${this.size}`)
        return classList
      }
    },
    methods: {
      onClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>
