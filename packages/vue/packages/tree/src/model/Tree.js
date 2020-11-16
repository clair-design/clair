import Node from './Node'

export default class Tree {
  constructor(data = [], props = {}) {
    // tree vue component props
    Object.keys(props).forEach(key => {
      this[key] = props[key]
    })

    this.nodeMap = {}
    this.root = new Node(data, this)

    this.selectedNodes = []

    // init
    this.setSelectedNodes(this.defaultSelectedKeys)
    this.defaultCheckedKeys.forEach(key => {
      const node = this.getNode(key)
      if (node) {
        node.setChecked(true)
      }
    })
  }

  /**
   * @param { Node | object | string } value Node instance or source data or key
   * @returns { Node }
   */
  getNode(value) {
    if (value instanceof Node) {
      return value
    }
    const key = typeof value === 'object' ? value[this.keyProp] : value
    return this.nodeMap[key] || null
  }

  _valuesToNodes(values) {
    const nodes = []
    values.forEach(value => {
      const node = this.getNode(value)
      if (node) {
        nodes.push(node)
      }
    })
    return nodes
  }

  adjustNodesDisplay(predicate, value) {
    const traverse = function (node) {
      let display = !value || predicate({ value, node, data: node.sourceData })
      node.children.forEach(child => {
        const childDisplay = traverse(child)
        display = display || childDisplay
      })
      node.display = display
      return display
    }
    this.root.children.forEach(traverse)
  }

  getSelectedNodes() {
    return this.selectedNodes.slice()
  }

  getSelectedKeys() {
    return this.selectedNodes.map(node => node.key)
  }

  setSelectedNode(value, selected) {
    const node = this.getNode(value)
    if (!node) {
      return
    }
    const { selectedNodes } = this
    if (this.multiselectable) {
      if (selected) {
        selectedNodes.push(node)
      } else {
        selectedNodes.splice(selectedNodes.indexOf(node), 1)
      }
    } else {
      const currentSelectNode = selectedNodes[0] || {}
      if (selected) {
        currentSelectNode.selected = false
        this.selectedNodes = [node]
      } else if (currentSelectNode === node) {
        this.selectedNodes = []
      }
    }
    node.selected = Boolean(selected)
  }

  setSelectedNodes(values) {
    if (!Array.isArray(values)) {
      return
    }
    const _nodes = this._valuesToNodes(values)
    const nodes =
      this.multiselectable || _nodes.length === 0 ? _nodes : [_nodes[0]]

    this.selectedNodes.forEach(node => {
      node.selected = false
    })

    nodes.forEach(node => {
      node.selected = true
    })
    this.selectedNodes = nodes
  }

  getCheckedNodes(leafOnly, includeHalfChecked) {
    const nodes = []
    const traverse = node => {
      node.children.forEach(child => {
        // leafOnly = true 时，所有非叶子节点不应该被返回
        const shouldAbort = leafOnly && !child.isLeaf
        if (!shouldAbort) {
          if ((child.indeterminate && includeHalfChecked) || child.checked) {
            nodes.push(child)
          }
        }
        traverse(child)
      })
    }
    traverse(this.root)
    return nodes
  }

  getCheckedKeys(leafOnly, includeHalfChecked) {
    return this.getCheckedNodes(leafOnly, includeHalfChecked).map(
      node => node.key
    )
  }

  setCheckedNode(value, checked) {
    const node = this.getNode(value)
    if (node) {
      node.setChecked(checked, { force: true })
    }
  }

  setCheckedNodes(values) {
    if (!Array.isArray(values)) {
      return
    }
    const { nodeMap } = this
    const nodes = this._valuesToNodes(values)

    Object.keys(nodeMap).forEach(key => {
      const node = nodeMap[key]
      node.setChecked(false)
    })

    nodes.forEach(node => {
      node.setChecked(true)
    })
  }

  setNodeChildren(value, children) {
    const node = this.getNode(value)
    if (node) {
      node.setChildren(children)
    }
  }

  prepend(newNode, value) {
    const node = this.getNode(value)
    if (!node) {
      return null
    }
    return node.insertChild(newNode, 0)
  }

  append(newNode, value) {
    const node = this.getNode(value)
    if (!node) {
      return null
    }
    return node.insertChild(newNode, node.children.length)
  }

  insertBefore(newNode, value) {
    const node = this.getNode(value)
    if (!node) {
      return null
    }
    return node.parent.insertBefore(newNode, node)
  }

  insertAfter(newNode, value) {
    const node = this.getNode(value)
    if (!node) {
      return null
    }
    return node.parent.insertAfter(newNode, node)
  }

  remove(value) {
    const node = this.getNode(value)
    if (!node) {
      return
    }
    node.parent.removeChild(node)
  }

  expandNode(value) {
    const node = this.getNode(value)
    if (node) {
      node.expand()
    }
  }

  collapseNode(value) {
    const node = this.getNode(value)
    if (node) {
      node.collapse()
    }
  }

  mountNode(node) {
    if (this.keyProp) {
      if (!node.key) {
        console.warn('key is required')
      } else {
        this.nodeMap[node.key] = node
      }
    }
  }

  destroyNode(node) {
    this.setSelectedNode(node, false)
    if (this.keyProp) {
      delete this.nodeMap[node.key]
    }
  }
}
