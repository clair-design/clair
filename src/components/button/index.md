---
title: Button 按钮
layout: component
scrollTop: true
route: component/button
---

# Button 按钮

Button 组件提供了不同的按钮风格以及状态、尺寸等选项。

## 按钮风格

```html
<p>
  <c-button>默认按钮</c-button>
  <c-button primary>主操作按钮</c-button>
  <c-button danger>危险按钮</c-button>
  <c-button outline>默认按钮</c-button>
  <c-button outline primary>主操作按钮</c-button>
  <c-button outline danger>危险按钮</c-button>
</p>
<p>
  <c-button round primary>主操作按钮</c-button>
  <c-button round>默认按钮</c-button>
  <c-button round danger>危险按钮</c-button>
  <c-button outline round>默认按钮</c-button>
  <c-button outline round primary>主操作按钮</c-button>
  <c-button outline round danger>危险按钮</c-button>
</p>
<p>
  <c-button primary icon="home" href="/">带链接的按钮</c-button>
  <c-button primary icon="search">图标按钮</c-button>
  <c-button primary icon="sun"></c-button>
  <c-button danger outline round icon="trash"></c-button>
  <c-button flat icon="menu"></c-button>
</p>
```

## 禁用 (disabled) 状态

```html
<c-button disabled>普通按钮</c-button>
<c-button disabled outline>线框按钮</c-button>
<c-button primary disabled>主操作按钮</c-button>
<c-button primary disabled outline>线框主操作按钮</c-button>
<c-button danger disabled>危险按钮</c-button>
<c-button danger disabled outline>危险线框</c-button>
```

## 不同尺寸

```html
<c-button primary size="xs">超小按钮</c-button>
<c-button primary size="sm" icon="settings">设置</c-button>
<c-button primary>Default</c-button>
<c-button primary round outline size="lg">大号按钮</c-button>
<c-button primary round outline size="xl" icon="save"></c-button>
```

## 加载中

```html
<c-button loading>加载中</c-button>
<c-button loading primary outline round>提交</c-button>
<c-button round primary loading outline></c-button>
```

## 按钮组

```html
<c-button-group>
  <c-button>加粗</c-button>
  <c-button>斜体</c-button>
  <c-button>下划线</c-button>
</c-button-group>

<c-button-group>
  <c-button outline icon="twitter"></c-button>
  <c-button outline icon="facebook"></c-button>
  <c-button outline icon="github"></c-button>
</c-button-group>

<c-button-group>
  <c-button primary icon="bold"></c-button>
  <c-button primary icon="italic"></c-button>
  <c-button primary icon="repeat"></c-button>
</c-button-group>

<c-button-group>
  <c-button primary outline>A</c-button>
  <c-button primary outline>B</c-button>
  <c-button primary outline>C</c-button>
</c-button-group>

<c-button-group>
  <c-button danger>A</c-button>
  <c-button danger>B</c-button>
  <c-button danger>C</c-button>
</c-button-group>

<c-button-group>
  <c-button danger outline>A</c-button>
  <c-button danger outline>B</c-button>
  <c-button danger outline>C</c-button>
</c-button-group>
```

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| primary | Boolean | false | 是否主要操作按钮(以蓝色显示) |
| danger | Boolean | false | 是否危险操作按钮(以红色显示) |
| size | String | 'md' | 尺寸，可以取 `xs`、 `sm`、 `md`、 `lg`、 `xl` |
| outline | Boolean | false | 是否线框样式 |
| round | Boolean | false | 是否圆角 |
| icon | String | null | 显示 FontAwesome 图标 |
| loading | Boolean | false | 是否显示 loading 图标 |
| href | String | null | 点击后跳转 URL，依赖 [Vue-Router](https://router.vuejs.org) |

