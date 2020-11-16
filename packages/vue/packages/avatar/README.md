---
group: Basic 基础
---

# Avatar 头像

## 定义

表达用户信息相关的图片

## 使用场景

需要提示当前用户信息时；
一般情况下头像与用户名结合使用；
可以根据业务场景识别用户在线、离线、忙碌等状态；

## 基础样式

提供三种尺寸，两种形状的头像

```html
<template>
  <c-avatar size="large"></c-avatar>
  <c-avatar></c-avatar>
  <c-avatar size="small"></c-avatar>
  <c-avatar shape="square" size="large"></c-avatar>
  <c-avatar shape="square"></c-avatar>
  <c-avatar shape="square" size="small"></c-avatar>
</template>

<style scoped>
  .c-avatar {
    margin-right: 40px;
    vertical-align: middle;
  }
</style>
```

## 头像类型

头像支持三种类型：Icon、字符和图片，其中 Icon 和字符颜色及背景色可自定义。

```html
<template>
  <c-avatar></c-avatar>
  <c-avatar text="N"></c-avatar>
  <c-avatar text="NA"></c-avatar>
  <c-avatar src="https://p1.ssl.qhimg.com/t01c746959090f19f97.jpg"></c-avatar>
  <c-avatar text="N" background-color="#57617B" color="#FFF"></c-avatar>
  <c-avatar background-color="#006BFF" color="#FFF"></c-avatar>
</template>

<style scoped>
  .c-avatar {
    margin-right: 40px;
  }
</style>
```

## 带徽标样式

用于新消息提示，徽标的圆心与头像右上角的点重合

```html
<template>
  <c-badge :value="9"><c-avatar></c-avatar></c-badge>
  <c-badge isDot><c-avatar></c-avatar></c-badge>
</template>

<style scoped>
  .c-badge {
    margin-right: 40px;
  }
</style>
```

## Props

| Name             | Description          | Type                                 | Required | Default  |
| ---------------- | -------------------- | ------------------------------------ | -------- | -------- |
| shape            | 形状                 | `'circle'` \| `'square'`             | `false`  | `circle` |
| size             | 大小                 | `'large'` \| `'normal'` \| `'small'` | `false`  | `middle` |
| src              | 头像地址             | `string`                             | `false`  | -        |
| text             | 字符头像             | `string`                             | `false`  | -        |
| background-color | icon/text 的背景颜色 | `string`                             | `false`  | -        |
| color            | icon/text 的颜色     | `string`                             | `false`  | -        |
