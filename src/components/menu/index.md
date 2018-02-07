---
title: Menu 导航菜单
layout: component
route: /component/menu
---

# Menu

`c-menu` 用来展示导航菜单，支持横向和纵向两种展示方式。`mode` 为 `horizontal` 时横向展示，`vertical` 时纵向展示。

```html
<template>
  <c-menu mode="horizontal">
    <c-menu-item>
      <a href="#">
        <c-icon name="home" type="fa" />
        <span>首页</span>
      </a>
    </c-menu-item>
    <c-menu-item active>
      <a href="#">
        <c-icon name="cogs" type="fa" />
        <span>设置</span>
      </a>
    </c-menu-item>
    <c-submenu>
      <template slot="title">
        <c-icon name="share-alt" type="fa" />
        <span>分享</span>
      </template>
      <c-menu-item>
        <a href="#">
          <c-icon name="weibo" type="fa" />
          <span>分享到微博</span>
        </a>
      </c-menu-item>
      <c-menu-item>
        <a href="#">
          <c-icon name="wechat" type="fa" />
          <span>分享到微信</span>
        </a>
      </c-menu-item>
      <c-menu-item>
        <a href="#">
          <c-icon name="twitter" type="fa" />
          <span>分享到 Twitter</span>
        </a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>
```

## 深色主题

默认的主题颜色为浅色系，可以将 `theme` 设置为 `dark` 显示深色主题。

```html
<template>
  <c-menu mode="horizontal" theme="dark">
    <c-menu-item>
      <a href="#">
        <c-icon name="home" type="fa" />
        <span>首页</span>
      </a>
    </c-menu-item>
    <c-menu-item active>
      <a href="#">
        <c-icon name="cogs" type="fa" />
        <span>设置</span>
      </a>
    </c-menu-item>
    <c-submenu>
      <template slot="title">
        <c-icon name="share-alt" type="fa" />
        <span>分享</span>
      </template>
      <c-menu-item>
        <a href="#">
          <c-icon name="weibo" type="fa" />
          <span>分享到微博</span>
        </a>
      </c-menu-item>
      <c-menu-item>
        <a href="#">
          <c-icon name="wechat" type="fa" />
          <span>分享到微信</span>
        </a>
      </c-menu-item>
      <c-menu-item>
        <a href="#">
          <c-icon name="twitter" type="fa" />
          <span>分享到 Twitter</span>
        </a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>
```

## 纵向菜单

当 `mode` 为 `vertical` 时，可以将菜单收起，只显示图标。菜单默认展开，当 `collapsed` 为 `true` 时收起。

纵向菜单默认宽度为 `20em`，可以通过 `width` 属性进行自定义，其值可以是任何有效的 CSS 长度。

```html
<template>
  <div class="has-margin-bottom-lg">
    <c-button icon="menu" flat primary @click="toggleCollapsed">切换展开收起</c-button>
    <c-radio-group
      :options="themes"
      v-model="theme"
      button
    />
  </div>
  <c-menu mode="vertical" :theme="theme" :collapsed="collapsed" width="200px">
    <c-menu-item>
      <a>
        <c-icon name="home" type="fa" />
        <span>首页</span>
      </a>
    </c-menu-item>
    <c-menu-item active>
      <a>
        <c-icon name="cogs" type="fa" />
        <span>设置</span>
      </a>
    </c-menu-item>
    <c-submenu>
      <template slot="title">
        <c-icon name="share-alt" type="fa" />
        <span>分享</span>
      </template>
      <c-menu-item>
        <a>
          <span>分享到微博</span>
        </a>
      </c-menu-item>
      <c-menu-item>
        <a>
          <span>分享到微信</span>
        </a>
      </c-menu-item>
      <c-menu-item>
        <a>
          <span>分享到 Twitter</span>
        </a>
      </c-menu-item>
    </c-submenu>
  </c-menu>
</template>

<script>
export default {
  data () {
    return {
      theme: 'light',
      collapsed: false,
      themes: [
        {
          label: '浅色主题',
          value: 'light'
        },
        {
          label: '深色主题',
          value: 'dark'
        }
      ]
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| mode | String | horizontal | horizontal 或 vertical，表示横向或纵向展示菜单 |
| width | String | 20em | 纵向展示时的菜单宽度，可以为任意有效 CSS 长度 |
| collapsed | Boolean | false | 是否收起菜单 |
| theme | String | light | light 或 dark，表示用浅色或深色系主题 |
