---
title: Layout
layout: component
route: /component/layout
---

# 布局

Clair 提供了基于 FlexBox 的栅格系统，以及一些辅助的 CSS 类来实现复杂的布局。同时，还提供了一套支持 5 种屏幕尺寸的响应式设计系统。

## 布局容器

Clair 中的 `c-container` 是一个有最大宽度限制的容器，用来包裹其中的内容。比如我们要把页面的主体内容展示在最大 960px 的居中的盒子内，就可以使用 `c-container` 来实现。

### 容器大小

通过将其 `size` 属性设置为 `sm`、`md` 或 `lg` 可以给容器的不同的宽度限制。

```html
<div class="has-text-centered has-leading-xl">
  <c-container size="sm" class="is-bg-gray-2">小号容器</c-container>
  <c-container size="md" class="is-bg-gray-2">中号容器</c-container>
  <c-container size="lg" class="is-bg-gray-2">大号容器</c-container>
</div>
```

### 容器对齐方式

如上面例子所示，`c-container` 在页面中默认是居中对齐的。你可以通过 `align` 属性将其设置为左对齐或右对齐。

```html
<div class="has-text-centered has-leading-xl is-size-sm">
  <c-container size="sm" align="left" class="is-bg-gray-2">左对齐容器</c-container>
  <c-container size="sm" align="right" class="is-bg-gray-2">右对齐容器</c-container>
</div>
```

## 基本栅格布局

Clair 基于 FlexBox 实现了一套 12 栏栅格系统。使用 `c-box` 组件表示一个栅格布局，`c-box-item` 表示栅格中的每一项。

```html
<c-box class="has-text-centered">
  <c-box-item class="is-bg-gray-2">column 1</c-box-item>
  <c-box-item class="is-bg-gray-3">column 2</c-box-item>
  <c-box-item class="is-bg-gray-4">column 3</c-box-item>
</c-box>
```

### 设置宽度

默认每一列的宽度都是相等的。如果想自己控制每一列宽度，可以设置 `span` 属性。`span` 属性的值是一个 0 - 12 的数字，表示该列的宽度占 12 份中的比例。

如果想自己要某一列的宽度不自动伸展，而是自适应其内容宽度，可以给这一列添加 `narrow` 属性。另外，你还可以通过 `width` 属性指定某一列的精确宽度值。

```html
<c-box class="has-text-centered has-margin-bottom-md">
  <c-box-item class="is-bg-gray-2" span="1">1</c-box-item>
  <c-box-item class="is-bg-gray-3" span="2">2</c-box-item>
  <c-box-item class="is-bg-gray-4" span="3">3</c-box-item>
  <c-box-item class="is-bg-gray-5" span="4">4</c-box-item>
</c-box>

<c-box class="has-text-centered has-margin-bottom-md">
  <c-box-item class="is-bg-gray-2" span="3">3</c-box-item>
  <c-box-item class="is-bg-gray-3">auto</c-box-item>
</c-box>

<c-box class="has-text-centered has-margin-bottom-md">
  <c-box-item class="is-bg-gray-2" narrow>宽度自适应内容</c-box-item>
  <c-box-item class="is-bg-gray-3" width="150px">指定 150px</c-box-item>
</c-box>
```

### 自动填充高度

给 `c-box` 设置 `fill-height` 属性可以使其填充父容器的高度（父级高度不能是 `auto`）。

```html
<div style="height: 200px">
  <c-box fill-height class="is-bg-gray-2" />
</div>
```


### 设置栅格偏移

通过 `offset` 属性可以指定某一列向右的偏移多少格。

```html
<c-box class="has-text-centered">
  <c-box-item span="4" offset="1" class="is-bg-gray-2">宽度 4 offset 1</c-box-item>
  <c-box-item offset="2" class="is-bg-gray-2">宽度自动 offset 2</c-box-item>
</c-box>
```

### 设置列间距

相邻列之间默认没有间距，你可以通过自定义样式进行设置全局的栅格间距。如果要为某一个栅格指定特定的间距，可以使用 `gap` 属性，属性值可以用 `em`、`px`、`rem`、`%`、`vw` 等做单位。

```html
<c-box gap="4em" class="has-margin-bottom-md has-text-centered">
  <c-box-item xs="3" v-for="i in 4"><div class="is-bg-gray-2">4em gap</div></c-box-item>
</c-box>
<c-box gap="5%" class="has-margin-bottom-md has-text-centered">
  <c-box-item xs="4" v-for="i in 3"><div class="is-bg-gray-2">5% gap</div></c-box-item>
</c-box>
<c-box gap="24px" class="has-margin-bottom-md has-text-centered">
  <c-box-item xs="4" v-for="i in 3"><div class="is-bg-gray-2">24px gap</div></c-box-item>
</c-box>
```

### 水平方向对齐

在 `c-box` 上使用 `justify` 属性可以控制子元素在水平方向上的对齐方式。它的取值可以是 `start`、`end`、`center`、`space-between` 和 `space-around` 中的一个。

```html
<div class="has-text-centered">
  <c-box justify="start" class="has-margin-bottom-md">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">start</div>
    </c-box-item>
  </c-box>

  <c-box justify="center" class="has-margin-bottom-md">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">center</div>
    </c-box-item>
  </c-box>

  <c-box justify="end" class="has-margin-bottom-md">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">end</div>
    </c-box-item>
  </c-box>

  <c-box justify="space-between" class="has-margin-bottom-md">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">between</div>
    </c-box-item>
  </c-box>

  <c-box justify="space-around" class="has-margin-bottom-md">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">around</div>
    </c-box-item>
  </c-box>
</div>
```

### 垂直方向对齐

默认情况下， `c-box` 下的子元素的高度会自动伸展到容器高度。可以使用 `align` 属性可以控制子元素在垂直方向上的对齐方式。它的取值可以是 `start`、`end`、`center`、`stretch` 和 `baseline` 中的一个。

```html
<div class="has-text-centered is-size-sm">
  <c-box align="start">
    <c-box-item
      v-for="i in 3"
      span="4"
      :style="{lineHeight: i * 2}"
    >
      <div class="is-bg-gray-2">start</div>
    </c-box-item>
  </c-box>

  <c-box align="center">
    <c-box-item
      v-for="i in 3"
      span="4"
      :style="{lineHeight: i * 2}"
    >
      <div class="is-bg-gray-2">center</div>
    </c-box-item>
  </c-box>

  <c-box align="end">
    <c-box-item
      v-for="i in 3"
      span="4"
      :style="{lineHeight: i * 2}"
    >
      <div class="is-bg-gray-2">end</div>
    </c-box-item>
  </c-box>
</div>

<style>
.c-box {
  margin-bottom: 2em;
}
</style>
```

### 列排序

`c-box` 中的列默认按照 DOM 中出现的顺序从左到右排列。可以设置 `order` 属性，让各列按照指定顺序排列。

```html
<c-box class="is-leading-loose has-text-centered is-size-sm">
  <c-box-item order=4>
    <div class="is-bg-gray-2">a order-4</div>
  </c-box-item>
  <c-box-item order=3>
    <div class="is-bg-gray-2">b order-3</div>
  </c-box-item>
  <c-box-item order=2>
    <div class="is-bg-gray-2">c order-2</div>
  </c-box-item>
  <c-box-item order=1>
    <div class="is-bg-gray-2">d order-1</div>
  </c-box-item>
</c-box>
```

## 响应式栅格

请参考 [响应式设计](/component/responsive)

## 属性说明

### `c-box` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| gap | String | 0 | 栅格之间的间距，可以取CSS中有效的长度，比如 `24px`、`5%` |
| justify | String | flex-start | 控制子元素在水平方向上的对齐方式，取值参考 [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |
| align | String | stretch | 控制子元素在垂直方向上的对齐方式，取值参考 [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |
| fillHeight | Boolean | false | 是否填满父容器高度 |

### `c-box-item` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| span | Number | 无 | 指定该列所占栅格数，取0-12 |
| width | String | 无 | 指定该列的宽度，可以取 CSS 中的有效长度，比如 `200px`、`40em` |
| offset | Number | 无 | 指定该列向右移动几个栅格，可以取0-12 |
| narrow | Boolean | false | 指定该列宽度是否随内容自适应 |

### 响应式设计相关属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| xs | String | 无 | 在 `xs` 及以上屏幕时的样式设置 |
| sm | String | 无 | 在 `sm` 及以上屏幕时的样式设置 |
| md | String | 无 | 在 `md` 及以上屏幕时的样式设置 |
| lg | String | 无 | 在 `lg` 及以上屏幕时的样式设置 |
| xl | String | 无 | 在 `xl` 屏幕时的样式设置 |
| xs-only | String | 无 | 仅在 `xs` 屏幕上生效的样式设置 |
| sm-only | String | 无 | 仅在 `sm` 屏幕上生效的样式设置 |
| md-only | String | 无 | 仅在 `md` 屏幕上生效的样式设置 |
| lg-only | String | 无 | 仅在 `lg` 屏幕上生效的样式设置 |
| xl-only | String | 无 | 仅在 `xl` 屏幕上生效的样式设置 |
