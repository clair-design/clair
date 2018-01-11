---
title: Toolbar
layout: component
route: /component/toolbar
---

# Toolbar

## 基本用法

```html
<c-toolbar class="is-size-sm" height="4em">
  <c-toolbar-item>
    <a href="#"><c-icon name="menu" valign="middle" /></a>
  </c-toolbar-item>
  <c-toolbar-item flex>
    <div class="is-size-lg">App Name</div>
  </c-toolbar-item>
  <c-toolbar-item>
    <div>您好，用户！</div>
    <c-button icon="log-out">退出</c-button>
  </c-toolbar-item>
</c-toolbar>
```

## 颜色

```html
<c-toolbar primary height="4em">
  <c-toolbar-item>
    <a href="#"><c-icon name="menu" valign="middle" /></a>
  </c-toolbar-item>
  <c-toolbar-item flex>
    <div class="is-size-lg">App Name</div>
  </c-toolbar-item>
  <c-toolbar-item>
    <div>您好，用户！</div>
    <c-button icon="log-out">退出</c-button>
  </c-toolbar-item>
</c-toolbar>
```
