<template lang="pug">
.c-tree
  c-tree-node(
    v-for="(node, index) in nodes"
    :key="index"
    :node="node"
    :level="1"
  )

</template>

<script>
import { VueTypes } from '../../scripts/utils'
import TreeNode from './tree-node.vue'

import './index.css'

export default {
  name: 'c-tree',
  props: {
    nodes: VueTypes.arrayOf(Object).isRequired,
    checkable: VueTypes.bool.def(false),
    defaultExpandedKeys: VueTypes.array,
    defaultExpandAll: VueTypes.bool.def(false),
    defaultCheckedKeys: VueTypes.array,
    nodeKey: VueTypes.string.def('id')
  },
  provide () {
    return {
      '$tree': this
    }
  },
  components: {
    'c-tree-node': TreeNode
  },
  data () {
    return {
      isRoot: true,
      expandedKeys: {},
      checkedKeys: {}
    }
  },
  watch: {
    defaultExpandedKeys: {
      immediate: true,
      handler (keys) {
        this.expandedKeys = keys.reduce((obj, key) => {
          obj[key] = true
          return obj
        }, {})
      }
    },
    defaultCheckedKeys: {
      immediate: true,
      handler (keys) {
        console.log('checked keys', keys)
        this.checkedKeys = keys.reduce((obj, key) => {
          obj[key] = true
          return obj
        }, {})
      }
    }
  },
  created () {
    this.$on('expanded-change', (key, expanded) => {
      this.expandedKeys[key] = expanded
    })
    this.$on('checked-change', (key, checked) => {
      if (key === void 0) return
      this.checkedKeys[key] = checked
    })
  },
  methods: {
    setExpandedByNode (node, expanded) {
      this.filterNodes($node => $node.node === node)
        .forEach($node => $node.setExpanded(expanded))
    },
    getCheckedNodes (leafOnly) {
      const filter = $node => {
        const isChecked = $node.checked
        if (leafOnly) return !$node.node.children && isChecked
        return isChecked
      }
      return this.filterNodes(filter).map($node => $node.node)
    },
    filterNodes (filter) {
      const allNodes = this.$children.reduce(
        (arr, branch) => arr.concat(branch.getChildren()),
        []
      )
      const filtered = allNodes.filter(filter)
      return filtered
    },
    getExpandedNodes () {
      const filter = $node => $node.expanded
      return this.filterNodes(filter).map($node => $node.node)
    },
    getExpandedKeys () {
      return this.getExpandedNodes().map(node => node[this.nodeKey])
    }
  }
}
</script>
