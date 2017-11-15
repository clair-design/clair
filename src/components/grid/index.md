---
title: Grid
layout: component
scrollTop: true
route: component/grid
---

# 布局

Clair 提供了基于 FlexBox 实现的 12 栅格布局系统，同时提供一些配置项，让你灵活地实现对齐、偏移、排序等。它还是一个支持 5 种屏幕尺寸的响应式设计系统。

## 视口大小的分类

| 视口大小    | 缩写 | 像素         |
|-------------|------|--------------|
| Extra Small | xs   | < 600px      |
| Small       | sm   | < 960px      |
| Medium      | md   | < 1200px     |
| Large       | lg   | < 1920px     |
| Extra Large | xl   | > 1920px     |

如果你的项目中需要的视口宽度范围和上面的不一样，可以通过下面的方式进行修改：

```javascript
Vue.prototype.$clair.breakpoints = [
  { name: 'xs', width: 600 },
  { name: 'sm', width: 960 },
  { name: 'md', width: 1200 },
  { name: 'lg', width: 1920 },
  { name: 'xl', width: Infinity }
]
```

## 基本栅格

使用 `c-box` 和 `c-box-item` 分别表示布局容器及其子元素。可以通过 `xs / sm / md / lg /xl` 等属性指定在不同视口宽度下 `c-box-item` 的展示宽度。比如 `xs="3"`，表示在超小屏幕下宽度为 `3/12 = 25%`。

值得注意的是，我们提供的响应式方案是**移动优先（Mobile First）**的。这意味着，`xs="3"` 会在所有视口下显示为 `25%`，除非你指定了更大视口下的宽度。比如 `<c-box-item xs="6" lg="3" />` 表示在 Extra Small、Small 及 Medium 的视口下是 50% 宽度，在 Large 及 Extra Large 视口下是 25% 的宽度。

```html
<c-box class="is-text-align-center">
  <c-box-item v-for="i in 12" xs="1"><div class="is-bg-light-gray">1</div></c-box-item>
</c-box>
<c-box>
  <c-box-item v-for="i in 4" xs="3"><div class="is-bg-light-gray">3</div></c-box-item>
</c-box>
<c-box>
  <c-box-item xs="4"><div class="is-bg-gray">4</div></c-box-item>
  <c-box-item xs="8"><div class="is-bg-gray">8</div></c-box-item>
</c-box>
<c-box>
  <c-box-item xs="5"><div class="is-bg-gray">5</div></c-box-item>
  <c-box-item xs="flex"><div class="is-bg-gray">flex</div></c-box-item>
</c-box>
<c-box>
  <c-box-item xs="auto"><div class="is-bg-gray">auto</div></c-box-item>
  <c-box-item xs="auto"><div class="is-bg-gray">auto</div></c-box-item>
</c-box>

<style>
.c-box {
  margin: 1em 0;
}
</style>
```

## 偏移

你可以使用 `offset` 将一个 `c-box-item` 向右进行移动。

```html
<c-box>
  <c-box-item xs="4 offset-4"><div class="is-bg-gray">4 offset-4</div></c-box-item>
  <c-box-item xs="4"><div class="is-bg-gray">4</div></c-box-item>
</c-box>
<c-box>
  <c-box-item xs="8"><div class="is-bg-gray">8</div></c-box-item>
  <c-box-item xs="3 offset-1"><div class="is-bg-gray">3 offset-1</div></c-box-item>
</c-box>

<style>
.c-box {
  margin: 1em 0;
}
.bg-gray {
  border-radius: 3px;
  background: #ddd;
  text-align: center;
}
</style>
```

## 响应式

分别使用 `xs`、`sm`、`md`、`lg` 和 `xl` 属性来指定不同视口大小下元素的宽度、偏移、对齐等。

```html
<c-box>
  <c-box-item xs="12" sm="6" md="3">
    <div class="is-bg-gray">手机独占一行<br>小屏幕占 50%<br>更大屏幕占 25%</div>
  </c-box-item>
  <c-box-item xs="12" sm="6" md="9">
    <div class="is-bg-gray">手机独占一行<br>小屏幕占 50%<br>更大屏幕占 75%</div>
  </c-box-item>
</c-box>

<style>
.c-box {
  margin: 1em 0;
}
.c-box__item {
  margin-bottom: 1em;
}
.bg-gray {
  padding: 0.5em;
  border-radius: 3px;
  background: #ddd;
  text-align: center;
  font-size: 75%;
}
</style>
```

## 间距

栅格之间默认有 `1em` 的间距，这个值可以通过自定义样式进行全局配置。如果要为某一个栅格指定特定的间距，可以使用 `gap` 属性，属性值可以用 `em`、`px`、`rem`、`%`、`vw` 等做单位。

```html
<c-box gap="4em">
  <c-box-item xs="3"><div class="is-bg-blue"></div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-green"></div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-pink-purple"></div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-red"></div></c-box-item>
</c-box>
<c-box gap="5%">
  <c-box-item xs="4"><div class="is-bg-blue"></div></c-box-item>
  <c-box-item xs="4"><div class="is-bg-green"></div></c-box-item>
  <c-box-item xs="4"><div class="is-bg-pink-purple"></div></c-box-item>
</c-box>
<c-box gap="0">
  <c-box-item xs="4"><div class="is-bg-blue"></div></c-box-item>
  <c-box-item xs="4"><div class="is-bg-green"></div></c-box-item>
  <c-box-item xs="4"><div class="is-bg-pink-purple"></div></c-box-item>
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

## 水平方向对齐

在 `c-box` 上使用 `justify` 属性可以控制子元素在水平方向上的对齐方式。它的取值可以是 `start`、`end`、`center`、`space-between` 和 `space-around` 中的一个。

```html
<c-box justify="start">
  <c-box-item xs="3"><div class="is-bg-blue is-text-white is-text-align-center">start</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-blue is-text-white is-text-align-center">start</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-blue is-text-white is-text-align-center">start</div></c-box-item>
</c-box>

<c-box justify="center">
  <c-box-item xs="3"><div class="is-bg-green is-text-white is-text-align-center">center</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-green is-text-white is-text-align-center">center</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-green is-text-white is-text-align-center">center</div></c-box-item>
</c-box>

<c-box justify="end">
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">end</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">end</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">end</div></c-box-item>
</c-box>

<c-box justify="space-between">
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">space-between</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">space-between</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">space-between</div></c-box-item>
</c-box>

<c-box justify="space-around">
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">space-around</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">space-around</div></c-box-item>
  <c-box-item xs="3"><div class="is-bg-yellow is-text-white is-text-align-center">space-around</div></c-box-item>
</c-box>

<style>
.c-box {
  margin: 1em 0;
}
</style>
```

## 垂直方向对齐

默认情况下， `c-box` 下的子元素的高度会自动伸展到容器高度。可以使用 `align` 属性可以控制子元素在垂直方向上的对齐方式。它的取值可以是 `start`、`end`、`center`、`stretch` 和 `baseline` 中的一个。

```html
<c-box>
  <c-box-item xs="4" class="is-bg-blue is-text-white is-text-align-center">default</c-box-item>
  <c-box-item xs="4" class="is-bg-green is-text-white is-text-align-center large">default</c-box-item>
  <c-box-item xs="4" class="is-bg-yellow is-text-white is-text-align-center x-large">default</c-box-item>
</c-box>
<c-box align="start">
  <c-box-item xs="4" class="is-bg-blue is-text-white is-text-align-center">start</c-box-item>
  <c-box-item xs="4" class="is-bg-green is-text-white is-text-align-center large">start</c-box-item>
  <c-box-item xs="4" class="is-bg-yellow is-text-white is-text-align-center x-large">start</c-box-item>
</c-box>

<c-box align="center">
  <c-box-item xs="4" class="is-bg-blue is-text-white is-text-align-center">center</c-box-item>
  <c-box-item xs="4" class="is-bg-green is-text-white is-text-align-center large">center</c-box-item>
  <c-box-item xs="4" class="is-bg-yellow is-text-white is-text-align-center x-large">center</c-box-item>
</c-box>

<c-box align="end">
  <c-box-item xs="4" class="is-bg-blue is-text-white is-text-align-center">end</c-box-item>
  <c-box-item xs="4" class="is-bg-green is-text-white is-text-align-center large">end</c-box-item>
  <c-box-item xs="4" class="is-bg-yellow is-text-white is-text-align-center x-large">end</c-box-item>
</c-box>

<c-box align="baseline">
  <c-box-item xs="4" class="is-bg-blue is-text-white is-text-align-center">baseline</c-box-item>
  <c-box-item xs="4" class="is-bg-green is-text-white is-text-align-center large">baseline</c-box-item>
  <c-box-item xs="4" class="is-bg-yellow is-text-white is-text-align-center x-large">baseline</c-box-item>
</c-box>

<style>
.c-box {
  background: #f0f0f0;
  margin-top: 1em;
}
</style>
```

## 排序

`c-box` 中的元素默认按照 DOM 中出现的顺序从左到右排列。可以通过设置 `order` 属性，让子元素按照指定顺序排列。

```html
<c-box>
  <c-box-item order="4" class="is-bg-blue is-text-white is-text-align-center">a order-4</c-box-item>
  <c-box-item order="3" class="is-bg-green is-text-white is-text-align-center">b order-3</c-box-item>
  <c-box-item order="2" class="is-bg-yellow is-text-white is-text-align-center">c order-2</c-box-item>
  <c-box-item order="1" class="is-bg-red is-text-white is-text-align-center">d order-1</c-box-item>
</c-box>
```

