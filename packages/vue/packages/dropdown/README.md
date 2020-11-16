---
group: Basic 基础
---

# DropDown 下拉菜单

## 定义

收起和展开的更多菜单项集合。

## 使用场景

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单，可在列表中进行选择，并执行相应的命令。

## 基础样式

鼠标移动到下拉按钮上，展开下拉菜单。

```html
<template>
  <c-dropdown>
    <c-dropdown-menu slot="menu">
      <c-dropdown-item>北京</c-dropdown-item>
      <c-dropdown-item divided>上海</c-dropdown-item>
      <c-dropdown-item disabled>广州</c-dropdown-item>
      <c-dropdown-item>深圳</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>
</template>
```

## 触发方式

可以配置 `click`、 `hover` 或 `focus` 时展开菜单。

```html
<template>
  <c-dropdown>
    <span class="c-dropdown-link">
      hover 激活
      <c-icon-arrow-down class="c-dropdown-link-icon" />
    </span>
    <c-dropdown-menu slot="menu">
      <c-dropdown-item>北京</c-dropdown-item>
      <c-dropdown-item>上海</c-dropdown-item>
      <c-dropdown-item>广州</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>

  <c-dropdown trigger="focus" :tabindex="0">
    <span class="c-dropdown-link">
      focus 激活
      <c-icon-arrow-down class="c-dropdown-link-icon" />
    </span>
    <c-dropdown-menu slot="menu">
      <c-dropdown-item>北京</c-dropdown-item>
      <c-dropdown-item>上海</c-dropdown-item>
      <c-dropdown-item>广州</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>

  <c-dropdown trigger="click">
    <span class="c-dropdown-link">
      click 激活
      <c-icon-arrow-down class="c-dropdown-link-icon" />
    </span>
    <c-dropdown-menu slot="menu">
      <c-dropdown-item>北京</c-dropdown-item>
      <c-dropdown-item>上海</c-dropdown-item>
      <c-dropdown-item>广州</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>
</template>

<style scoped>
  .c-dropdown + .c-dropdown {
    margin-left: 24px;
  }
</style>
```

## 触发对象

组件默认的 `slot` 即为下拉菜单的触发对象。

```html
<template>
  <div class="trigger-demos">
    <c-dropdown>
      <c-button type="primary">
        下拉菜单
        <c-icon-arrow-down class="c-dropdown-link-icon" />
      </c-button>
      <c-dropdown-menu slot="menu">
        <c-dropdown-item>北京</c-dropdown-item>
        <c-dropdown-item>上海</c-dropdown-item>
        <c-dropdown-item>广州</c-dropdown-item>
      </c-dropdown-menu>
    </c-dropdown>

    <c-button-group>
      <c-button type="primary">按钮 1</c-button>
      <c-button type="primary">按钮 2</c-button>
      <c-dropdown>
        <c-button type="primary" class="arrow-button">
          <c-icon-arrow-down />
        </c-button>
        <c-dropdown-menu slot="menu">
          <c-dropdown-item>北京</c-dropdown-item>
          <c-dropdown-item>上海</c-dropdown-item>
          <c-dropdown-item>广州</c-dropdown-item>
        </c-dropdown-menu>
      </c-dropdown>
    </c-button-group>
  </div>
</template>

<style scoped>
  .trigger-demos {
    display: flex;
  }
  .trigger-demos > :not(:last-child) {
    margin-right: 24px;
  }
  .arrow-button {
    padding: 0 10px;
    font-size: 12px;
  }
</style>
```

## 菜单隐藏方式

菜单项点击后，整个下拉菜单会默认隐藏。将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

```html
<template>
  <c-dropdown :hide-on-click="false">
    <c-dropdown-menu slot="menu">
      <c-dropdown-item>北京</c-dropdown-item>
      <c-dropdown-item>上海</c-dropdown-item>
      <c-dropdown-item>广州</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>
</template>
```

## 事件与状态同步

当下拉菜单展示或隐藏时，组件会触发 `visibility-change` 事件。

```html
<template>
  <c-dropdown @visibility-change="onVisibilityChange" @item-click="onItemClick">
    <c-dropdown-menu slot="menu">
      <c-dropdown-item item-key="beijing">北京</c-dropdown-item>
      <c-dropdown-item item-key="shanghai">上海</c-dropdown-item>
      <c-dropdown-item item-key="guangzhou">广州</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>
</template>

<script>
  export default {
    methods: {
      onVisibilityChange({ detail }) {
        const { visible } = detail
        const message = visible ? '菜单被显示' : '菜单被隐藏'
        this.$message({ message })
      },
      onItemClick({ detail: { itemKey } }) {
        this.$message({ message: `点击了 ${itemKey}` })
      }
    }
  }
</script>
```

另外，还可以使用 `sync` 修饰符实现状态自动同步。

```html
<template>
  <c-dropdown :visible.sync="visible">
    <c-dropdown-menu slot="menu">
      <c-dropdown-item>北京</c-dropdown-item>
      <c-dropdown-item>上海</c-dropdown-item>
      <c-dropdown-item>广州</c-dropdown-item>
    </c-dropdown-menu>
  </c-dropdown>

  <p>
    当前菜单显示状态：
    <code>{{ visible }}</code>
  </p>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      }
    }
  }
</script>
```

## Props

| Name          | Description                        | Type                                                                                | Required | Default         |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------------------- | -------- | --------------- |
| placement     | 菜单弹出的位置                     | `'top'`\|`'top-left'`\|`'top-right'`\|`'bottom'`\|`'bottom-left'`\|`'bottom-right'` | `false`  | `'bottom'`      |
| visible       | 下拉菜单的默认展现方式 (出现/隐藏) | `boolean`                                                                           | `false`  | `false`         |
| trigger       | 触发下拉的⾏为                     | `hover`\|`click`\|`focus`                                                           | `false`  | `'hover'`       |
| hide-on-click | 是否在点击菜单项后隐藏菜单         | `boolean`                                                                           | `false`  | `true`          |
| show-delay    | 下拉菜单出现的延迟                 | `number`                                                                            | `false`  | `100`           |
| hide-delay    | 下拉菜单消失的延迟                 | `number`                                                                            | `false`  | `100`           |
| tabindex      | 下拉菜单按钮的 tabindex            | `number`                                                                            | `false`  | `0`             |
| append-target | 插入 Dropdown 的容器元素           | `Element`                                                                           | `false`  | `document.body` |

## Events

| Event Name        | Description             | Parameters                                                                    |
| ----------------- | ----------------------- | ----------------------------------------------------------------------------- |
| visibility-change | 下拉菜单出现/隐藏时触发 | `{ detail: { visible: boolean} }`                                             |
| item-click        | 点击菜单项触发          | `{ detail: { itemKey: string` \| `object` \| `number }, nativeEvent: Event }` |

## DropDownItem Props

| Name     | Description      | Type                             | Required | Default |
| -------- | ---------------- | -------------------------------- | -------- | ------- |
| item-key | 菜单项目绑定的值 | `string` \| `object` \| `number` | `false`  | -       |
| disabled | 菜单项是否禁用   | `boolean`                        | `false`  | `false` |
| divided  | 分割线           | `boolean`                        | `false`  | `false` |
