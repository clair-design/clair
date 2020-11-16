---
group: Navigation 导航
---

# Tabs 标签页

## 定义

可以为平级的大块信息内容进行分类收纳和展现，保持界面整洁，用户不需跳转页面即可比较和浏览信息。

## 基础样式

Tab 页签个数建议<=5，用于容器内部的主功能切换。通过 `active-key` 属性可以指定默认展示的页签。

```html
<c-tabs active-key="2">
  <c-tab-pane label="标签页 1" tab-key="1">
    <p class="pane-content">标签页 1 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 2" tab-key="2">
    <p class="pane-content">标签页 2 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 3" tab-key="3">
    <p class="pane-content">标签页 3 的内容</p>
  </c-tab-pane>
</c-tabs>

<style scoped>
  .pane-content {
    padding: 14px;
  }
</style>
```

给页签设置 `disabled` 属性，可以将其禁用。

```html
<c-tabs>
  <c-tab-pane label="标签页 1" tab-key="1">
    <p class="pane-content">标签页 1 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 2" tab-key="2" disabled>
    <p class="pane-content">标签页 2 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 3" tab-key="3">
    <p class="pane-content">标签页 3 的内容</p>
  </c-tab-pane>
</c-tabs>

<style scoped>
  .pane-content {
    padding: 14px;
  }
</style>
```

给页签设置 `lazy` 属性，可以将其延迟渲染。

```html
<c-tabs>
  <c-tab-pane label="标签页 1" tab-key="1">
    <p class="pane-content">标签页 1 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 2" tab-key="2" lazy>
    <p class="pane-content">标签页 2 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 3" tab-key="3" lazy>
    <p class="pane-content">标签页 3 的内容</p>
  </c-tab-pane>
</c-tabs>

<style scoped>
  .pane-content {
    padding: 14px;
  }
</style>
```

## 自定义页签标题

在 `c-tab-pane` 组件内，将内容分发给名为 `label` 的 `slot`，就可以自定义页签标题。

```html
<template>
  <c-tabs>
    <c-tab-pane tab-key="1">
      <template #label>
        <c-icon-home class="icon" />
        标签页 1
      </template>
      <p class="pane-content">标签页 2 的内容</p>
    </c-tab-pane>
    <c-tab-pane tab-key="2">
      <template #label>
        <c-icon-setting class="icon" />
        标签页 2
      </template>
      <p class="pane-content">标签页 2 的内容</p>
    </c-tab-pane>
    <c-tab-pane tab-key="3">
      <template #label>
        <c-icon-file class="icon" />
        标签页 3
      </template>
      <p class="pane-content">标签页 3 的内容</p>
    </c-tab-pane>
  </c-tabs>
</template>

<style scoped>
  .pane-content {
    padding: 14px;
  }
  .icon {
    margin-right: 4px;
    stroke-width: 1.5px;
    vertical-align: -0.1em;
  }
</style>
```

## 卡片样式

设置 `type="card"`，可以实现卡片形式的标签。

```html
<c-tabs type="card">
  <c-tab-pane label="标签页 1" tab-key="1">
    <p class="pane-content">标签页 1 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 2" tab-key="2" disabled>
    <p class="pane-content">标签页 2 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 3" tab-key="3">
    <p class="pane-content">标签页 3 的内容</p>
  </c-tab-pane>
</c-tabs>

<style scoped>
  .pane-content {
    padding: 18px;
  }
</style>
```

## 动态增减样式

只有卡片样式的页签支持新增和关闭选项。页签至少保留一个。

```html
<c-tabs
  :active-key="activeKey"
  type="card"
  @close="removeTab"
  @add="addTab"
  :addable="addable"
>
  <c-tab-pane
    v-for="(pane, index) in tabPanes"
    :key="pane.key"
    :tab-key="pane.key"
    :label="pane.label"
    :closable="pane.closable"
  >
    <div class="pane-content">{{ pane.content }}</div>
  </c-tab-pane>
</c-tabs>
<script>
  export default {
    data() {
      return {
        activeKey: '2',
        tabPanes: [
          {
            key: '1',
            label: '标签页 1',
            content: '标签页 1 内容',
            closable: true
          },
          {
            key: '2',
            label: '标签页 2',
            content: '标签页 2 内容',
            closable: true
          },
          {
            key: '3',
            label: '标签页 3',
            content: '标签页 3 内容',
            closable: true
          }
        ]
      }
    },

    computed: {
      addable() {
        return this.tabPanes.length < 6
      }
    },

    watch: {
      tabPanes(panes) {
        panes[0].closable = panes.length > 1
      }
    },

    methods: {
      removeTab({ detail: { key } }) {
        const { tabPanes } = this
        const index = tabPanes.findIndex(pane => pane.key === key)
        tabPanes.splice(index, 1)
      },
      addTab() {
        const h = this.$createElement
        const label = h('span', [h('c-icon-file', { class: 'icon' }), '标签页'])
        this.tabPanes.push({
          key: `${Date.now()}`,
          label: label,
          content: `I am content ${Date.now()}`,
          closable: true
        })
      }
    }
  }
</script>

<style scoped>
  .pane-content {
    padding: 14px;
  }
  .icon {
    margin-right: 4px;
  }
</style>
```

## 设置页签位置

页签默认放在内容的上方，可以通过 `tab-position` 属性将页签放在内容左边、右边或者下面。

```html
<style>
  .c-tabs {
    margin-top: 30px;
  }
</style>

页签位置：
<c-radio-group v-model="pos" name="fruit3">
  <c-radio-button v-for="(item, i) in positions" :key="i" :value="item">
    {{ item }}
  </c-radio-button>
</c-radio-group>
<c-tabs :tab-position="pos">
  <c-tab-pane label="标签页 1" tab-key="1">
    <p class="pane-content">标签页 1 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 2" tab-key="2">
    <p class="pane-content">标签页 2 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 3" tab-key="3">
    <p class="pane-content">标签页 3 的内容</p>
  </c-tab-pane>
</c-tabs>

<script>
  export default {
    data() {
      return {
        pos: 'top',
        positions: ['top', 'bottom', 'left', 'right']
      }
    }
  }
</script>
```

## 手动替换 activeKey

```html
<c-button @click="onButtonClick" style="margin-bottom: 10px">
  切换到第二个Tab
</c-button>
<c-tabs :active-key="activeKey">
  <c-tab-pane label="标签页 1" tab-key="1">
    <p>标签页 1 的内容</p>
  </c-tab-pane>
  <c-tab-pane label="标签页 2" tab-key="2">
    <p>标签页 2 的内容</p>
  </c-tab-pane>
</c-tabs>

<script>
  export default {
    data() {
      return { activeKey: '1' }
    },
    methods: {
      onButtonClick() {
        this.activeKey = '2'
      }
    }
  }
</script>
```

## Tabs Props

| Name         | Description                | Type                                           | Required | Default |
| ------------ | -------------------------- | ---------------------------------------------- | -------- | ------- |
| active-key   | 首次渲染时，选中选项的索引 | `string`                                       | `false`  | -       |
| tab-position | 选项卡显示位置             | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `false`  | `'top'` |
| type         | 选项卡展示形式             | `string`，为 `'card'` 时候，展示为卡片类型     | `false`  | -       |
| addable      | 选项卡可否添加             | `boolean`                                      | `false`  | `false` |

## Tabs Events

| Event Name | Description | Parameters                    |
| ---------- | ----------- | ----------------------------- |
| change     | 切换时触发  | `{ detail: { key: string } }` |
| click      | 点击时触发  | `{ detail: { key: string } }` |
| close      | 关闭时触发  | `{ detail: { key: string } }` |
| add        | 添加时触发  | -                             |

## TabPane Props

| Name     | Description            | Type      | Required | Default |
| -------- | ---------------------- | --------- | -------- | ------- |
| tab-key  | 对应 `active-key`      | `string`  | `true`   | -       |
| label    | 标签页标题             | `string`  | `false`  | -       |
| disabled | 当前标签页禁用         | `boolean` | `false`  | `false` |
| closable | 当前标签页存在关闭按钮 | `boolean` | `false`  | `false` |
| lazy     | 当前标签页延迟渲染     | `boolean` | `false`  | `false` |

## TabPane Slots

| Name  | Description                          |
| ----- | ------------------------------------ |
| label | 标签页标题，优先级高于 `props.label` |
