<template>
  <form action="https://codepen.io/pen/define" method="POST" target="_blank" style="display: none;">
    <input type="hidden" name="data" :value="config">
    <input type="submit" value="submit">
  </form>
</template>

<script>
  export default {
    name: 'codepen',
    props: {
      config: {
        type: String,
        required: true
      }
    }
  }
</script>>
