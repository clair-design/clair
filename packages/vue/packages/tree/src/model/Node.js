function getChecked(node) {
  let hasChecked = false
  let hasNotChecked = false
  const len = node.children.length
  for (let i = 0; i < len; i++) {
    const child = node.children[i]
    if (child.indeterminate) {
      hasChecked = true
      hasNotChecked = true
    }
    if (child.checked) {
      hasChecked = true
    } else {
      hasNotChecked = true
    }
    if (hasChecked && hasNotChecked) {
      break
    }
  }
  if (hasChecked && hasNotChecked) {
    return {
      indeterminate: true,
      checked: false
    }
  }
  return {
    indeterminate: false,
    checked: hasChecked
  }
}

const getId = (function () {
  let counter = 0
  return function getId() {
    return counter++
  }
})()

export default class Node {
  constructor(data, parent) {
    const isRoot = Array.isArray(data)
    this.tree = isRoot ? parent : parent.tree
    this.parent = isRoot ? null : parent
    this.sourceData = data

    this.id = getId()
    this.key = isRoot ? '__root__' : data[this.tree.keyProp]
    this.tree.mountNode(this)

    // attributes
    this.children = []
    this.level = this.parent ? this.parent.level + 1 : 0
    this.label = this.getValueOfData('label')

    // status
    this.expanded =
      this.tree.isDefaultExpandAll ||
      this.tree.defaultExpandedKeys.includes(this.key)
    this.selected = false
    // 备注： indeterminate = true 时，保证 checked = false
    this.checked = false
    this.indeterminate = false
    this.disabled = Boolean(
      this.getValueOfData('disabled') || (this.parent && this.parent.disabled)
    )
    this.display = true
    this.loading = false

    this.setChildren(isRoot ? data : this.getValueOfData('children'))
    this.updateChecked()

    this.isLeaf =
      this.isLeaf && (!this.tree.isLazyLoad || this.getValueOfData('isLeaf'))
    this.loaded = Boolean(this.children.length)
    this.callbackQueue = []

    if (this.tree.isLazyLoad && this.expanded && !this.isLeaf) {
      this.load()
    }
  }

  /**
   * 根据属性名，获取经过 tree.props 配置映射以后的，原始数据对应的属性值
   */
  getValueOfData(propName) {
    const propKeyOfSourceData = this.tree.props[propName] || propName
    return this.sourceData[propKeyOfSourceData]
  }

  _needLoad() {
    return this.tree.isLazyLoad && !this.isLeaf && !this.loaded
  }

  expand() {
    const expand = () => {
      if (this.tree.isAccordion && this.parent) {
        this.parent.children.forEach(node => {
          node.collapse()
        })
      }
      if (this.parent) {
        this.parent.expand()
      }
      if (this.isLeaf) {
        return
      }
      this.expanded = true
    }

    if (this._needLoad()) {
      this.load(() => {
        expand()
      })
    } else {
      expand()
    }
  }

  collapse() {
    this.expanded = false
  }

  /**
   * @param {Node[] | object[]} children list of Node instance or source data
   */
  setChildren(children) {
    if (Array.isArray(children)) {
      const reusedNode = {}
      const newChildren = []
      children.forEach(child => {
        if (child instanceof Node) {
          child.parent = this
          child.level = this.level + 1
          if (this.tree.keyProp) {
            reusedNode[child.key] = true
          }
          return child
        }

        if (!this.tree.keyProp) {
          newChildren.push(new Node(child, this))
          return
        }

        const childKey = child[this.tree.keyProp]
        const cacheNode = this.tree.nodeMap[childKey]
        if (!cacheNode) {
          newChildren.push(new Node(child, this))
        } else if (cacheNode.parent !== this) {
          throw new Error(`duplicate key: ${cacheNode.key}`)
        } else {
          newChildren.push(cacheNode)
          reusedNode[cacheNode.key] = true
        }
      })
      this.children.forEach(node => {
        if (!reusedNode[node.key]) {
          node.destroy()
        }
      })
      this.children = newChildren
    }
    this.updateChecked()
    this.updateIsLeaf()
  }

  insertChild(newNode, index) {
    if (index <= -1 || index > this.children.length) {
      return null
    }
    const node = newNode instanceof Node ? newNode : new Node(newNode, this)
    node.level = this.level + 1
    this.children.splice(index, 0, node)
    this.updateChecked()
    this.updateIsLeaf()
    return node
  }

  insertBefore(newNode, node) {
    const index = this.children.indexOf(node)
    return this.insertChild(newNode, index)
  }

  insertAfter(newNode, node) {
    const index = this.children.indexOf(node)
    if (index > -1) {
      return this.insertChild(newNode, index + 1)
    }
    return null
  }

  setChecked(checked, { fromParent, force } = {}) {
    if (this.tree.checkStrict) {
      this.indeterminate = false
      this.checked = checked
      return
    }

    const _setChecked = () => {
      let _checked = checked
      if (this.indeterminate && !force) {
        let allExceptDisabledAreChecked = true
        for (let i = 0, len = this.children.length; i < len; i++) {
          const child = this.children[i]
          if (!child.disabled && child.checked === false) {
            allExceptDisabledAreChecked = false
            break
          }
        }
        _checked = !allExceptDisabledAreChecked
      }

      this.children.forEach(node => {
        if (!node.disabled) {
          node.setChecked(_checked, { fromParent: true, force })
        }
      })

      if (this.children.length > 0) {
        const { checked: currentChecked, indeterminate } = getChecked(this)
        this.indeterminate = indeterminate
        this.checked = currentChecked
      } else {
        this.indeterminate = false
        this.checked = _checked
      }

      if (!fromParent && this.parent) {
        this.parent.updateChecked()
      }
    }

    if (this._needLoad()) {
      this.load(() => {
        _setChecked()
        if (this.parent) {
          this.parent.updateChecked()
        }
      })
    } else {
      _setChecked()
    }
  }

  updateIsLeaf() {
    this.isLeaf = this.children.length === 0
  }

  updateChecked() {
    if (this.tree.checkStrict) {
      return
    }
    if (this.children.length > 0) {
      const { checked, indeterminate } = getChecked(this)
      this.checked = checked
      this.indeterminate = indeterminate
    }
    if (this.parent) {
      this.parent.updateChecked()
    }
  }

  removeChild(node) {
    const index = this.children.indexOf(node)
    if (index > -1) {
      this.children.splice(index, 1)
      node.destroy()
      this.updateChecked()
      this.updateIsLeaf()
    }
  }

  load(callback) {
    if (callback) {
      // 将 expand 和 setChecked 操作加入等待队列，待数据返回后执行
      this.callbackQueue.push(callback)
    }
    if (this.loading) {
      return
    }
    this.loading = true
    const resolve = children => {
      this.setChildren(children)
      this.children.forEach(child => {
        if (this.tree.defaultCheckedKeys.includes(child.key)) {
          child.setChecked(true)
        }
      })
      this.loaded = true
      this.loading = false

      this.callbackQueue.forEach(cb => {
        cb.call(this)
      })
      this.callbackQueue = []
      return children
    }
    const loadMethodResult = this.tree.loadMethod({
      data: this.sourceData,
      node: this,
      resolve
    })
    if (loadMethodResult instanceof Promise) {
      loadMethodResult.then(resolve).catch(() => {
        resolve([])
      })
    }
  }

  destroy() {
    this.children.forEach(node => {
      node.destroy()
    })
    this.tree.destroyNode(this)
  }
}
