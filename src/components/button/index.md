---
title: Button 按钮
layout: component
route: /component/button
meta:
  style:
  - cssText: >
      @media (max-width: 800px) {
        .vue-demo .c-button { margin-bottom: 1em; }
      }
---

<style>
@media (max-width: 800px) {
  .c-button { margin-bottom: 1em; }
}
</style>

# Button 按钮

Button 组件提供了不同的按钮风格以及状态、尺寸等选项。

## 按钮风格

Clair 提供了默认按钮、主操作和危险操作三种配色的按钮；同时，有圆角、线框和扁平（flat）三种风格可以选择。

```html
<p>
  <c-button>默认按钮</c-button>
  <c-button round>圆角风格</c-button>
  <c-button outline>线框风格</c-button>
  <c-button outline round>圆角线框</c-button>
  <c-button flat>扁平按钮</c-button>
</p>
<p>
  <c-button primary>主要操作</c-button>
  <c-button primary round>圆角风格</c-button>
  <c-button primary outline>线框风格</c-button>
  <c-button primary outline round>圆角线框</c-button>
  <c-button primary flat>扁平按钮</c-button>
</p>
<p>
  <c-button success>正向操作</c-button>
  <c-button success round>圆角风格</c-button>
  <c-button success outline>线框风格</c-button>
  <c-button success outline round>圆角线框</c-button>
  <c-button success flat>扁平按钮</c-button>
</p>
<p>
  <c-button warning>警告操作</c-button>
  <c-button warning round>圆角风格</c-button>
  <c-button warning outline>线框风格</c-button>
  <c-button warning outline round>圆角线框</c-button>
  <c-button warning flat>扁平按钮</c-button>
</p>
<p>
  <c-button danger>危险操作</c-button>
  <c-button danger round>圆角风格</c-button>
  <c-button danger outline>线框风格</c-button>
  <c-button danger outline round>圆角线框</c-button>
  <c-button danger flat>扁平按钮</c-button>
</p>
```

## 在按钮中使用图标

使用 `icon` 属性指定按钮文字前展示的图标。Clair 内置的图标请参考 [图标](/component/icon)。

```html
<div>
  <c-button primary icon="send">提交</c-button>
  <c-button icon="arrow-left">返回</c-button>
  <c-button outline icon="download"></c-button>
  <c-button danger outline round icon="trash"></c-button>
  <c-button flat icon="star">收藏</c-button>
</div>
```

## 链接按钮

有时候某些按钮点击后需要跳转到某一个链接，你可以使用 `href` 属性来实现。

```html
<c-button href="/" icon="home" primary>返回首页</c-button>
```

## 禁用 (disabled) 状态

使用 `disabled` 属性可将一个按钮禁用。

```html
<c-button disabled>普通按钮</c-button>
<c-button disabled outline>线框按钮</c-button>
<c-button primary disabled>主操作按钮</c-button>
<c-button primary disabled outline>线框主操作按钮</c-button>
<c-button danger disabled>危险按钮</c-button>
<c-button danger disabled outline>危险线框</c-button>
<c-button disabled flat>扁平按钮</c-button>
```

## 不同尺寸

Clair 提供了五种尺寸的按钮，在不同的场景下使用：

- 页面上的普通表单建议使用正常尺寸的按钮
- 浮层中的表单或者页面空间比较局促的时候，可以使用小号按钮
- 较大尺寸的按钮一般使用在具有强烈的点击召唤的场合，与之搭配的应该是较大的字体和留白

给 `c-button` 设置 `size` 属性即可控制其尺寸，它的值可以是 `xs` `sm` `md` `lg` `xl` 中的一个。如果不设置该属性，则默认尺寸中普通大小，即`md`。不同尺寸的按钮实际高度如下：

| 按钮尺寸 | xs | sm | md | lg | xl |
|----------|----|----|----|----|----|
| 实际高度 | 22 | 26 | 32 | 40 | 48 |

```html
<c-button primary size="xs">超小按钮</c-button>
<c-button primary size="sm">小号按钮</c-button>
<c-button primary>普通按钮</c-button>
<c-button primary outline size="lg">大号按钮</c-button>
<c-button primary outline size="xl">超大号按钮</c-button>
```

## 加载中

给 `c-button` 设置 `loading` 属性即可将其置为加载中的状态。注意：加载中的按钮并**没有被禁用**，如果需要在加载中状态下禁用按钮的交互行为，需要自行处理。另外，如果按钮设置了图标，在加载中状态下，原有图标会被 loading 图标代替。

```html
<c-button loading>加载中</c-button>
<c-button loading primary outline round>正在提交</c-button>
<c-button danger loading flat>正在删除</c-button>
```

## 按钮组

将几个 `c-button` 放在一个 `c-button-group` 中，可以将他们以「按钮组」的形式展现。通过 `size` 属性也可以控制这一组按钮的尺寸。

```html
<c-button-group size="sm">
  <c-button>加粗</c-button>
  <c-button>斜体</c-button>
  <c-button>下划线</c-button>
</c-button-group>

<c-button-group>
  <c-button outline icon="twitter"></c-button>
  <c-button outline icon="facebook"></c-button>
  <c-button outline icon="github"></c-button>
</c-button-group>

<c-button-group>
  <c-button primary icon="bold"></c-button>
  <c-button primary icon="italic"></c-button>
  <c-button primary icon="repeat"></c-button>
</c-button-group>

<c-button-group>
  <c-button primary outline>A</c-button>
  <c-button primary outline>B</c-button>
  <c-button primary outline>C</c-button>
</c-button-group>

<c-button-group size="lg">
  <c-button danger>A</c-button>
  <c-button danger>B</c-button>
  <c-button danger>C</c-button>
</c-button-group>

<c-button-group size="lg">
  <c-button danger outline>A</c-button>
  <c-button danger outline>B</c-button>
  <c-button danger outline>C</c-button>
</c-button-group>
```

## 属性说明

### `c-button` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| primary | Boolean | false | 是否主要操作按钮(以蓝色显示) |
| success | Boolean | false | 是否正向操作按钮(以绿色显示) |
| warning | Boolean | false | 是否警告操作按钮(以黄色显示) |
| danger | Boolean | false | 是否危险操作按钮(以红色显示) |
| size | String | 'md' | 尺寸，可以取 `xs`、 `sm`、 `md`、 `lg`、 `xl` |
| outline | Boolean | false | 是否线框样式 |
| round | Boolean | false | 是否圆角 |
| icon | String | null | 显示 FontAwesome 图标 |
| loading | Boolean | false | 是否显示 loading 图标 |
| href | String | null | 点击后跳转 URL，依赖 [Vue-Router](https://router.vuejs.org) |

### `c-button-group` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| size | String | 'md' | 尺寸，可以取 `xs`、 `sm`、 `md`、 `lg`、 `xl` |

