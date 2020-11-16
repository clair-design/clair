<template>
  <div
    class="color-swatch"
    :style="{ backgroundColor: color, color: textColor }"
  >
    <div>{{ name }}</div>
    <div>{{ color.toUpperCase() }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ColorSwatch',
  props: ['color', 'name', 'textColor']
}
</script>

<style scoped>
.color-swatch {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 210px;
  min-height: 70px;
  padding: 15px;
  font-size: 14px;
  color: #fff;
  background: rgba(56, 202, 123, 1);
}
</style>
