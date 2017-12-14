---
title: Layout
layout: component
scrollTop: true
route: component/layout
---

# 布局

Clair 提供了基于 FlexBox 的栅格系统，以及一些辅助的 CSS 类来实现复杂的布局。同时，还提供了一套支持 5 种屏幕尺寸的响应式设计系统。

## 布局容器

Clair 中的 `c-container` 是一个有最大宽度限制的容器，用来包裹其中的内容。比如我们要把页面的主体内容展示在最大 960px 的居中的盒子内，就可以使用 `c-container` 来实现。

### 容器大小

通过将其 `size` 属性设置为 `sm`、`md` 或 `lg` 可以给容器的不同的宽度限制。

```html
<div class="is-text-center is-leading-huge is-text-sm">
  <c-container size="sm" class="is-bg-gray-2">小号容器</c-container>
  <c-container size="md" class="is-bg-gray-2">中号容器</c-container>
  <c-container size="lg" class="is-bg-gray-2">大号容器</c-container>
</div>

<style>
  .c-container {
    margin-bottom: 1em
  }
</style>
```

### 容器对齐方式

如上面例子所示，`c-container` 在页面中默认是居中对齐的。你可以通过 `align` 属性将其设置为左对齐或右对齐。

```html
<div class="is-text-center is-leading-huge is-text-sm">
  <c-container size="sm" align="left" class="is-bg-gray-2">左对齐容器</c-container>
  <c-container size="sm" align="right" class="is-bg-gray-2">右对齐容器</c-container>
</div>

<style>
  .c-container {
    margin-bottom: 1em
  }
</style>
```

## 基本栅格布局

Clair 基于 FlexBox 实现了一套 12 栏栅格系统。使用 `c-box` 组件表示一个栅格布局，`c-box-item` 表示栅格中的每一项。

```html
<c-box>
  <c-box-item v-for="i in 3">
    <div class="is-bg-gray-2 is-text-center">column</div>
  </c-box-item>
</c-box>
```

### 设置宽度

默认每一列的宽度都是相等的。如果想自己控制每一列宽度，可以设置 `span` 属性。`span` 属性的值是一个 0 - 12 的数字，表示该列的宽度占 12 份中的比例。

如果想自己要某一列的宽度不自动伸展，而是自适应其内容宽度，可以给这一列添加 `narrow` 属性。另外，你还可以通过 `width` 属性指定某一列的精确宽度值。

```html
<c-box>
  <c-box-item v-for="i in 4" :span="i">
    <div class="is-bg-gray-2 is-text-center">{{ i }}</div>
  </c-box-item>
</c-box>

<c-box class="is-text-center">
  <c-box-item span="4">
    <div class="is-bg-gray-2">4</div>
  </c-box-item>
  <c-box-item>
    <div class="is-bg-gray-2">auto</div>
  </c-box-item>
</c-box>

<c-box class="is-text-center">
  <c-box-item narrow>
    <div class="is-bg-gray-2">宽度自适应内容</div>
  </c-box-item>
  <c-box-item width="150px">
    <div class="is-bg-gray-2">指定 150px</div>
  </c-box-item>
</c-box>

<style>
.c-box {
margin-bottom: 1em
}
</style>
```

### 自动填充高度

给 `c-box` 设置 `fill-height` 属性可以使其填充父容器的高度（父级高度不能是 `auto`）。

```html
<div style="height: 200px">
  <c-box fill-height class="is-bg-red-1" />
</div>
```


### 设置栅格偏移

通过 `offset` 属性可以指定某一列向右的偏移多少格。

```html
<c-box class="is-text-center">
  <c-box-item span="4" offset="1">
    <div class="is-bg-gray-2">宽度 4 offset 1</div>
  </c-box-item>
  <c-box-item offset="2">
    <div class="is-bg-gray-2">宽度自动 offset 2</div>
  </c-box-item>
</c-box>
```

### 设置列间距

相邻列之间默认有 `1em` 的间距，这个值可以通过自定义样式进行全局配置。如果要为某一个栅格指定特定的间距，可以使用 `gap` 属性，属性值可以用 `em`、`px`、`rem`、`%`、`vw` 等做单位。

```html
<c-box gap="4em">
  <c-box-item xs="3" v-for="i in 4"><div class="is-bg-gray-2"></div></c-box-item>
</c-box>
<c-box gap="5%">
  <c-box-item xs="4" v-for="i in 3"><div class="is-bg-gray-2"></div></c-box-item>
</c-box>
<c-box gap="0">
  <c-box-item xs="4" v-for="i in 3"><div class="is-bg-gray-2"></div></c-box-item>
</c-box>

<style>
.c-box {
  margin: 1em 0;
}
.c-box .c-box__item > div {
  min-height: 2em;
}
</style>
```

### 水平方向对齐

在 `c-box` 上使用 `justify` 属性可以控制子元素在水平方向上的对齐方式。它的取值可以是 `start`、`end`、`center`、`space-between` 和 `space-around` 中的一个。

```html
<div class="is-text-center">
  <c-box justify="start">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">start</div>
    </c-box-item>
  </c-box>

  <c-box justify="center">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">center</div>
    </c-box-item>
  </c-box>

  <c-box justify="end">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">end</div>
    </c-box-item>
  </c-box>

  <c-box justify="space-between">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">between</div>
    </c-box-item>
  </c-box>

  <c-box justify="space-around">
    <c-box-item span="2" v-for="i in 3">
      <div class="is-bg-gray-2">around</div>
    </c-box-item>
  </c-box>
</div>

<style>
.c-box {
  margin: 1em 0;
}
</style>
```

### 垂直方向对齐

默认情况下， `c-box` 下的子元素的高度会自动伸展到容器高度。可以使用 `align` 属性可以控制子元素在垂直方向上的对齐方式。它的取值可以是 `start`、`end`、`center`、`stretch` 和 `baseline` 中的一个。

```html
<div class="is-text-center is-text-sm">
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
<c-box class="is-leading-loose is-text-center is-text-sm">
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


## 响应式布局

为了支持响应式布局，Clair 定义了五种屏幕宽度的媒体，从小到大依次缩写为 `xs`、`sm`、`md`、`lg` 和 `xl`。他们的宽度范围如下表：

| 屏幕大小    | 缩写 | 宽度范围        | 适用设备 |
|-------------|------|-----------------|----------|
| Extra Small | xs   | < 600px         | 手机     |
| Small       | sm   | 600px ~ 960px   | 平板电脑 |
| Medium      | md   | 960px ~ 1200px  | 小屏幕笔记本 |
| Large       | lg   | 1200px ~ 1920px | 大屏笔记本、PC 显示器 |
| Extra Large | xl   | > 1920px        | 4K 电视 |

如果你的项目中需要的屏幕宽度范围和上面的不一样，可以通过自定义主题进行修改。

通过 `xs / sm / md / lg /xl` 等属性指定在不同视口宽度下 `c-box-item` 的展示宽度。比如 `xs="3"`，表示在超小屏幕下宽度为 `3/12 = 25%`。

值得注意的是，Clair 提供的响应式方案是**移动优先（Mobile First）**的。这意味着，`xs="3"` 会在所有设备下显示为 `25%`，除非你指定了更大视口下的宽度。比如 `<c-box-item xs="6" lg="3" />` 表示在 Extra Small、Small 及 Medium 的视口下是 50% 宽度，在 Large 及 Extra Large 视口下是 25% 的宽度。

```html
<c-box class="is-text-center is-text-sm">
  <c-box-item xs="12" sm="6" md="3">
    <div class="is-bg-gray-2">手机独占一行<br>小屏幕占 50%<br>更大屏幕占 25%</div>
  </c-box-item>
  <c-box-item xs="12" sm="6" md="9">
    <div class="is-bg-gray-2">手机独占一行<br>小屏幕占 50%<br>更大屏幕占 75%</div>
  </c-box-item>
</c-box>

<style>
.c-box__item > div {
  padding: 1em;
}
</style>
```

### 不同设备，不同样式

除了宽度之外，Clair 也可以实现在不同设备上显示不同的偏移（offset）、可见性、排列方式等样式。

```html
<c-box>
  <c-box-item
    xs="12 offset-0"
    md="6 offset-2"
    class="is-bg-gray-2"
  >
    大屏有左边距，小屏没有
  </c-box-item>

  <c-box-item
    xs="d-none"
    md="3 offset-1 d-block"
    class="is-bg-gray-2"
  >
    大屏显示，小屏隐藏
  </c-box-item>
</c-box>
```

