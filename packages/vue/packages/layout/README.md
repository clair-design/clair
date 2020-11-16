---
group: Basic 基础
---

# Layout 布局

## 定义

对整体页面的信息的类型、重要性、操作性进行分层归类，协助进行页面级整体布局。

## 使用场景

针对用户使用的动机，可分为浏览类、操作类、管理类三大布局（上中下、侧边、顶部-侧边）类型。

## 尺寸

顶部一级导航：`50px`，二级导航：`42px`，侧边一级导航：`200px`，二级导航 `150px`。

## 侧边布局

侧边两列式布局。页面横向空间有限时，侧边导航可收起。侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。

侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部分。适用于流程任务配置页、概览页、整体独立模块的页面。

在 `c-aside` 上添加 `collapsible` 属性可以使侧边栏具有展开/收起功能。使用 `v-model` 可以控制侧边栏是否展开。

```html
<c-layout>
  <c-aside collapsible v-model="collapsed">
    aside
  </c-aside>
  <c-layout>
    <c-header>header</c-header>
    <c-main>main</c-main>
    <c-footer>footer</c-footer>
  </c-layout>
</c-layout>

<script>
  export default {
    data() {
      return { collapsed: false }
    }
  }
</script>

<style scoped>
  .c-layout__aside {
    background: #c6dcfe;
  }

  .c-layout__header,
  .c-layout__footer {
    background: #d3e4ff;
    height: 3em;
  }

  .c-layout__main {
    background: #e1ecff;
    height: 6em;
  }

  /* make text centered vertically and horizontally */
  .c-layout__header,
  .c-layout__main,
  .c-layout__aside,
  .c-layout__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4b75b4;
  }
</style>
```

## 顶部-侧边布局

同样拥有顶部导航及侧边栏，一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。区别是两边未留边距，主要应用于工具类、管理类页面。

```html
<c-layout>
  <c-header>header</c-header>
  <c-layout>
    <c-aside>aside</c-aside>
    <c-layout>
      <c-main>main</c-main>
      <c-footer>footer</c-footer>
    </c-layout>
  </c-layout>
</c-layout>
<style scoped>
  .c-layout__aside {
    background: #c6dcfe;
  }

  .c-layout__header,
  .c-layout__footer {
    background: #d3e4ff;
    height: 3em;
  }

  .c-layout__main {
    background: #e1ecff;
    height: 6em;
  }

  /* make text centered vertically and horizontally */
  .c-layout__header,
  .c-layout__main,
  .c-layout__aside,
  .c-layout__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4b75b4;
  }
</style>
```

## 上-中-下布局

一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。

通常将内容放在固定尺寸（例如：`1200px`）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。

适用于首页、详情页、列表页等整体上下布局流的页面。

```html
<c-layout>
  <c-header>header</c-header>
  <c-main>main</c-main>
  <c-footer>footer</c-footer>
</c-layout>
<style scoped>
  .c-layout__aside {
    background: #c6dcfe;
  }

  .c-layout__header,
  .c-layout__footer {
    background: #d3e4ff;
    height: 3em;
  }

  .c-layout__main {
    background: #e1ecff;
    height: 6em;
  }

  /* make text centered vertically and horizontally */
  .c-layout__header,
  .c-layout__main,
  .c-layout__aside,
  .c-layout__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4b75b4;
  }
</style>
```

## 自定义展开收起

使用 `v-slot:trigger` 可以对展开、收起按钮进行定制。使用 `width` 和 `collapsedWidth` 可以分别指定侧边栏展开和收起时的宽度。

```html
<template>
  <c-layout>
    <c-aside collapsible v-model="collapsed">
      aside
      <template v-slot:trigger>
        <span v-if="collapsed">
          展开
          <c-icon-arrow-right />
        </span>
        <span v-else>
          <c-icon-arrow-left />
          收起
        </span>
      </template>
    </c-aside>
    <c-layout>
      <c-header>header</c-header>
      <c-main>main</c-main>
      <c-footer>footer</c-footer>
    </c-layout>
  </c-layout>
</template>

<script>
  export default {
    data() {
      return { collapsed: false }
    }
  }
</script>

<style scoped>
  .c-layout__aside {
    background: #c6dcfe;
  }

  .c-layout__header,
  .c-layout__footer {
    background: #d3e4ff;
    height: 3em;
  }

  .c-layout__main {
    background: #e1ecff;
    height: 6em;
  }

  /* make text centered vertically and horizontally */
  .c-layout__header,
  .c-layout__main,
  .c-layout__aside,
  .c-layout__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4b75b4;
  }
</style>
```

如果把切换展开收起的按钮放在侧边栏之外，可以将默认的按钮隐藏，然后通过 `v-model` 控制展开收起。

```html
<template>
  <c-layout>
    <c-aside collapsible v-model="collapsed">
      aside
      <template v-slot:trigger />
    </c-aside>
    <c-layout>
      <c-header>
        <span @click="toggle" class="collapse-trigger">≡</span>
      </c-header>
      <c-main>main</c-main>
      <c-footer>footer</c-footer>
    </c-layout>
  </c-layout>
</template>

<script>
  export default {
    data() {
      return { collapsed: false }
    },
    methods: {
      toggle() {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

<style scoped>
  .c-layout__aside {
    background: #c6dcfe;
  }

  .c-layout__header,
  .c-layout__footer {
    background: #d3e4ff;
    height: 3em;
  }

  .c-layout__main {
    background: #e1ecff;
    height: 6em;
  }

  .collapse-trigger {
    font-size: 1.5em;
    line-height: 2;
    cursor: pointer;
    padding: 0 0.7em;
  }

  .collapse-trigger:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  /* make text centered vertically and horizontally */
  .c-layout__header,
  .c-layout__main,
  .c-layout__aside,
  .c-layout__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4b75b4;
  }
  .c-layout__header {
    justify-content: start;
  }
</style>
```

## 固定顶部和侧边栏

为 `c-header` 和 `c-aside` 设置 `fixed` 属性，可以使他们相对于屏幕固定。

```html
<c-layout style="height: 300px;">
  <c-header fixed>header</c-header>
  <c-layout>
    <c-aside fixed>aside</c-aside>
    <c-main>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>main</p>
      <p>...</p>
      <p>...</p>
      <p>↓</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>end</p>
    </c-main>
  </c-layout>
</c-layout>
<style scoped>
  .c-layout__aside {
    background: #c6dcfe;
  }

  .c-layout__header,
  .c-layout__footer {
    background: #d3e4ff;
    height: 3em;
  }

  .c-layout__main {
    background: #e1ecff;
    text-align: center;
  }

  /* make text centered vertically and horizontally */
  .c-layout__header,
  .c-layout__aside,
  .c-layout__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #4b75b4;
  }
</style>
```

## Header Props

| Name  | Description             | Type      | Required | Default |
| ----- | ----------------------- | --------- | -------- | ------- |
| fixed | header 是否相对屏幕固定 | `boolean` | `false`  | `false` |

## Aside Props

| Name           | Description                  | Type               | Required | Default |
| -------------- | ---------------------------- | ------------------ | -------- | ------- |
| collapsible    | 是否允许侧边栏展开收起       | `boolean`          | `false`  | `false` |
| collapsed      | 是否收起（可使用 `v-model`） | `boolean`          | `false`  | `false` |
| fixed          | 是否相对屏幕固定             | `boolean`          | `false`  | `false` |
| width          | 侧边栏宽度                   | `string`\|`number` | `false`  | `200`   |
| collapsedWidth | 侧边栏收起后宽度             | `string`\|`number` | `false`  | `60`    |

## Aside Events

| Event Name | Description                  | Parameters           |
| ---------- | ---------------------------- | -------------------- |
| collapse   | 侧边栏展开状态发生变化时触发 | `collapsed: boolean` |

## Aside Slots

| Name    | Description              |
| ------- | ------------------------ |
| trigger | 自定义侧边栏展开收起按钮 |
