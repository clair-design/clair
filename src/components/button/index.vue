<template lang="pug">
  router-link(
    v-if="href"
    tag="button"
    class="c-button"
    :class="classNames"
    :to="href"
  )
    c-icon(v-if="iconName" :name="iconName" valign="middle")
    span(v-if="$slots.default")
      slot
  button(
    v-else
    class="c-button"
    :class="classNames"
    @click="onClick"
  )
    c-icon(v-if="iconName" :name="iconName" valign="middle")
    span(v-if="$slots.default")
      slot
</template>

<script>
  // import css
  import './index.css'

  import {
    toVueProps,
    toClassNames
  } from '../../js/utils'

  const name = 'c-button'
  const block = `c-button`
  const modifiers = [
    'primary',
    'danger',
    'round',
    'outline',
    'flat',
    'loading'
  ]
  const props = Object.assign(
    {
      href: String,
      size: String,
      icon: String,
      autofocus: Boolean
    },
    toVueProps(modifiers)
  )
  const classNames = toClassNames(block, modifiers)

  export default {
    name,
    props,
    computed: {
      iconName () {
        return this.loading ? 'loader' : this.icon
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
    },
    mounted () {
      if (this.autofocus) {
        this.$el.focus()
      }
    }
  }
</script>
