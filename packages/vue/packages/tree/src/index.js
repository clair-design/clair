import Tree from './model/Tree'
import CTreeNode from './tree-node'

function keyPropCheck(vm, value = '') {
  let needKey = false
  if (Array.isArray(value)) {
    needKey = value.reduce((prev, i) => prev && typeof i === 'string', needKey)
  } else {
    needKey = typeof value === 'string'
  }
  if (needKey && !vm.keyProp) {
    throw new Error('nodeKey is required')
  }
}

export default {
  name: 'CTree',
  props: {
    data: {
      type: Array,
      require: true
    },
    keyProp: {
      type: String,
      default: 'label'
    },
    props: {
      type: Object,
      default: () => ({})
    },
    isDefaultExpandAll: Boolean,
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    isAccordion: Boolean,
    defaultSelectedKeys: {
      type: Array,
      default: () => []
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    selectable: Boolean,
    multiselectable: Boolean,
    checkable: Boolean,
    checkStrict: Boolean,
    clickCombineAction: {
      type: String,
      validator: val => ['none', 'expand', 'checkbox'].includes(val)
    },
    isLazyLoad: Boolean,
    loadMethod: Function,
    filterMethod: Function,
    filterValue: [Number, String, Object, Array, Function]
  },
  data() {
    return {
      tree: this.getTree()
    }
  },
  provide() {
    return {
      $treeVm: this
    }
  },
  watch: {
    keyProp() {
      this.tree = this.getTree()
    },
    props() {
      this.setNodeChildren(this.tree.root, this.data)
    },
    data(data) {
      this.setNodeChildren(this.tree.root, data)
    },
    'tree.selectedNodes': function (val) {
      this.$emit('select', { detail: val })
    },
    'tree.root.loaded': function (val) {
      if (val) {
        this.$emit('node-loaded', {
          detail: {
            node: this.tree.root,
            data: this.tree.root.sourceData
          }
        })
      }
    },
    filterMethod: function () {
      this.tree.adjustNodesDisplay(this.filterMethod, this.filterValue)
    },
    filterValue: function () {
      this.tree.adjustNodesDisplay(this.filterMethod, this.filterValue)
    }
  },
  methods: {
    getTree() {
      return new Tree(this.data, {
        keyProp: this.keyProp,
        props: this.props,
        isDefaultExpandAll: this.isDefaultExpandAll,
        multiselectable: this.multiselectable,
        defaultExpandedKeys: this.defaultExpandedKeys,
        isAccordion: this.isAccordion,
        defaultSelectedKeys: this.defaultSelectedKeys,
        defaultCheckedKeys: this.defaultCheckedKeys || [],
        checkStrict: this.checkStrict,
        isLazyLoad: this.isLazyLoad,
        loadMethod: this.loadMethod || (() => Promise.resolve())
      })
    },
    getSelectedNodes() {
      return this.tree.getSelectedNodes()
    },
    getSelectedKeys() {
      keyPropCheck(this)
      return this.tree.getSelectedKeys()
    },
    setSelectedNode(value, selected) {
      keyPropCheck(this, value)
      this.tree.setSelectedNode(value, selected)
    },
    setSelectedNodes(values) {
      keyPropCheck(this, values)
      this.tree.setSelectedNodes(values)
    },
    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    getCheckedKeys(leafOnly, includeHalfChecked) {
      keyPropCheck(this)
      return this.tree.getCheckedKeys(leafOnly, includeHalfChecked)
    },
    setCheckedNode(value, checked) {
      keyPropCheck(this, value)
      this.tree.setCheckedNode(value, checked)
    },
    setCheckedNodes(values) {
      keyPropCheck(this, values)
      this.tree.setCheckedNodes(values)
    },
    getNode(value) {
      keyPropCheck(this, value)
      return this.tree.getNode(value)
    },
    setNodeChildren(value, children) {
      keyPropCheck(this, value)
      this.tree.setNodeChildren(value, children)
    },
    prepend(data, value) {
      keyPropCheck(this, value)
      return this.tree.prepend(data, value)
    },
    append(data, value) {
      keyPropCheck(this, value)
      return this.tree.append(data, value)
    },
    insertBefore(data, value) {
      return this.tree.insertBefore(data, value)
    },
    insertAfter(data, value) {
      return this.tree.insertAfter(data, value)
    },
    remove(value) {
      this.tree.remove(value)
    },
    expandNode(value) {
      this.tree.expandNode(value)
    },
    collapseNode(value) {
      this.tree.collapseNode(value)
    }
  },
  render() {
    return (
      <ul class="c-tree" role="tree">
        {this.tree.root.children.map(child =>
          child.display ? (
            <CTreeNode
              key={this.keyProp ? child.key : child.id}
              node={child}
              childrenData={child.getValueOfData('children')}
              selectable={this.selectable}
              checkable={this.checkable}
              clickCombineAction={this.clickCombineAction}
              scopedSlots={this.$scopedSlots}
            />
          ) : null
        )}
      </ul>
    )
  }
}
