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
      v-model="node.checked"
      @change="checkChange"
      :indeterminate="indeterminate"
    )
    .c-tree__label
      c-node-label(:node="node")
  .c-tree_children(v-show="showChildren")
    c-tree-node(
      ref="children"
      v-for="child in node.children"
      :node="child"
      :level="level + 1"
    )
</template>

<script>
import VueTypes from 'vue-types'
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
      return this.hasChildren && this.node.expanded
    },
    iconName () {
      return this.node.expanded ? 'chevron-down' : 'chevron-right'
    }
  },
  data () {
    return {
      indeterminate: false
    }
  },
  created () {
    const { node } = this
    const parentNode = this.$parent.node
    if (typeof node.checked === 'undefined') this.$set(node, 'checked', false)
    node.checked = (parentNode && parentNode.checked) || node.checked
    if (typeof node.expanded === 'undefined') this.$set(node, 'expanded', false)

    this.$on('parent-check-change', checked => {
      node.checked = checked
      this.indeterminate = false
      this.updateChildren(checked)
    })

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
      this.node.expanded = !this.node.expanded
      this.$emit('node-click', this.node)
    },
    checkChange (checked) {
      this.$parent.$emit('child-check-change', checked)
      this.updateChildren(checked)
      this.$tree.$emit('check-change', this.node, this.node.checked)
    },
    childCheckChange (checked) {
      const $children = this.$refs.children
      const checkedCount = $children.filter(c => c.node.checked).length
      const total = $children.length
      this.node.checked = checkedCount === total
      this.indeterminate = checkedCount > 0 && checkedCount < total
      this.$parent.$emit('child-check-change', this.node.checked)
    },
    updateChildren (checked) {
      if (!this.hasChildren) return
      this.$refs.children
        .forEach(c => c.$emit('parent-check-change', checked))
    }
  }
}
</script>
