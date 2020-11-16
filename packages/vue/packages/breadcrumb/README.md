---
group: Navigation 导航
---

# Breadcrumb 面包屑

## 定义

显示当前页面在系统层级结构中的位置，并能向上返回。

## 使用场景

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 基础样式

最简单的用法。

```html
<template>
  <div>
    <c-breadcrumb>
      <c-breadcrumb-item><a href="/">首页</a></c-breadcrumb-item>
      <c-breadcrumb-item to="/vue/breadcrumb" replace>
        数据模型
      </c-breadcrumb-item>
      <c-breadcrumb-item>数据展示</c-breadcrumb-item>
    </c-breadcrumb>
  </div>
</template>
```

## 自定义分隔符

使用 `separator` 属性可以自定义分隔符，或者使用 `slot="separator"` 自定义更复杂的分隔符。

```html
<template>
  <div>
    <c-breadcrumb>
      <c-icon-arrow-right slot="separator" class="seperator" />
      <c-breadcrumb-item to="/">首页</c-breadcrumb-item>
      <c-breadcrumb-item to="/">数据模型</c-breadcrumb-item>
      <c-breadcrumb-item>数据展示</c-breadcrumb-item>
    </c-breadcrumb>
  </div>
</template>

<style scoped>
  .seperator {
    font-size: 12px;
  }
</style>
```

## 带图标的样式

图标在文字前面。

```html
<template>
  <div>
    <c-breadcrumb>
      <c-breadcrumb-item to="/">
        <c-icon-home />
        <span>首页</span>
      </c-breadcrumb-item>
      <c-breadcrumb-item to="/vue/breadcrumb" replace>
        数据模型
      </c-breadcrumb-item>
      <c-breadcrumb-item>数据展示</c-breadcrumb-item>
    </c-breadcrumb>
  </div>
</template>
```

## Props

| Name      | Description | Type     | Required | Default |
| --------- | ----------- | -------- | -------- | ------- |
| separator | 分隔符      | `string` | `false`  | `'/'`   |

## Slots

| Name      | Description                          |
| --------- | ------------------------------------ |
| separator | 分隔符，优先级高于 `props.separator` |

## BreadcrumbItem Props

需要与 vue-router 结合使用。

| Name    | Description                                                              | Type                 | Required | Default |
| ------- | ------------------------------------------------------------------------ | -------------------- | -------- | ------- |
| to      | 路由跳转对象，同  vue-router  的 `to`                                    | `string` \| `object` | `false`  | -       |
| replace | 在使用 `to` 进行路由跳转时，启用 `replace` 将不会向 `history` 添加新记录 | `boolean`            | `false`  | `false` |
