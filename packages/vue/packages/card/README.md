---
group: Basic 基础
---

# Card 卡片

## 定义

信息聚合在卡片容器中展示。

## 使用场景

卡片容器可承载文字、列表、图片、段落，突出关键信息，常用于后台概览页面。

## 基础样式

卡片包含标题，内容和操作。

```html
<template>
  <c-card title="卡片标题" style="width: 360px; max-width: 100%">
    <template v-slot:actions>
      <a href="#" class="action-button" @click.prevent>操作按钮</a>
    </template>
    <p>卡片内容...</p>
    <p>卡片内容...</p>
    <p>卡片内容...</p>
  </c-card>
</template>

<style scoped>
  .action-button {
    font-size: 14px;
    color: #006bff;
    text-decoration: none;
  }
</style>
```

## 投影样式

带投影的的卡片。可以通过设置 `raised` 属性给一个卡片添加投影。

```html
<template>
  <c-card title="卡片标题" raised style="width: 360px; max-width: 100%">
    <p>卡片内容...</p>
    <p>卡片内容...</p>
    <p>卡片内容...</p>
  </c-card>
</template>
```

## 简洁样式

不设置 `title` 属性或者 Slot，卡片头部则不会展示，只有内容区域展示。

```html
<template>
  <c-card style="width: 360px; max-width: 100%">
    <p>卡片内容...</p>
    <p>卡片内容...</p>
    <p>卡片内容...</p>
  </c-card>
</template>
```

## 带图片样式

通过 `cover` Slot 可以给卡片添加图片或者视频。

```html
<template>
  <c-card title="图片介绍" style="width: 360px; max-width: 100%">
    <template v-slot:cover>
      <img style="width: 100%" src="https://picsum.photos/id/49/500/300" />
    </template>
    <div>2019-04-19 18:45:37</div>
  </c-card>
</template>
```

## 无边框样式

将 `bordered` 属性设置为 `false` 可以使卡片去掉边框。

```html
<template>
  <div style="padding: 20px; background: #e5ebf1">
    <c-card
      :bordered="false"
      title="卡片标题"
      style="width: 360px; max-width: 100%"
    >
      <p>卡片内容...</p>
      <p>卡片内容...</p>
      <p>卡片内容...</p>
    </c-card>
  </div>
</template>
```

## Props

| Name       | Description      | Type      | Required | Default |
| ---------- | ---------------- | --------- | -------- | ------- |
| title      | 卡片标题         | `string`  | `false`  | `null`  |
| raised     | 是否显示阴影     | `boolean` | `false`  | `false` |
| bordered   | 是否显示边框     | `boolean` | `false`  | `true`  |
| body-style | 卡片 body 的样式 | `Object`  | `false`  | `{}`    |

### Slots

| Name    | Description                |
| ------- | -------------------------- |
| default | 卡片内容                   |
| title   | 自定义卡片标题             |
| actions | 卡片的操作，放在标题右上角 |
| cover   | 用于展示图片、视频等内容   |
