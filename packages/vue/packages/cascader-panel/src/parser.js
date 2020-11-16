'use strict'
import { assign } from 'src/utils'
/** analysis data and manage data */
let node_id = 0
const defaultScheme = {
  label: 'label',
  value: 'value',
  children: 'children',
  isLeaf: 'isLeaf',
  disabled: 'disabled'
}

function isCorrectData(data) {
  return 'label' in data && 'value' in data
}

function formatData(data, dataMap = {}) {
  const scheme = assign(defaultScheme, dataMap)
  const schemeEntries = Object.entries(scheme)

  function transform(option) {
    const newOption = {}
    if (Array.isArray(option[scheme.children])) {
      newOption.children = option[scheme.children].map(transform)
    }
    schemeEntries.forEach(([key, customKey]) => {
      if (key === 'children') return
      if (customKey in option) {
        newOption[key] = option[customKey]
      }
    })
    return isCorrectData(newOption) ? newOption : null
  }

  return data.map(transform).filter(Boolean)
}
class Node {
  constructor(data, config, parentNode) {
    this.data = data
    this.config = config

    this.label = String(this.data.label)
    this.value = this.data.value

    this.parent = parentNode || null
    this.level = !this.parent ? 1 : this.parent.level + 1
    this.nid = node_id++

    // data for lazy load
    this.loading = false
    this.loaded = !config.lazy

    this.disabled = this.checkDisabled()

    this.getNodeText = this.getNodeText.bind(this)

    // children data, lazy node后需重新设置此值
    // lazy模式下，不加载未loaded的节点
    const { hasChildren, children } = this.initChildren()
    this.hasChildren = hasChildren
    this.children = children

    // isLeaf 属性赋值顺序不能改变。 leaf判断需要在设置children之后，设置children需要在判断是否disabled之后，
    // lazy node需重新设置此值
    this.isLeaf = this.checkLeaf()

    // pathNode data
    this.nodePath = this.getPathNode()
    this.valuePath = this.nodePath.map(node => node.value)
    this.labelPath = this.nodePath.map(node => node.label)
  }

  getPathNode() {
    const nodes = [this]
    let { parent } = this
    while (parent) {
      nodes.unshift(parent)
      ;({ parent } = parent)
    }
    return nodes
  }

  initChildren() {
    /* 懒加载模式下，未加载的节点默认为无children，不做进一步处理 */
    if (!this.loaded) {
      return { hasChildren: false, children: [] }
    }
    let childrenData = this.data.children
    let children = []
    childrenData = Array.isArray(childrenData) ? childrenData : []
    const hasChildren = childrenData.length > 0
    if (hasChildren) {
      children = childrenData.map(child => new Node(child, this.config, this))
    }
    return { hasChildren: hasChildren, children: children }
  }

  checkDisabled() {
    const { data, parent } = this
    // 当前配置的和父元素，任意一项是true，则为true
    return Boolean(data.disabled) || Boolean(parent?.disabled)
  }

  checkLeaf() {
    const { data, loaded, hasChildren, children } = this
    const { lazy } = this.config
    if (lazy) {
      let isLeaf
      if (typeof data.isLeaf !== 'undefined') {
        isLeaf = Boolean(data.isLeaf)
      } else {
        isLeaf = loaded ? !children.length : false
      }
      return isLeaf
    }
    return !hasChildren
  }

  getNodeText(separator, start, end) {
    const { labelPath } = this
    return labelPath.slice(start, end).join(separator)
  }
}

class Parser {
  constructor(data, config) {
    this.config = config
    const treeData = formatData(data, config.dataMap)
    this.treeNodes = treeData.map(nodeData => new Node(nodeData, this.config))
    // 树叶节点
    this.getLeafNodes = this.getLeafNodes.bind(this)
    // 扁平化数据
    this.getFlatteningNodes = this.getFlatteningNodes.bind(this)

    this._getFlatteningCache = { leaf: false, all: false }
    this._leafNodes = []
    this._flatteningNodes = []
  }

  _getFlatteningData(data, leafOnly) {
    return data.reduce((res, node) => {
      let flatteningData = res
      if (node.isLeaf) {
        flatteningData.push(node)
      } else {
        !leafOnly && flatteningData.push(node)
        flatteningData = flatteningData.concat(
          this._getFlatteningData(node.children, leafOnly)
        )
      }
      return flatteningData
    }, [])
  }

  getLeafNodes() {
    if (this._getFlatteningCache.leaf) return this._leafNodes
    this._getFlatteningCache.leaf = true
    this._leafNodes = this._getFlatteningData(this.treeNodes, true)
    return this._leafNodes
  }

  getFlatteningNodes() {
    if (this._getFlatteningCache.all) return this._flatteningNodes
    this._getFlatteningCache.all = true
    this._flatteningNodes = this._getFlatteningData(this.treeNodes, false)
    return this._flatteningNodes
  }

  getNodes() {
    return this.treeNodes
  }

  appendNodes(data, parent) {
    const placeToPlace = parent?.children ?? this.treeNodes
    const treeData = formatData(data, this.config.dataMap)
    treeData.forEach(nodeData => {
      placeToPlace.push(new Node(nodeData, this.config, parent))
    })
    if (parent) parent.hasChildren = true
  }
}

export default Parser
