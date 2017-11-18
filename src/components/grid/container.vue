<template lang="pug">
  .c-container(:class="classNames")
    slot
</template>

<script>
export default {
  name: 'c-container',
  props: {
    size: String,
    align: String
  },
  computed: {
    classNames () {
      const classNames = []
      if (this.size) classNames.push(`is-${this.size}`)
      if (this.align) classNames.push(`is-${this.align}`)
      return classNames
    }
  }
}
</script>
