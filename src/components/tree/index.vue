<template lang="pug">
.c-tree
  c-tree-node(
    v-for="node in nodes"
    :node="node"
    :level="1"
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
    renderLabel: {
      type: Function,
      default: null
    },
    checkable: VueTypes.bool.def(false)
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
      const isLeaf = n => !n.children
      const getNode = c => c.node
      const isChecked = n => n.checked
      const allNodes = this.$children.reduce(
        (arr, branch) => arr.concat(branch.getChildren()),
        []
      )
      const checkedNodes = allNodes.map(getNode).filter(isChecked)
      if (leafOnly) return checkedNodes.filter(isLeaf)
      return checkedNodes
    }
  }
}
</script>
