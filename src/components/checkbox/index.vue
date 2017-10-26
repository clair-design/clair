<template lang="pug">
  button(
    class="c-checkbox"
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

  const name = 'c-checkbox'
  const block = `c-checkbox`
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
