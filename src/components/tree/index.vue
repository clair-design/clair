<template lang="pug">
.c-tree
  c-tree-node(
    v-for="node in nodes"
    :node="node"
    :level="1"
    :default-expanded-keys="defaultExpandedKeys"
  )

</template>

<script>
import VueTypes from 'vue-types'
import TreeNode from './tree-node.vue'

import './index.css'

export default {
  name: 'c-tree',
  props: {
    nodes: VueTypes.arrayOf(Object).isRequired,
    checkable: VueTypes.bool.def(false),
    defaultExpandedKeys: VueTypes.array,
    defaultExpandAll: VueTypes.bool.def(false),
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
      isRoot: true
    }
  },
  methods: {
    getCheckedNodes (leafOnly) {
      const filter = node => {
        const isChecked = node.checked
        if (leafOnly) return !node.children && isChecked
        return isChecked
      }
      return this.filterNodes(filter)
    },
    filterNodes (filter) {
      const getNode = c => c.node
      const allNodes = this.$children.reduce(
        (arr, branch) => arr.concat(branch.getChildren()),
        []
      )
      const filtered = allNodes.map(getNode).filter(filter)
      return filtered
    },
    getExpandedNodes () {
      const filter = node => node.expanded
      return this.filterNodes(filter)
    },
    getExpandedKeys () {
      return this.getExpandedNodes().map(node => node[this.nodeKey])
    }
  }
}
</script>
