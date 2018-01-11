---
title: CSS 工具类
layout: component
route: /component/helper
---

# CSS 工具类

Clair 提供了一些 CSS 工具类，让你方便地修改元素样式。这些 CSS 类一般以 `.is-` 或 `.has-` 开头。

## 文本类

文字的颜色和背景颜色，可以参考 [颜色](/component/color)。字体大小、行高和对齐方式，请参考 [文本样式](/component/typography)。

## 留白设置

你可以使用 CSS 工具类设置一个元素的 `margin` 或 `padding` 的值。在 Clair 中，有 6 种规格的留白：

| 规格     | none | xs  | sm  | md   | lg   | xl   |
|----------|------|-----|-----|------|------|------|
| 实际尺寸 | 0    | 4px | 8px | 16px | 32px | 64px |

在使用时，.has-margin-sm 表示 `margin: 8px`；而 .has-padding-left-none 表示 `padding-left: 0`，以此类推。

## display 设置

通过 CSS 工具类快捷地设置元素的 display 属性。比如 .is-block 表示 `display: block`。

| CSS 类  | 具体样式 |
|----------|------|
| .is-none  | display: none |
| .is-block  | display: block |
| .is-inline-block  | display: inline-block |
| .is-flex  | display: flex |
| .is-inline  | display: inline |
