<template lang="pug">
.c-tree__node
  .c-tree__title(
    @click="onNodeClick"
    :class="{ 'is-leaf': !hasChildren }"
  )
    c-icon(
      valign="middle"
      v-if="hasChildren"
      :name="iconName"
    )
    c-checkbox(
      v-if="$tree.checkable"
      v-model="checked"
      @change="checkChange"
      :indeterminate="indeterminate"
    )
    .c-tree__label
      c-node-label(:node="node")
  .c-tree_children(v-show="showChildren")
    c-tree-node(
      ref="children"
      v-for="(child, index) in node.children"
      :key="index"
      :node="child"
      :level="level + 1"
    )
</template>

<script>
import { VueTypes } from '@util'
import NodeLabel from './_node-label.vue'

export default {
  name: 'c-tree-node',
  props: {
    node: VueTypes.object.isRequired,
    level: VueTypes.integer.isRequired
  },
  inject: ['$tree'],
  components: {
    'c-node-label': NodeLabel
  },
  computed: {
    hasChildren () {
      const { children } = this.node
      return children && children.length
    },
    showChildren () {
      return this.hasChildren && this.expanded
    },
    iconName () {
      return this.expanded ? 'chevron-down' : 'chevron-right'
    },
    id () {
      return this.node[this.$tree.nodeKey]
    }
  },
  data () {
    return {
      indeterminate: false,
      expanded: false,
      checked: false
    }
  },

  created () {
    const { $tree, $parent, id } = this

    // expanded keys
    this.expanded = this.$tree.defaultExpandAll || $tree.expandedKeys[id]

    // checked status
    this.checked = $parent.checked || $tree.checkedKeys[id]

    // reactive to expandedKeys or checkedKeys change
    if (id !== void 0) {
      if ($parent.checked) $tree.$emit('checked-change', id, true)
      this.$watch('$tree.expandedKeys', keys => {
        this.expanded = keys[id]
      })
      this.$watch('$tree.checkedKeys', keys => {
        this.checked = keys[id]
      })
    }

    // parent node check changed, notify children
    this.$on('parent-check-change', checked => {
      this.checked = checked
      this.indeterminate = false
      this.updateChildren(checked)
      this.$tree.$emit('checked-change', this.id, checked)
    })

    // child check changed, update self
    this.$on('child-check-change', this.childCheckChange)
  },
  methods: {
    getChildren () {
      if (!this.hasChildren) return [this]
      return this.$refs.children.reduce((arr, child) => {
        return arr.concat(child.getChildren())
      }, [this])
    },
    onNodeClick () {
      this.setExpanded(!this.expanded)
      this.$emit('node-click', this.node)
    },
    setExpanded (expanded) {
      this.expanded = expanded
      if (this.id !== void 0) {
        this.$tree.$emit('expanded-change', this.id, this.expanded)
      }
    },
    checkChange (checked) {
      this.$parent.$emit('child-check-change', checked)
      this.updateChildren(checked)
      this.$tree.$emit('check-change', this.node, this.checked)
    },
    childCheckChange (checked) {
      const $children = this.$refs.children
      const checkedCount = $children.filter(c => c.checked).length
      const total = $children.length
      this.checked = checkedCount === total
      this.indeterminate = checkedCount > 0 && checkedCount < total
      this.$parent.$emit('child-check-change', this.checked)
      this.$tree.$emit('checked-change', this.id, checked)
    },
    updateChildren (checked) {
      if (!this.hasChildren) return
      this.$refs.children
        .forEach(c => c.$emit('parent-check-change', checked))
    }
  }
}
</script>
