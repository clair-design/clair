---
title: Input 文本输入框
layout: component
route: /component/input
meta:
  style:
  - cssText: >
      .vue-demo .input-items { margin-bottom: 1em; }
      .vue-demo .input-items inpu { margin-bottom: 1em; }
---

# Input 文本输入框

文本框用来让用户输入单行或多行文字。Clair 为文本输入框提供了不同的状态以及输入校验等功能。

## 文字输入

最简单的使用场景下，只需通过 `v-model` 属性给 `c-input` 绑定一个模型即可。

```html
<c-input v-model="userName" placeholder="请输入用户名" />
<span v-if="userName" class="is-size-sm">Hello {{userName}} !</span>

<script>
  export default {
    data() {
      return {
        userName: 'Clair'
      }
    }
  }
</script>
```

## 改变输入框高度

通过 `size` 属性，你可以对输入框大小进行整体缩放，文字大小、内边距都会随之改变。

```html
<div class="input-items">
  <c-input size="xs" />
  <c-button size="xs" primary>确定</c-button>
</div>
<div class="input-items">
  <c-input size="sm" />
  <c-button size="sm" primary>确定</c-button>
</div>
<div class="input-items">
  <c-input />
  <c-button primary>确定</c-button>
</div>
<div class="input-items">
  <c-input size="lg" />
  <c-button size="lg" primary>确定</c-button>
</div>
<div class="input-items">
  <c-input size="xl" />
  <c-button size="xl" primary>确定</c-button>
</div>
```

## 宽度设置

Clair 中的输入框默认宽度为 `15em`，你可以通过 `width` 属性设置不同宽度的输入框。在下面的例子中，你可以选择不同的 `size` 和 `width` 查看文本输入框的大小：

```html
<template demo-only>
<c-form :size="size">
  <c-form-item label="Size:">
    <c-radio-group
      :options="sizes"
      v-model="size"
      button
    />
  </c-form-item>
  <c-form-item label="Width:">
    <c-radio-group
      :options="widths"
      v-model="width"
      button
    />
  </c-form-item>
  <c-form-item label="输入框:">
    <c-input :size="size" :width="width" />
  </c-form-item>
</c-form>
</template>

<script>
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    .map(w => ({
      label: w,
      value: w
    }))
  const widths = ['shortest', 'shorter', 'short', 'normal', 'long', 'longer', 'longest', 'flexible']
    .map(w => ({
      label: w,
      value: w
    }))
  export default {
    data() {
      return {
        width: 'normal',
        size: 'md',
        sizes,
        widths
      }
    }
  }
</script>
```

## 禁用和只读状态

`disabled` 和 `readonly` 属性分别表示输入框的禁用和只读状态。

```html
<c-input disabled value="我被禁用了" />
<c-input readonly value="我是只读的" />
```

## 多行文本框

类似于 `textarea`，可以通过 `rows` 属性指定显示的高度。

```html
<c-input
  type="textarea"
  multi-line
  :rows="3"
  width="longer"
/>
```

配合 `autosize` 属性，还可以随着输入行数的增加自动调整高度。

```html
<c-input
  type="textarea"
  multi-line
  :autosize="[3, 10]"
  placeholder="多行文本"
  width="longer"
/>
```

## 前置/后置内容

使用 `slot` 可以在输入框前面或后面附加一些内容。

```html
<c-input placeholder="domain">
  <span slot="prepend">http:// </span>
  <span slot="append"> .com</span>
</c-input>
```


## 输入验证

表单验证请参考 [表单组件的「输入验证」](from) 部分。

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| value | String, Number | 无 | 默认值 |
| placeholder | String | 无 | 同 HTML input 元素的 placeholder |
| size | String | md | 输入框整体大小，可以取 `xs`、`sm`、`md`、`lg`、`xl` |
| width | String | normal | 输入框宽度，可以取 `shortest`、`shorter`、`normal`、`long`、`longer` 等 |
| readonly | Boolean | false | 是否只读 |
| disabled | Boolean | false | 是否禁用 |
| multi-line | Boolean | false | 是否可以输入多行文字 |
| autosize | Array | null | `[minRows, maxRows]` 输入多行文字时，是否允许根据内容自动调整高度 |
| wrap | String | 空 | `on` `off` 控制换行 |
| type | String | text | 参考 HTML input 元素的 type 属性 |
| name | String | 无 | 参考 HTML input 元素的 name 属性 |
| rows | Number | 3 | 输入框展示的高度 |
| cols | Number | 60 | 输入框展示的宽度 |
| maxlength | Number | 无 | 最多输入多少字符 |
| rules | Object | 无 | 输入验证规则，详见上面「输入验证」部分 |
