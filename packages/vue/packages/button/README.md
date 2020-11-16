---
group: Basic 基础
---

# Button 按钮

## 定义

按钮一般用于操作或者跳转的功能触发，主要形式有文字按钮、链接文字、图标快捷入口。

## 使用场景

用在需要跳转的页面，需要点击触发弹出框，用在某些需要点击关闭弹出框等场景，在按钮区域内，一般不建议使用图标+文字的按钮。 对于不同的操作，一般不要在单个页面上使用多个主页级的操作，按钮组不能使用在页面级的主操作中。

## 基础样式

按钮有五种类型：主要按钮、次要按钮、警示按钮、危险按钮。

```html
<div class="stage-btn-types">
  <c-button type="primary">主要按钮</c-button>
  <c-button type="default">次要按钮</c-button>
  <c-button type="success">成功按钮</c-button>
  <c-button type="warning">警示按钮</c-button>
  <c-button type="danger">危险按钮</c-button>
  <c-button type="ghost">幽灵按钮</c-button>
</div>

<style scoped>
  .stage-btn-types .c-button + .c-button {
    margin-left: 20px;
  }
</style>
```

## 禁用样式

按钮不可用状态。

```html
<template>
  <div class="disabled-buttons">
    <c-button type="primary" disabled>主要按钮</c-button>
    <c-button disabled>默认按钮</c-button>
    <c-button type="success" disabled>成功按钮</c-button>
    <c-button type="warning" disabled>警告按钮</c-button>
    <c-button type="danger" disabled>危险按钮</c-button>
    <c-button type="ghost" disabled>幽灵按钮</c-button>
  </div>
</template>

<style scoped>
  .disabled-buttons .c-button + .c-button {
    margin-left: 20px;
  }
</style>
```

## 带图标按钮

按钮中可以嵌套图标组件，实现图标按钮。

```html
<div class="stage-btn-types">
  <c-button type="primary">
    <c-icon-home :style="iconStyle" />
    图标按钮
  </c-button>
  <c-button type="primary" disabled>
    <c-icon-spin :style="iconStyle" />
    加载中...
  </c-button>
  <c-button type="default">
    <c-icon-setting :style="iconStyle" />
    图标按钮
  </c-button>
  <c-button type="primary" :style="buttonStyle">
    <c-icon-search :style="iconStyle" />
  </c-button>
</div>

<script>
  export default {
    data() {
      return {
        iconStyle: {
          strokeWidth: '1px',
          verticalAlign: '-0.15em'
        },
        buttonStyle: {
          minWidth: 0,
          width: '32px',
          padding: 0,
          borderRadius: '100%'
        }
      }
    }
  }
</script>

<style scoped>
  .stage-btn-types .c-button + .c-button {
    margin-left: 20px;
  }
</style>
```

## 按钮组合

多个按钮形成一个按钮组，常用于多项类似操作。

```html
<c-button-group>
  <c-button>加粗</c-button>
  <c-button>斜体</c-button>
  <c-button disabled>下划线</c-button>
</c-button-group>

<c-button-group>
  <c-button type="primary">上一页</c-button>
  <c-button type="primary">下一页</c-button>
</c-button-group>

<style scoped>
  .c-button-group + .c-button-group {
    margin-left: 30px;
  }
</style>
```

## 不同尺寸

通过 `size` 属性可以设置按钮的尺寸。它的值可以是 `large`、`normal` 和 `small` 三种，默认为 `normal`。

```html
<div class="stage-btn-sizes">
  <c-button type="primary" size="large">大型按钮</c-button>
  <c-button type="primary" size="normal">默认按钮</c-button>
  <c-button type="primary" size="small">小型按钮</c-button>
</div>

<script>
  export default {}
</script>

<style scoped>
  .stage-btn-sizes > .c-button {
    vertical-align: bottom;
    margin-right: 20px;
  }
</style>
```

## Block 按钮

其属性将按钮适合其父宽度

```html
<div class="stage-btn-block">
  <c-button block type="primary">主要按钮</c-button>
  <c-button block type="default">次要按钮</c-button>
  <c-button block type="success">成功按钮</c-button>
  <c-button block type="warning">警示按钮</c-button>
  <c-button block type="danger">危险按钮</c-button>
</div>

<style scoped>
  .stage-btn-block .c-button + .c-button {
    margin-top: 20px;
  }
</style>
```

## 设置 `<button>` 原生 `type` 属性

通过 `html-type` 属性可以设置 `<button>` 原生的 `type` 属性。可选值: `button`、`submit` 和 `reset`。

```html
<form>
  <c-input name="message" v-model="msg" />
  <c-button html-type="reset" type="default">重置</c-button>
  <c-button html-type="submit" type="primary" @click.native.prevent="onSubmit">
    提交
  </c-button>
</form>

<script>
  export default {
    data() {
      return { msg: 'Hello World' }
    },
    methods: {
      onSubmit() {
        this.$message({
          type: 'success',
          message: '提交成功！'
        })
      }
    }
  }
</script>

<style>
  .c-button {
    margin-left: 10px;
  }
</style>
```

## Props

| Name     | Description        | Type                                                                                | Required | Default     |
| -------- | ------------------ | ----------------------------------------------------------------------------------- | -------- | ----------- |
| type     | 按钮类型           | `'primary'` \| `'success'` \| `'default'` \| `'warning'` \| `'danger'` \| `'ghost'` | `false`  | `'default'` |
| size     | 按钮尺寸           | `'large'` \| `'normal'` \| `'small'`                                                | `false`  | `'normal'`  |
| htmlType | 原生`<button>`类型 | `'button'` \| `'reset'` \| `'submit'`                                               | `false`  | `'button'`  |
| disabled | 是否禁用           | `boolean`                                                                           | `false`  | `false`     |
| loading  | 加载中             | `boolean`                                                                           | `false`  | `false`     |
| block    | 自适应父级元素宽度 | `boolean`                                                                           | `false`  | `false`     |

## Events

目前只支持 `click` 事件。如需绑定其他类型的事件，请使用 `.native` 修饰符，如 `@focus.native`。

## Slots

可以随意嵌套，只要符合 HTML `<button>` 相关规范即可。

## Methods

无。
