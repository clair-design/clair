---
title: Menu 导航菜单
layout: component
route: /component/menu
---

# Menu

```html
<template>
  <c-menu mode="horizontal">
    <c-menu-item @click.native="onMenuClick">
      <a href="#"><c-icon name="home" type="fa" />首页</a>
    </c-menu-item>
    <c-menu-item active>
      <a href="#"><c-icon name="cogs" type="fa" />设置</a>
    </c-menu-item>
    <c-submenu>
      <template slot="title">
        <c-icon name="share-alt" type="fa" /> 分享
      </template>
      <c-menu-item>
        <a href="#"><c-icon name="weibo" type="fa" />分享到微博</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="wechat" type="fa" />分享到微信</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="twitter" type="fa" />分享到 Twitter</a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>

<script>
export default {
  methods: {
    onMenuClick (e) {
      console.log(e)
    }
  }
}
</script>
```

## 深色主题

```html
<template>
  <c-menu mode="horizontal" theme="dark">
    <c-menu-item>
      <a href="#"><c-icon name="home" type="fa" />首页</a>
    </c-menu-item>
    <c-menu-item active>
      <a href="#"><c-icon name="cogs" type="fa" />设置</a>
    </c-menu-item>
    <c-submenu>
      <template slot="title">
        <c-icon name="share-alt" type="fa" />分享
      </template>
      <c-menu-item>
        <a href="#"><c-icon name="weibo" type="fa" />分享到微博</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="wechat" type="fa" />分享到微信</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="twitter" type="fa" />分享到 Twitter</a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>
```

## 纵向菜单

```html
<template>
  <c-menu mode="vertical">
    <c-menu-item>
      <a href="#"><c-icon name="home" type="fa" />首页</a>
    </c-menu-item>
    <c-menu-item active>
      <a href="#"><c-icon name="cogs" type="fa" />设置</a>
    </c-menu-item>
    <c-submenu>
      <template slot="title">
        <c-icon name="share-alt" type="fa" />分享
      </template>
      <c-menu-item>
        <a href="#"><c-icon name="weibo" type="fa" />分享到微博</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="wechat" type="fa" />分享到微信</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="twitter" type="fa" />分享到 Twitter</a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>

<style>
.c-menu {
  width: 240px;
}
</style>
```

## 深色纵向菜单

```html
<template>
  <c-menu mode="vertical" theme="dark">
    <c-menu-item>
      <a href="#"><c-icon name="home" type="fa" />首页</a>
    </c-menu-item>
    <c-menu-item active>
      <a href="#"><c-icon name="cogs" type="fa" />设置</a>
    </c-menu-item>
    <c-submenu open>
      <template slot="title">
        <c-icon name="share-alt" type="fa" />分享
      </template>
      <c-menu-item>
        <a href="#"><c-icon name="weibo" type="fa" />分享到微博</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="wechat" type="fa" />分享到微信</a>
      </c-menu-item>
      <c-menu-item>
        <a href="#"><c-icon name="twitter" type="fa" />分享到 Twitter</a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>

<style>
.c-menu {
  width: 240px;
}
</style>
```
