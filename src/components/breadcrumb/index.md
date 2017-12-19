---
title: Breadcrumb
layout: component
scrollTop: true
route: component/breadcrumb
---

# Breadcrumb

## 基本用法

```html
<c-breadcrumb>
  <c-breadcrumb-item><a href="#">首页</a></c-breadcrumb-item>
  <c-breadcrumb-item><a href="#">个人信息</a></c-breadcrumb-item>
  <c-breadcrumb-item>修改密码</c-breadcrumb-item>
</c-breadcrumb>
```

## 自定义分隔符

```html
<c-breadcrumb divider="▹">
  <c-breadcrumb-item><a href="#">首页</a></c-breadcrumb-item>
  <c-breadcrumb-item><a href="#">个人信息</a></c-breadcrumb-item>
  <c-breadcrumb-item>修改密码</c-breadcrumb-item>
</c-breadcrumb>
```

### 使用 slot 自定义分隔符

```html
<template>
  <c-breadcrumb>
    <template slot="divider" slot-scope="props">
      <c-icon name="angle-right" type="fa" />
    </template>
    <c-breadcrumb-item><a href="#">首页</a></c-breadcrumb-item>
    <c-breadcrumb-item><a href="#">个人信息</a></c-breadcrumb-item>
    <c-breadcrumb-item>修改密码</c-breadcrumb-item>
  </c-breadcrumb>
</template>
```
