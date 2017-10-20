<template lang="pug">
  router-link(
    v-if="href"
    tag="button"
    class="c-button"
    :class="classNames"
    :to="href"
  )
    slot
  button(
    v-else
    class="c-button"
    :class="classNames"
  )
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
    'readonly',
    'disabled'
  ]
  const props = Object.assign(
    {
      href: String
    },
    toVueProps(modifiers)
  )
  const classNames = toClassNames(block, modifiers)

  export default {
    name,
    props,
    computed: { classNames }
  }
</script>
