---
title: Ctrl
layout: component
scrollTop: true
route: component/ctrl
---

# Ctrl

Description.....

## Demo

**注意在写 demo 中的脚本时，对 window 的操作以及特殊全局变量的使用要特别小心。必要时请参考 icon 组件的文档。**

下面是可以查看代码的 demo：

```html
<c-ctrl direction="h" width="300" height="8"></c-ctrl>
```

```html
<c-ctrl direction="v" width="8" height="100"></c-ctrl>
```


```html
<c-ctrl direction="vh" width="100" height="100"></c-ctrl>
```

下面是没有代码的 demo，关键在于使用了 `v-effect` 指令，注意这只是隐藏了除效果部分之外的其他元素：

```html
<!-- 注意使用一个父元素包裹起来 -->
<div v-effect>
  <c-ctrl></c-ctrl>
</div>
```

下面是另一种没有代码的 demo，在 `template` 标签上添加 `demo-only` 属性即可，这将不会渲染代码部分：

```html
<template demo-only>
  <c-ctrl></c-ctrl>
</template>
```
