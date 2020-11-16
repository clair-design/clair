---
group: Basic 基础
---

# Badge 徽标数

## 定义

持有少量信息的标签

## 使用场景

提示重要信息当前状态，图标右上角圆点或圆形徽标数字

## 基础样式

最简单的徽标，用于新消息提示。

```html
<template>
  <c-badge :value="9">
    <a href="#" class="example"></a>
  </c-badge>
  <c-badge value="new">
    <a href="#" class="example"></a>
  </c-badge>
</template>

<style scoped>
  .c-badge {
    margin-right: 40px;
  }

  .example {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #eff0f2;
  }
</style>
```

## 最大值样式

设定徽标显示最大值

```html
<template>
  <c-badge :value="24" :max="10">
    <a href="#" class="example"></a>
  </c-badge>
  <c-badge :value="100" :max="99">
    <a href="#" class="example"></a>
  </c-badge>
  <c-badge :value="1000" :max="999">
    <a href="#" class="example"></a>
  </c-badge>
</template>

<style scoped>
  .c-badge {
    margin-right: 40px;
  }

  .example {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #eff0f2;
  }
</style>
```

## 小红点样式

小红点提示新消息

```html
<template>
  <c-badge is-dot :value="9">
    <a href="#" class="example"></a>
  </c-badge>
  <c-badge is-dot :value="33">
    <c-icon-file />
  </c-badge>
  <c-badge is-dot :value="999">
    <a href="#">最新消息</a>
  </c-badge>
</template>

<style scoped>
  .c-badge {
    margin-right: 40px;
    vertical-align: middle;
  }

  .example {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #eff0f2;
  }
</style>
```

## 隐藏和显示

使用 `hidden` 属性将徽标数隐藏。

```html
<template>
  <div class="controls">
    <c-radio-group v-model="hidden">
      <c-radio-button :value="true">隐藏徽标</c-radio-button>
      <c-radio-button :value="false">显示徽标</c-radio-button>
    </c-radio-group>
  </div>
  <c-badge :value="9" :hidden="hidden">
    <a href="#" class="example"></a>
  </c-badge>
  <c-badge is-dot :hidden="hidden">
    <a href="#" class="example"></a>
  </c-badge>
</template>

<script>
  export default {
    data() {
      return { hidden: false }
    }
  }
</script>

<style scoped>
  .controls {
    margin-bottom: 30px;
  }

  .c-badge {
    margin-right: 40px;
  }

  .example {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #eff0f2;
  }
</style>
```

## 自定义色彩

可根据使用场景自定义徽标数的色值

```html
<template>
  <c-badge :value="9" background-color="#F84E44"></c-badge>
  <c-badge :value="9" background-color="#FEA119"></c-badge>
  <c-badge :value="9" background-color="#006BFF"></c-badge>
  <c-badge :value="9" background-color="#52B818"></c-badge>
  <c-badge :value="9" background-color="#C7C7C7"></c-badge>
  <c-badge :value="9" background-color="#F84E44" is-dot></c-badge>
  <c-badge :value="9" background-color="#FEA119" is-dot></c-badge>
  <c-badge :value="9" background-color="#006BFF" is-dot></c-badge>
  <c-badge :value="9" background-color="#52B818" is-dot></c-badge>
  <c-badge :value="9" background-color="#C7C7C7" is-dot></c-badge>
</template>

<style scoped>
  .c-badge {
    margin-right: 40px;
  }
</style>
```

## Props

| Name             | Description                            | Type                 | Required | Default   |
| ---------------- | -------------------------------------- | -------------------- | -------- | --------- |
| value            | 显示值                                 | `string` \| `number` | `false`  | -         |
| max              | 最大显示值，超过 max 值会显示`${max}+` | `number`             | `false`  | -         |
| is-dot           | 小圆点                                 | `boolean`            | `false`  | `false`   |
| hidden           | 隐藏 badge                             | `boolean`            | `false`  | -         |
| background-color | 徽标数背景色                           | `string`             | `false`  | `#F84E44` |
