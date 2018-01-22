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

## 自定义节点显示

```html
<c-tree :nodes="nodes">
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
  },
  methods: {
    add (node, $node) {
      const { children } = node
      const newNode = { label: `新节点${count++}` }
      if (Array.isArray(children)) {
        children.push(newNode)
      } else {
        this.$set(node, 'children', [newNode])
        console.log(node)
      }
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

```html
<c-tree
  :nodes="nodes"
  checkable
  @check-change="onCheckChange"
>
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
          expanded: true,
          children: [
            {
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

<c-button primary @click="getCheckedNodes(false)">所有选中节点</c-button>
<c-button primary @click="getCheckedNodes(true)">选中的叶节点</c-button>

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
          expanded: true,
          children: [
            {
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
      this.$alert({ msg: checked})
    }
  }
}
</script>
```
