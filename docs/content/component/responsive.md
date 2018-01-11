---
title: 响应式设计
layout: component
route: /component/responsive
---

# 响应式设计

为了支持响应式布局，Clair 定义了五种屏幕宽度的媒体，从小到大依次缩写为 `xs`、`sm`、`md`、`lg` 和 `xl`。他们的宽度范围如下表：

| 屏幕大小    | 缩写 | 宽度范围        | 适用设备 |
|-------------|------|-----------------|----------|
| Extra Small | xs   | < 600px         | 手机     |
| Small       | sm   | 600px ~ 960px   | 平板电脑 |
| Medium      | md   | 960px ~ 1200px  | 小屏幕笔记本 |
| Large       | lg   | 1200px ~ 1920px | 大屏笔记本、PC 显示器 |
| Extra Large | xl   | > 1920px        | 4K 电视 |

如果你的项目中需要的屏幕宽度范围和上面的不一样，可以通过[自定义主题](/component/theme)进行修改。

## 响应式栅格

通过 `xs / sm / md / lg /xl` 等属性指定在不同视口宽度下 `c-box-item` 的展示宽度。比如 `xs="3"`，表示在超小屏幕下宽度为 `3/12 = 25%`。

值得注意的是，Clair 提供的响应式方案是**移动优先（Mobile First）**的。这意味着，`xs="3"` 会在所有设备下显示为 `25%`，除非你指定了更大视口下的宽度。比如 `<c-box-item xs="6" lg="3" />` 表示在 Extra Small、Small 及 Medium 的视口下是 50% 宽度，在 Large 及 Extra Large 视口下是 25% 的宽度。

```html
<c-box class="has-text-centered is-size-sm">
  <c-box-item xs="12" sm="6" md="3">
    <div class="is-bg-gray-3">手机独占一行<br>小屏幕占 50%<br>更大屏幕占 25%</div>
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

### 设置偏移

除了宽度之外，Clair 也可以实现在不同设备上显示不同的偏移（offset）。比如，`xs="12 offset-0" lg="10 offset-2"` 表示在大屏上宽度为 10 个栅格，且有 2 个栅格的偏移；小屏上则没有偏移，占满 12 个栅格。

```html
<c-box class="has-text-centered has-leading-xl">
  <c-box-item
    xs="12 offset-0"
    md="10 offset-2"
    class="is-bg-gray-2"
  >
    大屏有左边距，小屏没有
  </c-box-item>
</c-box>
```

### 设置显示方式(display)

在不同的屏幕宽度下，一个元素可以有不同的 `display` 属性。比如 `xs="none" lg="8 block"` 表示小屏幕下完全隐藏，而大屏幕下显示为 `block`，占用 8 个栅格。

```html
<c-box class="has-text-centered has-leading-xl">
  <c-box-item
    xs="none"
    lg="8 block"
    class="is-bg-gray-2"
  >
    大屏显示，小屏隐藏
  </c-box-item>
</c-box>
```

### 设置栅格排列方向

默认情况下，Clair 中的栅格是从左到右排列的，即 `flex-direction: row`。如果你想在小屏幕下让栅格从上到下排列，可以给 `c-box` 设置 `xs="dir-column" sm="dir-row"`。

```html
<c-box
  xs="dir-column"
  sm="dir-row"
  class="has-text-centered is-bg-gray-2"
>
  <c-box-item v-for="i in 4">{{ i }}</c-box-item>
</c-box>
```


### 只针对某一种屏幕尺寸

Mobile First 的策略在某些场景下使用起来没那么方便。你可以使用类似 `md-only` 这样的属性来设置只对 `960 - 1200` 屏幕大小生效的样式。

```html
<c-box class="has-text-centered">
  <c-box-item
    class="is-bg-gray-2"
    md-only="offset-2"
  >
    只有 960-1200 的屏幕有左边距
  </c-box-item>
</c-box>
```

## 自定义样式

考虑到你可能需要针对某类特定尺寸的屏幕写样式，Clair 会在 `html` 标签上添加 `media` 属性来表示当前屏幕大小。比如在手机上，`html` 标签上会有 `media="xs"` 属性。

```html
<p>手机上是红色的文字</p>

<style>
[media=xs] p {
  color: red;
}
</style>
```

## 监听媒体变化

当你需要在 JavaScript 中监听屏幕宽度的范围发生变化时，你可以 watch Vue 示例上的 `$clair.responsive.media` 属性即可。

```html
<p>当前屏幕尺寸：{{ $clair.responsive.media }}</p>
```

