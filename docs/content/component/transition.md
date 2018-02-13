---
title: 过渡动画
layout: component
route: /component/transition
---

# 过渡动画

Clair 内置了一些过渡效果的 CSS，搭配 Vue.js 的 [transition](https://cn.vuejs.org/v2/guide/transitions.html) 组件，可以可以给元素或组件添加进入或退出时的过渡动画。

```html
<template demo-only>
<c-form label-width="5em">
  <c-form-item label="过渡效果：">
    <c-radio-group
      button
      v-model="transition"
      :options="[
        {label: 'fade-in-down', value: 'fade-in-down'},
        {label: 'zoom-in', value: 'zoom-in'}
      ]"
    ></c-radio-group>
  </c-form-item>
  <c-form-item label=" ">
    <c-button primary type="button" @click="play">播放动画</c-button>
  </c-form-item>
</c-form>
<div class="container">
  <transition :name="transition">
    <div class="transition-target" v-show="visible"></div>
  </transition>
</div>
</template>

<script>
export default {
  data () {
    return {
      transition: 'fade-in-down',
      visible: false
    }
  },

  methods: {
    play () {
      this.visible = !this.visible
    }
  }
}
</script>

<style>
  .container {
    height: 200px;
  }
  .transition-target {
    position: absolute;
    top: auto;
    left: auto;
    width: 200px;
    height: 200px;
    background: red;
    margin-left: 5em;
  }
</style>
```
