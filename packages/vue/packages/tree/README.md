---
group: Data 数据展示
---

# Tree 树形控件

## 定义

左侧菜单控制器。

## 使用场景

文件夹、组织架构、分类、国家地区等，世间万物的大多数结构都是树形结构，使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能 建议树父节点到子节点的层级最多到三级。

一般居于表格左侧。

## 基础样式

支持多层级扩展收起的分类。

```html
<template>
  <c-tree :data="data"></c-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {
                    label: '三级 1-1-1'
                  },
                  {
                    label: '三级 1-1-2'
                  }
                ]
              },
              {
                label: '二级 1-2',
                children: [
                  {
                    label: '三级 1-2-1'
                  },
                  {
                    label: '三级 1-2-2'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1'
              },
              {
                label: '二级 2-2'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

## 可选择样式

展示可选择、禁用。

```html
<template>
  <c-tree :data="data" selectable is-default-expand-all />
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                disabled: true,
                children: [
                  {
                    label: '三级 1-1-1'
                  },
                  {
                    label: '三级 1-1-2'
                  }
                ]
              },
              {
                label: '二级 1-2',
                children: [
                  {
                    label: '三级 1-2-1'
                  },
                  {
                    label: '三级 1-2-2'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

## 可勾选样式

展示可勾选、禁用。

```html
<template>
  <c-tree
    :data="data"
    key-prop="key"
    checkable
    is-default-expand-all
    :default-checked-keys="[111, 211]"
    @check="handleCheck"
  />
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            key: 1,
            label: '一级 1',
            children: [
              {
                key: 11,
                label: '二级 1-1',
                children: [
                  {
                    key: 111,
                    label: '三级 1-1-1'
                  },
                  {
                    key: 112,
                    disabled: true,
                    label: '三级 1-1-2'
                  }
                ]
              },
              {
                key: 12,
                label: '二级 1-2',
                disabled: true,
                children: [
                  {
                    key: 121,
                    label: '三级 1-2-1'
                  },
                  {
                    key: 122,
                    label: '三级 1-2-2'
                  }
                ]
              }
            ]
          },
          {
            key: 2,
            label: '一级 2',
            children: [
              {
                key: 21,
                label: '二级 2-1',
                children: [
                  {
                    key: 211,
                    disabled: true,
                    label: '三级 2-1-1'
                  },
                  {
                    key: 212,
                    label: '三级 2-1-2'
                  }
                ]
              },
              {
                key: 22,
                label: '二级 2-2',
                children: [
                  {
                    key: 221,
                    label: '三级 2-2-1'
                  },
                  {
                    key: 222,
                    label: '三级 2-2-2'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleCheck({
        detail: {
          checkedNodes,
          checkedKeys,
          checkedNodesWithHalf,
          checkedKeysWithHalf,
          checkedLeafNodes,
          checkedLeafKeys
        }
      }) {
        console.log('checked: ', checkedKeys)
        console.log('checkedWithHalf: ', checkedKeys)
        console.log('checkedLeaf: ', checkedLeafKeys)
      },
      handleNodeCheck({ detail: { node, data } }) {
        console.log('node: ', node)
      }
    }
  }
</script>
```

## 异步加载

点击展开节点，动态加载数据。

```html
<template>
  <c-tree
    :data="data"
    key-prop="key"
    is-lazy-load
    :load-method="load"
    checkable
  />
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            key: 1,
            label: '1'
          },
          {
            key: 2,
            label: '2'
          }
        ]
      }
    },
    methods: {
      load({ data, node, resolve }) {
        setTimeout(() => {
          const res = [
            {
              key: `${node.key}1`,
              label: `${node.label}-1`,
              isLeaf: true
            },
            {
              key: `${node.key}2`,
              label: `${node.label}-2`,
              isLeaf: node.level > 3
            }
          ]
          resolve(res)
        }, 500)
      }
    }
  }
</script>
```

> 以上异步加载的方式，并不会更新 `tree` 组件的 `props.data`。

> 后续更新会保证数据和 UI 的一致性。

## 带搜索样式

可搜索树内容。

```html
<template>
  <c-input v-model="filterValue">
    搜索
    <c-icon-search slot="suffix-icon" />
  </c-input>
  <c-tree
    :data="data"
    key-prop="key"
    :filter-value="filterValue"
    :filter-method="filterMethod"
  />
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            key: 1,
            label: '一级 1',
            children: [
              {
                key: 11,
                label: '二级 1-1',
                children: [
                  {
                    key: 111,
                    label: '三级 1-1-1'
                  },
                  {
                    key: 112,
                    label: '三级 1-1-2'
                  },
                  {
                    key: 113,
                    label: '三级 1-1-3'
                  }
                ]
              },
              {
                key: 12,
                label: '二级 1-2',
                children: [
                  {
                    key: 121,
                    label: '三级 1-2-1'
                  },
                  {
                    key: 122,
                    label: '三级 1-2-2'
                  },
                  {
                    key: 123,
                    label: '三级 1-2-3'
                  }
                ]
              },
              {
                key: 13,
                label: '二级 1-3'
              }
            ]
          },
          {
            key: 2,
            label: '一级 2',
            children: [
              {
                key: 21,
                label: '二级 2-1'
              }
            ]
          }
        ],
        filterValue: ''
      }
    },
    methods: {
      filterMethod({ value, node }) {
        return node.label.indexOf(value) > -1
      }
    }
  }
</script>
```

## 自定义内容

```html
<template>
  <c-tree ref="tree" class="custom-tree" :data="data" is-default-expand-all>
    <template v-slot:default="{node}">
      <div class="custom-treeitem">
        <span class="custom-treeitem-label">
          {{node.label}}
        </span>
        <c-icon-plus @click.stop="handleClickPlus(node)" />
        <c-icon-minus @click.stop="handleClickDelete(node)" />
      </div>
    </template>
  </c-tree>
</template>

<style>
  .custom-tree {
    width: 300px;
  }
  .custom-tree .c-icon--svg {
    margin-right: 10px;
  }
  .custom-treeitem {
    display: flex;
  }
  .custom-treeitem-label {
    flex-grow: 1;
  }
</style>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1'
              },
              {
                label: '二级 1-2'
              }
            ]
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1'
              },
              {
                label: '二级 2-2'
              }
            ]
          }
        ],
        filterValue: ''
      }
    },
    methods: {
      handleClickPlus(node) {
        this.$refs.tree.append({ label: 'item' }, node)
      },
      handleClickDelete(node) {
        this.$refs.tree.remove(node)
      }
    }
  }
</script>
```

## 自定义图标

```html
<template>
  <c-tree :data="data" key-prop="key" :default-expanded-keys="[1]">
    <template v-slot:nodeIcon="{node}">
      <c-icon-file v-if="node.isLeaf" />
      <c-icon-folder-open v-else-if="node.expanded" />
      <c-icon-folder v-else />
    </template>
    <template v-slot:expandIcon>
      <c-icon-arrow-right />
    </template>
  </c-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            key: 1,
            label: '一级 1',
            children: [
              {
                key: 11,
                label: '二级 1-1'
              },
              {
                key: 12,
                label: '二级 1-2'
              }
            ]
          },
          {
            key: 2,
            label: '一级 2',
            children: [
              {
                key: 21,
                label: '二级 2-1'
              },
              {
                key: 22,
                label: '二级 2-2'
              }
            ]
          }
        ],
        filterValue: ''
      }
    },
    methods: {
      handleClickPlus(node) {
        this.$refs.tree.append({ label: 'item' }, node)
      },
      handleClickDelete(node) {
        this.$refs.tree.remove(node)
      }
    }
  }
</script>
```

## Props

| Name                  | Description                                                                              | Type                                                                                            | Required | Default    |
| --------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------- | ---------- |
| data                  | 树的数据                                                                                 | `object[]`                                                                                      | `false`  | -          |
| key-prop              | 指定节点数据中的一个属性，用作节点的唯一标识。使用选择、多选、节点复用功能必须设置此选项 | `string`                                                                                        | `false`  | `'label'`  |
| props                 | 指定节点各项数据的属性名，具体见下表                                                     | `object`                                                                                        | `false`  | -          |
| is-default-expand-all | 是否默认展开所有节点                                                                     | `boolean`                                                                                       | `false`  | `false`    |
| default-expanded-keys | 默认展开节点的 `key` 的数组                                                              | `string[]`                                                                                      | `false`  | -          |
| is-accordion          | 是否开启手风琴模式                                                                       | `boolean`                                                                                       | `false`  | `false`    |
| selectable            | 是否可选择                                                                               | `boolean`                                                                                       | `false`  | `false`    |
| multiselectable       | 是否可多选                                                                               | `boolean`                                                                                       | `false`  | `false`    |
| default-selected-keys | 默认选择节点的 `key` 的数组                                                              | `string[]`                                                                                      | `false`  | -          |
| checkable             | 是否开启 `checkbox` 复选框                                                               | `boolean`                                                                                       | `false`  | `false`    |
| default-checked-keys  | 默认勾选节点的 `key` 的数组                                                              | `string[]`                                                                                      | `false`  | -          |
| check-strict          | 父节点 `check` 状态是否和子节点独立                                                      | `boolean`                                                                                       | `false`  | `false`    |
| click-combine-action  | 点击节点关联到的行为， `selectable = true` 时无效                                        | `'none' \| 'expand' \| 'checkbox'`                                                              | `false`  | `'expand'` |
| is-lazy-load          | 是否开启异步加载                                                                         | `boolean`                                                                                       | `false`  | `false`    |
| load-method           | 异步加载函数。更新数据的方式可以是将数据传入 `resolve` 回调函数，也支返回 `Promise` 对象 | `({ data: object, node: Node, resolve: (data: object[]) => void }) => void | Promise<object[]>` | `false`  | -          |
| filter-method         | 筛选树的节点的方法。返回 `true` 代表显示该节点， `false` 代表隐藏该节点                  | `{ value: any, data: object, node: Node } => boolean`                                           | `false`  | -          |
| filter-value          | `filter-method` 的 `value` 参数值                                                        | `any`                                                                                           | `false`  | -          |

文档中，提及的 `Node` 类型，如下描述：

```typescript
class Node {
  public tree: Tree
  public parent: Node | null
  public children: Node[]
  public sourceData: { [key: string]: any }
  public id: string
  public key: string
  public level: number
  public label: string
  public expanded: boolean
  public selected: boolean
  public checked: boolean
  public indeterminate: boolean
  public disabled: boolean
  public display: boolean
  public loading: boolean
}
```

> `Node` 的类型，可能会随着版本升级而变化，如果需要进行查找、缓存部分的数据，推荐使用 `data`。

## `props` 配置选项

| Name     | Description                    | Default      |
| -------- | ------------------------------ | ------------ |
| label    | 指定节点显示文本的属性名       | `'label'`    |
| children | 指定子节点列表的属性名         | `'children'` |
| isLeaf   | 指定节点是否为叶子节点的属性名 | `'isLeaf'`   |
| disabled | 指定节点不可用的属性名         | `'disabled'` |

## Events

`data` 指从 `data` 属性传入的树的原始数据中，节点所对应的数据对象。

`node` 指组件内部使用的映射后的节点数据，包含节点当前状态。

| Name        | Description          | Parameters                                                                                                                                                      |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node-click  | 节点被点击           | `{ data: object, node: Node }`                                                                                                                                  |
| select      | 节点选择状态变化     | `{ data: object, node: Node }`                                                                                                                                  |
| check       | 树勾选的节点发生变化 | `{ checkedNodes: Node[], checkedKeys: string[], checkedNodesWithHalf: Node[], checkedKeysWithHalf: string[], checkedLeafNodes: [], checkedLeafKeys: string[] }` |
| node-loaded | 节点下的数据加载完毕 | `{ data: object, node: Node }`                                                                                                                                  |
| node-expand | 节点展开             | `{ data: object, node: Node, expanded: boolean }`                                                                                                               |

## Slots

| Name       | Description   | Parameters                     |
| ---------- | ------------- | ------------------------------ |
| default    | 节点内容      | `{ data: object, node: Node }` |
| nodeIcon   | 节点图标      | `{ data: object, node: Node }` |
| expandIcon | 折叠/展开图标 | -                              |

## Methods

下表中的 `targetNode` ，可以是 `key` 、节点原始数据或节点对应的 `Node`

`data` 指新节点的数据

| Name             | Description                              | Parameters                                         | Return     |
| ---------------- | ---------------------------------------- | -------------------------------------------------- | ---------- |
| getNode          | 根据 `key` 或 `data` 获取节点            | `(targetNode: Node)`                               | `Node`     |
| getSelectedNodes | 获取所有选择的节点                       | -                                                  | `Node[]`   |
| getSelectedKeys  | 获取所有选择的节点                       | -                                                  | `Node[]`   |
| setSelectedNode  | 设置指定的节点的选择状态                 | `(targetNode: Node, selected: boolean)`            | -          |
| setSelectedNodes | 设置当前选择的节点                       | `(targetNodes: Node[])`                            | -          |
| getCheckedNodes  | 获取所有勾选的节点                       | `(leafOnly: boolean, includeHalfChecked: boolean)` | `Node[]`   |
| getCheckedKeys   | 获取所有勾选的节点的 `key`               | `(leafOnly: boolean, includeHalfChecked: boolean)` | `string[]` |
| setCheckedNode   | 设置指定的节点的勾选状态                 | `(targetNode: Node, checked: boolean)`             | -          |
| setCheckedNodes  | 设置当前勾选的节点                       | `(targetNodes: Node[])`                            | -          |
| setNodeChildren  | 设置指定节点的子节点列表                 | `(targetNode: Node, children: Node[])`             | -          |
| prepend          | 向指定节点的第一个子节点前插入新的节点   | `(data: object, targetNode: Node)`                 | -          |
| append           | 向指定节点的最后一个子节点后插入新的节点 | `(data: object, targetNode: Node)`                 | -          |
| insertBefore     | 向指定节点前插入新的节点                 | `(data: object, targetNode: Node)`                 | -          |
| insertAfter      | 向指定节点后插入新的节点                 | `(data: object, targetNode: Node)`                 | -          |
| remove           | 删除指定节点                             | `(targetNode: Node)`                               | -          |
| expandNode       | 展开指定的节点                           | `(targetNode: Node)`                               | -          |
| collapseNode     | 折叠指定的节点                           | `(targetNode: Node)`                               | -          |
