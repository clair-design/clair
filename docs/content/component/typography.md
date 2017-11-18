---
title: 文字
layout: component
scrollTop: true
route: component/typography
---

# 文本样式

作为视觉表达语言，排版的主要任务是简洁清晰的表明所阐述内容，段落间隔与文字密度起着至关重要的作用。良好的排版规范能大大提升用户的视觉体验，我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。

## 字体 font-family

Clair 默认使用 `Sans-Serif` 无衬线字体，这类字体更简洁，识别性高。

### 中文字体

* PingFang SC
* Microsoft YaHei
* Hiragino Sans GB

### 英文字体

* Sogoe UI
* Droid Sans
* Helvetica Neue

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
      <td><div class="is-text-xxl">标题</div></td>
      <td>36px</td>
      <td>`.is-text-xxl`</td>
    </tr>
    <tr>
      <td><div class="is-text-xl">标题</div></td>
      <td>24px</td>
      <td>`.is-text-xl`</td>
    </tr>
    <tr>
      <td><div class="is-text-lg">小标题</div></td>
      <td>18px</td>
      <td>`.is-text-lg`</td>
    </tr>
    <tr>
      <td><div class="is-text-normal">普通文字</div></td>
      <td>16px</td>
      <td>`.is-text-normal`</td>
    </tr>
    <tr>
      <td><div class="is-text-sm">小号的文字</div></td>
      <td>14px</td>
      <td>`.is-text-sm`</td>
    </tr>
    <tr>
      <td><div class="is-text-xs">超小号的文字</div></td>
      <td>13px</td>
      <td>`.is-text-xs`</td>
    </tr>
    <tr>
      <td><div class="is-text-xxs">最小号的文字</div></td>
      <td>12px</td>
      <td>`.is-text-xxs`</td>
    </tr>
  </tbody>
</table>

## 行高 line-height

Clair 提供了五种行高的大小。对于大多数内容文字来说，1.6 倍的行高更适合阅读。

```html
<c-box>
  <c-box-item v-for="type in types" xs-only="12" sm-only="6">
    <h4>.is-leading-{{ type }}</h4>
    <p :class="className(type)" class="is-text-sm">颜色或色彩是通过眼、脑和我们的生活经验所产生的一种对光的视觉效应。</p>
  </c-box-item>
</c-box>

<script>
export default {
  data () {
    return {
      types: ['none', 'tight', 'normal', 'loose', 'huge']
    }
  },
  methods: {
    className (type) {
      return [`is-leading-${type}`]
    }
  }
}
</script>
```

## 对齐

使用 CSS 类 `.is-text-left`、`.is-text-center` 和 `.is-text-right` 分别控制文本左对齐、居中和右对齐。

## 文字粗细

使用 CSS 类 `.is-weight-bold`、`.is-text-normal` 和 `.is-text-light` 分别控制文本以粗体、正常和纤细展示。


