---
title: Tree
route: /component/tree
layout: component
---

# Tree 树形组件

树形组件用于展示具有多层结构的数据，比如一个文件夹、省市区数据等。Clair 的树行组件提供了多级数据的展示、展开收起和选择等功能。

## 数据展示

给 `c-tree` 传递 `nodes` 属性即可将其展示出来。

```html
<c-tree :nodes="nodes">
</c-tree>

<script>
export default {
  data () {
    return {
      nodes: [
        {
          label: '藻类',
          children: [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
        },
        {
          label: '苔藓',
          children: [
            { label: '地钱' },
            { label: '角苔' },
            { label: '苔藓植物门' }
          ]
        },
        {
          label: '蕨类',
          children: [
            { label: '石松' },
            { label: '蕨类植物门' }
          ]
        },
        {
          label: '种子植物',
          children: [
            {
              label: '被子',
              children: [
                { label: '睡莲目' },
                { label: '木兰藤目' }
              ]
            },
            { label: '苏铁' },
            { label: '银杏' },
            { label: '松柏' }
          ]
        }
      ]
    }
  }
}
</script>
```

## 默认展开

设置默认展开的方式是给 `c-tree` 传入 `default-expanded-keys` 属性。使用这种方式时，需要每个节点有一个唯一的标识，比如 `id`。

```html
<c-tree
  :nodes="nodes"
  :default-expanded-keys="[4, 5]"
  node-key="id"
>
</c-tree>

<script>
export default {
  data () {
    return {
      nodes: [
        {
          id: 1,
          label: '藻类',
          expanded: true,
          children: [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
        },
        {
          id: 2,
          label: '苔藓',
          children: [
            { label: '地钱' },
            { label: '角苔' },
            { label: '苔藓植物门' }
          ]
        },
        {
          id: 3,
          label: '蕨类',
          children: [
            { label: '石松' },
            { label: '蕨类植物门' }
          ]
        },
        {
          id: 4,
          label: '种子植物',
          children: [
            {
              id: 5,
              label: '被子',
              children: [
                { label: '睡莲目' },
                { label: '木兰藤目' }
              ]
            },
            { label: '苏铁' },
            { label: '银杏' },
            { label: '松柏' }
          ]
        }
      ]
    }
  }
}
</script>
```

如果想默认展开所有节点，将 `default-expand-all` 属性设置为 `true` 即可。

```html
<c-tree :nodes="nodes" default-expand-all>
</c-tree>

<script>
export default {
  data () {
    return {
      nodes: [
        {
          label: '种子植物',
          children: [
            {
              label: '被子',
              children: [
                { label: '睡莲目' },
                { label: '木兰藤目' }
              ]
            },
            { label: '苏铁' },
            { label: '银杏' },
            { label: '松柏' }
          ]
        }
      ]
    }
  }
}
</script>
```

## 自定义节点显示

使用 Vue 的 [Scoped Slots](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)，你可以使用模版自定义每个节点的显示。

```html
<c-tree :nodes="nodes" default-expand-all>
  <div slot="label" slot-scope="{node, $node}">
    <span>{{ node.label }}</span>
    <c-icon name="x" valign="middle" @click.native.stop="remove($node)" />
    <c-icon name="plus" valign="middle" @click.native.stop="add(node, $node)" />
  </div>
</c-tree>

<script>
let count = 0

export default {
  data () {
    return {
      nodes: [
        {
          label: '藻类',
          children: [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
        }
      ]
    }
  },
  methods: {
    add (node, $node) {
      const { children } = node
      const newNode = { label: `新节点${count++}` }
      if (Array.isArray(children)) {
        children.push(newNode)
      } else {
        this.$set(node, 'children', [newNode])
      }
      $node.setExpanded(true)
    },
    remove ($node) {
      const $parent = $node.$parent
      const siblings = $parent.isRoot ? $parent.nodes : $parent.node.children
      const node = $node.node
      const index = siblings.indexOf(node)
      siblings.splice(index, 1)
    }
  }
}
</script>

<style>
  .c-icon {
    float: right;
    margin-right: 0.5em;
  }

  .c-icon:hover {
    color: #70abe6;
  }
</style>
```

## 可选择

设置 `checkable` 属性可以让组件的节点变成可勾选的。默认选中的节点可以通过 `default-checked-keys` 属性设置。

```html
<c-tree
  :nodes="nodes"
  checkable
  :default-checked-keys="defaultChecked"
  @check-change="onCheckChange"
>
</c-tree>

<script>
export default {
  data () {
    return {
      defaultChecked: [0, 8],
      nodes: [
        {
          id: 0,
          label: '藻类',
          children: [
            { id: 1, label: '绿藻' },
            { id: 2, label: '轮藻' }
          ]
        },
        {
          id: 3,
          label: '苔藓',
          children: [
            { id: 4, label: '地钱' },
            { id: 5, label: '角苔' },
            { id: 6, label: '苔藓植物门' }
          ]
        },
        {
          id: 7,
          label: '蕨类',
          children: [
            { id: 8, label: '石松' },
            { id: 9, label: '蕨类植物门' }
          ]
        },
        {
          id: 10,
          label: '种子植物',
          expanded: true,
          children: [
            {
              id: 11,
              label: '被子',
              checked: true,
              children: [
                { id: 12, label: '睡莲目' },
                { id: 13, label: '木兰藤目' }
              ]
            },
            { id: 14, label: '苏铁' },
            { id: 15, label: '银杏' },
            { id: 16, label: '松柏' }
          ]
        }
      ]
    }
  },
  methods: {
    onCheckChange(node, checked) {
      console.log(node, checked)
    }
  }
}
</script>
```

## 获取选中节点

```html
<c-tree :nodes="nodes" checkable ref="tree">
</c-tree>

<c-button primary @click="getCheckedNodes(false)">获取选中的节点</c-button>
<c-button primary @click="getCheckedNodes(true)">获取选中的叶节点</c-button>
<c-button primary @click="getExpandedNodes">获取展开的节点</c-button>
<c-button primary @click="getExpandedKeys">获取展开的节点Key</c-button>

<script>
export default {
  data () {
    return {
      nodes: [
        {
          id: 1,
          label: '藻类',
          children: [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
        },
        {
          id: 2,
          label: '苔藓',
          children: [
            { label: '地钱' },
            { label: '角苔' },
            { label: '苔藓植物门' }
          ]
        },
        {
          id: 3,
          label: '蕨类',
          children: [
            { label: '石松' },
            { label: '蕨类植物门' }
          ]
        },
        {
          id: 4,
          label: '种子植物',
          children: [
            {
              id: 5,
              label: '被子',
              checked: true,
              children: [
                { label: '睡莲目' },
                { label: '木兰藤目' }
              ]
            },
            { label: '苏铁' },
            { label: '银杏' },
            { label: '松柏' }
          ]
        }
      ]
    }
  },
  methods: {
    getCheckedNodes (leafOnly) {
      const checked = this.$refs.tree
        .getCheckedNodes(leafOnly)
        .map(node => node.label)
        .join(', ')
      this.$alert({ msg: checked })
    },
    getExpandedNodes () {
      const expanded = this.$refs.tree
        .getExpandedNodes()
        .map(node => node.label)
        .join(', ')
      this.$alert({ msg: expanded })
    },
    getExpandedKeys () {
      const keys = this.$refs.tree
        .getExpandedKeys()
        .join(', ')
      this.$alert({ msg: keys })
    }
  }
}
</script>
```
