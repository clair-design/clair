---
title: 文字
layout: component
route: /component/typography
---

# 文本样式

作为视觉表达语言，排版的主要任务是简洁清晰的表明所阐述内容，段落间隔与文字密度起着至关重要的作用。良好的排版规范能大大提升用户的视觉体验，我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。

## 字体 font-family

Clair 默认使用 `Sans-Serif` 无衬线字体，这类字体更简洁，识别性高。

```html
<template demo-only>
<c-box>
  <c-box-item width="15em">
    <h3 class="has-margin-left-lg">中文字体</h3>
    <ul>
      <li>PingFang SC</li>
      <li>Microsoft YaHei</li>
      <li>Hiragino Sans GB</li>
    </ul>
  </c-box-item>
  <c-box-item width="15em">
    <h3 class="has-margin-left-lg">英文字体</h3>
    <ul>
      <li>Segoe UI</li>
      <li>Droid Sans</li>
      <li>Helvetica Neue</li>
    </ul>
  </c-box-item>
</c-box>
</template>
```

## 大小 Sizing

Clair 内置了五种大小的文字，分别在不同的场景下使用。

<table>
  <thead>
    <tr>
      <th>示例</th>
      <th>字体大小</th>
      <th>CSS 类</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><div class="is-size-xxl">标题</div></td>
      <td>28px</td>
      <td>`.is-size-xxl`</td>
    </tr>
    <tr>
      <td><div class="is-size-xl">标题</div></td>
      <td>20px</td>
      <td>`.is-size-xl`</td>
    </tr>
    <tr>
      <td><div class="is-size-lg">小标题</div></td>
      <td>16px</td>
      <td>`.is-size-lg`</td>
    </tr>
    <tr>
      <td><div class="is-size-normal">普通文字</div></td>
      <td>14px</td>
      <td>`.is-size-normal`</td>
    </tr>
    <tr>
      <td><div class="is-size-sm">小号的文字</div></td>
      <td>13px</td>
      <td>`.is-size-sm`</td>
    </tr>
    <tr>
      <td><div class="is-size-xs">超小号的文字</div></td>
      <td>12px</td>
      <td>`.is-size-xs`</td>
    </tr>
    <tr>
      <td><div class="is-size-xxs">最小号的文字</div></td>
      <td>10px</td>
      <td>`.is-size-xxs`</td>
    </tr>
  </tbody>
</table>

## 行高 line-height

Clair 提供了五种行高的大小。对于大多数内容文字来说，1.6 倍的行高更适合阅读。

```html
<template demo-only>
  <c-box gap="2em">
    <c-box-item v-for="type in types" xs-only="12" sm-only="6">
      <h4>.has-leading-{{ type }}</h4>
      <p :class="className(type)" class="is-size-sm">颜色或色彩是通过眼、脑和我们的生活经验所产生的一种对光的视觉效应。</p>
    </c-box-item>
  </c-box>
</template>

<script>
export default {
  data () {
    return {
      types: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  },
  methods: {
    className (type) {
      return [`has-leading-${type}`]
    }
  }
}
</script>
```

## 对齐

使用 CSS 类 `.has-text-left`、`.has-text-right`、`.has-text-centered` 和 `.has-text-justified` 分别控制文本左对齐、右对齐、居中对齐和两端对齐。

## 文字粗细

使用 CSS 类 `.has-weight-bold`、`.has-weight-normal` 和 `.has-weight-light` 分别控制文本以粗体、正常和纤细展示。


