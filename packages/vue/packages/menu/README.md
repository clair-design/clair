---
group: Navigation 导航
---

# Menu 导航菜单

## 顶部导航

水平的顶部导航菜单

```html
<template>
  <c-menu mode="horizontal" active-name="1" @select="handleSelect">
    <c-menu-item name="1">
      <c-icon-home />
      一级导航 1
    </c-menu-item>
    <c-submenu>
      <template v-slot:title>
        <c-icon-file />
        一级导航 2
      </template>
      <c-menu-item name="2-1">
        <c-icon-home />
        二级导航 1
      </c-menu-item>
      <c-submenu>
        <template v-slot:title>
          二级导航 2
        </template>
        <c-menu-item name="2-2-1">三级导航 1</c-menu-item>
        <c-menu-item name="2-2-2">三级导航 2</c-menu-item>
        <c-menu-item name="2-2-3">三级导航 3</c-menu-item>
      </c-submenu>
      <c-menu-item name="2-3">二级导航 3</c-menu-item>
    </c-submenu>
    <c-menu-item name="3">
      <c-icon-calendar />
      一级导航 3
    </c-menu-item>
    <c-menu-item name="4" disabled>
      <c-icon-setting />
      一级导航 4
    </c-menu-item>
  </c-menu>
</template>

<script>
  export default {
    methods: {
      handleSelect(menu) {
        console.log(menu)
      }
    }
  }
</script>
```

<p style="margin-top: 48px;">暗夜主题</p>

```html
<template>
  <c-menu theme="dark" mode="horizontal" active-name="1">
    <c-menu-item name="1">一级导航 1</c-menu-item>
    <c-submenu>
      <template v-slot:title>
        一级导航 2
      </template>
      <c-menu-item name="2-1">二级导航 1</c-menu-item>
      <c-submenu>
        <template v-slot:title>
          二级导航 2
        </template>
        <c-menu-item name="2-2-1">三级导航 1</c-menu-item>
        <c-menu-item name="2-2-2">三级导航 2</c-menu-item>
        <c-menu-item name="2-2-3">三级导航 3</c-menu-item>
      </c-submenu>
      <c-menu-item name="2-3">二级导航 3</c-menu-item>
    </c-submenu>
    <c-menu-item name="3">一级导航 3</c-menu-item>
    <c-menu-item name="4" disabled>一级导航 4</c-menu-item>
  </c-menu>
</template>
```

## 侧边导航

垂直菜单，可内嵌子菜单，默认展开首个二级菜单。

```html
<template>
  <div
    style="display: flex; justify-content: space-around; padding: 16px; background: #fafafa;"
  >
    <c-menu
      mode="vertical"
      active-name="2-2-3"
      width="200px"
      :expanded-names="['2', '2-2']"
    >
      <c-menu-item name="1">
        <c-icon-home />
        一级导航 1
      </c-menu-item>
      <c-submenu name="2">
        <template v-slot:title>
          <c-icon-file />
          一级导航 2
        </template>
        <c-menu-item name="2-1">
          <c-icon-home />
          二级导航 1
        </c-menu-item>
        <c-submenu name="2-2">
          <template v-slot:title>
            <c-icon-file />
            二级导航 2
          </template>
          <c-menu-item name="2-2-1">三级导航 1</c-menu-item>
          <c-menu-item name="2-2-2">三级导航 2</c-menu-item>
          <c-menu-item name="2-2-3">三级导航 3</c-menu-item>
        </c-submenu>
        <c-menu-item name="2-3">二级导航 3</c-menu-item>
      </c-submenu>
      <c-menu-item name="3">
        <c-icon-calendar />
        一级导航 3
      </c-menu-item>
      <c-menu-item name="4" disabled>
        <c-icon-setting />
        一级导航 4
      </c-menu-item>
    </c-menu>

    <c-menu
      theme="dark"
      mode="vertical"
      active-name="2-2-3"
      width="200px"
      :expanded-names="['2', '2-2']"
    >
      <c-menu-item name="1">一级导航 1</c-menu-item>
      <c-submenu name="2">
        <template v-slot:title>
          一级导航 2
        </template>
        <c-menu-item name="2-1">
          <c-icon-file />
          二级导航 1
        </c-menu-item>
        <c-submenu name="2-2">
          <template v-slot:title>
            二级导航 2
          </template>
          <c-menu-item name="2-2-1">三级导航 1</c-menu-item>
          <c-menu-item name="2-2-2">三级导航 2</c-menu-item>
          <c-menu-item name="2-2-3">三级导航 3</c-menu-item>
        </c-submenu>
        <c-menu-item name="2-3">二级导航 3</c-menu-item>
      </c-submenu>
      <c-menu-item name="3">
        <c-icon-calendar />
        一级导航 3
      </c-menu-item>
      <c-menu-item name="4" disabled>
        <c-icon-setting />
        一级导航 4
      </c-menu-item>
    </c-menu>
  </div>
</template>
```

## 折叠导航

内嵌菜单可以被缩起 / 展开

```html
<template>
  <c-button @click="collapsed = !collapsed">切换</c-button>
  <div
    style="display: flex; justify-content: space-around; padding: 16px; background: #fafafa;"
  >
    <c-menu
      class="demo-menu"
      mode="vertical"
      :collapsed="collapsed"
      active-name="1"
      width="200px"
    >
      <c-menu-item name="1">
        <c-icon-home />
        一级导航 1
      </c-menu-item>
      <c-submenu>
        <template v-slot:title>
          <c-icon-file />
          一级导航 2
        </template>
        <c-menu-item name="2-1">二级导航 1</c-menu-item>
        <c-submenu>
          <template v-slot:title>
            二级导航 2
          </template>
          <c-menu-item name="2-2-1">三级导航 1</c-menu-item>
          <c-menu-item name="2-2-2">三级导航 2</c-menu-item>
          <c-menu-item name="2-2-3">三级导航 3</c-menu-item>
        </c-submenu>
        <c-menu-item name="2-3">二级导航 3</c-menu-item>
      </c-submenu>
      <c-menu-item name="3">
        <c-icon-calendar />
        一级导航 3
      </c-menu-item>
      <c-menu-item name="4" disabled>
        <c-icon-setting />
        一级导航 4
      </c-menu-item>
    </c-menu>

    <c-menu mode="vertical" theme="dark" collapsed active-name="1">
      <c-menu-item name="1">
        <c-icon-home />
        一级导航 1
      </c-menu-item>
      <c-submenu>
        <template v-slot:title>
          <c-icon-file />
          一级导航 2
        </template>
        <c-menu-item name="2-1">二级导航 1</c-menu-item>
        <c-submenu>
          <template v-slot:title>
            二级导航 2
          </template>
          <c-menu-item name="2-2-1">三级导航 1</c-menu-item>
          <c-menu-item name="2-2-2">三级导航 2</c-menu-item>
          <c-menu-item name="2-2-3">三级导航 3</c-menu-item>
        </c-submenu>
        <c-menu-item name="2-3">二级导航 3</c-menu-item>
      </c-submenu>
      <c-menu-item name="3">
        <c-icon-calendar />
        一级导航 3
      </c-menu-item>
      <c-menu-item name="4" disabled>
        <c-icon-setting />
        一级导航 4
      </c-menu-item>
    </c-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false
      }
    }
  }
</script>

<style scoped>
  .demo-menu {
    min-height: 600px;
  }
</style>
```

## 路由模式

```html
<template>
  <c-menu mode="horizontal" use-router active-name="3">
    <c-menu-item name="1" :to="{ path: '/vue/button' }">
      Button
    </c-menu-item>
    <c-menu-item name="2" :to="{ path: '/vue/input' }" replace>
      Input
    </c-menu-item>
    <c-menu-item name="3" :to="{ path: '/vue/menu' }">
      Menu
    </c-menu-item>
  </c-menu>
</template>
```

### Menu Props

| Name           | Description                                | Type                           | Default      |
| -------------- | ------------------------------------------ | ------------------------------ | ------------ |
| mode           | 排版模式                                   | `'horizontal'` \| `'vertical'` | `'vertical'` |
| collapsed      | 是否收起菜单（仅 vertical 模式可用）       | `boolean`                      | `false`      |
| active-name    | 选中菜单名称（可使用 `v-model`）           | `string` \| `number`           | -            |
| expanded-names | 打开子菜单名称数组（仅 vertical 模式可用） | `string[]` \| `number[]`       | `[]`         |
| theme          | 主题色                                     | `'light'` \| `'dark'`          | `'light'`    |
| width          | 菜单宽度（仅在 vertical 模式可用）         | `string`                       | -            |
| use-router     | 是否使用 `vue-router`                      | `boolean`                      | `false`      |

### SubMenu Props

| Name     | Description | Type                 | Default |
| -------- | ----------- | -------------------- | ------- |
| name     | 子菜单名称  | `string` \| `number` | -       |
| disabled | 是否禁用    | `boolean`            | `false` |

### Menu Item Props

| Name     | Description                                                                          | Type                 | Default |
| -------- | ------------------------------------------------------------------------------------ | -------------------- | ------- |
| name     | 菜单项名称                                                                           | `string` \| `number` | -       |
| disabled | 是否禁用                                                                             | `boolean`            | `false` |
| to       | 路由跳转字符串或对象，同 [vue-router](https://router.vuejs.org/zh/api/#to) 中的 `to` | `string` \| `object` | `null`  |
| replace  | 同 [vue-router](https://router.vuejs.org/zh/api/#replace) 中的 `replace`             | `boolean`            | `false` |

### Menu Events

| Name   | Description          | Parameters                                |
| ------ | -------------------- | ----------------------------------------- |
| select | Menu Item 选中时回调 | `{ detail: { name: string` \| `number }}` |
