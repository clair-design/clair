---
title: Menu 导航菜单
layout: component
route: /component/menu
---

# Menu

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
  <c-menu mode="vertical" :theme="theme" :collapsed="collapsed">
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
