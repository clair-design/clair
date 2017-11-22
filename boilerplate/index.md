---
title: ${componentName}
layout: component
scrollTop: true
route: component/${route}
---

# ${componentName}

Description.....

## Demo

下面是可以查看代码的 demo：

```html
<${tagName}></${tagName}>
```

下面是没有代码的 demo，关键在于使用了 `v-effect` 指令，注意这只是隐藏了除效果部分之外的其他元素：

```html
<!-- 注意使用一个父元素包裹起来 -->
<div v-effect>
  <${tagName}></${tagName}>
</div>
```

下面是另一种没有代码的 demo，在 `template` 标签上添加 `demo-only` 属性即可，这将不会渲染代码部分：

```html
<template demo-only>
  <${tagName}></${tagName}>
</template>
```
