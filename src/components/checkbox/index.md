## CHECKBOX 多选框

```html
<style>
.wrapper input {
  width: 50px;
  text-align: center;
}
</style>

<template>
  <div class="wrapper">
    <button @click="incr(-1)">-</button>
    <input type="text" readonly :value="count">
    <button @click="incr(+1)">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    incr(delta) {
      this.count += delta
    }
  }
}
</script>
```
