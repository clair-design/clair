<template lang="pug">
  button(
    class="c-button"
    :class="classNames"
  )
    slot
</template>

<script>
  import {
    toVueProps,
    toClassNames
  } from '../../js/util'

  const name = 'button'
  const block = `c-${name}`
  const modifiers = [
    'primary',
    'readonly',
    'disabled'
  ]
  const props = toVueProps(modifiers)
  const classNames = toClassNames(block, modifiers)

  export default {
    name,
    props,
    computed: { classNames }
  }
</script>
