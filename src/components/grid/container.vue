<template lang="pug">
  .c-container(:class="classNames")
    slot
</template>

<script>
export default {
  name: 'c-container',
  props: {
    size: String,
    align: String,
    noPadding: Boolean
  },
  computed: {
    classNames () {
      const classNames = []
      if (this.size) classNames.push(`is-${this.size}`)
      if (this.align) classNames.push(`is-${this.align}`)
      if (this.noPadding) classNames.push(`is-no-padding`)
      return classNames
    }
  }
}
</script>
