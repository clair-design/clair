import CCascaderMenu from './cascader-menu'
import CCascaderSuggest from './cascader-suggest'
import Parser from './parser'
import { isFunction, merge, isEqual } from 'lodash-es'
const findNode = (vm, element, direction) => {
  const menuIndex = Number(element.getAttribute('aria-level')) - 1
  let targetMenu, targetNode
  switch (direction) {
    case 'left' /* 往左，定位至当前展开的节点 */: {
      targetMenu = vm.$refs.menu[menuIndex - 1]
      if (targetMenu) {
        targetNode = targetMenu.$refs.node.find(node =>
          vm.expandedNode.includes(node.node)
        )
      }
      break
    }
    case 'right' /* 往右，定位至右侧menu第一个节点 */: {
      targetMenu = vm.$refs.menu[menuIndex + 1]
      if (targetMenu) {
        targetNode = targetMenu.$refs.node.find(node => !node.node.disabled)
      }
      break
    }
    case 'up':
    case 'down' /* 上下移动，定位至非disabled的下一个节点 */: {
      const parentNode = element.parentNode || element
      const siblings = parentNode.children
      // 当前li在ul中的index，也是当前组件在vm.$refs.menu[menuIndex].$refs.node中的index
      const nodeIndex = Array.prototype.indexOf.call(siblings, element)
      const $refsNode = vm.$refs.menu[menuIndex].$refs.node[nodeIndex]
      const nodes = vm.$refs.menu[menuIndex].$refs.node.filter(
        n => !n.node.disabled
      )
      const currentIndex = nodes.indexOf($refsNode)
      const len = nodes.length
      let nextPosition = currentIndex + (direction === 'up' ? -1 : 1)
      nextPosition =
        nextPosition >= 0 ? nextPosition % len : len + (nextPosition % len)
      targetNode = nodes[nextPosition]
      break
    }
    default:
      break
  }
  return targetNode?.$el
}

const findSugNode = (element, direction) => {
  const parentNode = element.parentNode || element
  const siblings = Array.from(parentNode.children)
  const elements = siblings.filter(ele => !ele.getAttribute('aria-disabled'))
  const currentIndex = elements.indexOf(element)
  const len = elements.length
  // 计算出目标节点，并输出
  let nextPosition = currentIndex + (direction === 'up' ? -1 : 1)
  nextPosition =
    nextPosition >= 0 ? nextPosition % len : len + (nextPosition % len)
  return elements[nextPosition]
}

const focusNode = el => {
  el?.focus()
}

const scrollIntoView = (child, parent) => {
  const top = Math.round(parseFloat(getComputedStyle(parent).paddingTop))
  const { clientHeight } = parent
  const { top: parentTop } = parent.getBoundingClientRect()
  const { top: childTop } = child.getBoundingClientRect()
  // 如果元素在可视区域，不用滚动
  if (childTop > parentTop && childTop - parentTop < clientHeight) return
  const val = childTop - parentTop // 元素顶部距离可滚动面板顶部的距离
  parent.scrollTop = parent.scrollTop + val - top
}

const pathEqual = (pathArrA, pathArrB) => {
  if (pathArrA.length !== pathArrB.length) return false
  return pathArrA.reduce((previousValue, currentValue, index) => {
    return previousValue && pathArrA[index].nid === pathArrB[index].nid
  }, true)
}

const getExposeNode = node => {
  const { label, value, disabled, isLeaf, level, data } = node
  return {
    label,
    value,
    disabled,
    isLeaf,
    level,
    data: merge({}, data)
  }
}

const CodeMap = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  esc: 'Escape'
}

export default {
  name: 'CCascaderPanel',
  provide() {
    return {
      $panel: this
    }
  },

  props: {
    value: Array,
    options: {
      type: Array,
      default: _ => {
        return []
      }
    },
    query: String,
    filter: Function,
    changeOnSelect: Boolean,
    lazy: Boolean,
    lazyMethod: Function,
    trigger: {
      type: String,
      default: 'click',
      validator: value => ['hover', 'click'].includes(value)
    },
    dataMap: Object,
    bordered: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      checkedNode: null,
      nodes: [],
      expandedNode: []
    }
  },

  computed: {
    config() {
      return {
        changeOnSelect: this.changeOnSelect,
        lazy: this.lazy,
        lazyMethod: this.lazyMethod,
        dataMap: this.dataMap,
        trigger: this.trigger
      }
    },
    filterFunction() {
      return (
        this.filter ||
        function (node, query) {
          return node.label.toLowerCase().includes(query.toLowerCase())
        }
      )
    },
    searchMode() {
      return Boolean(this.query)
    },
    menus() {
      if (this.expandedNode.length <= 0) return [this.nodes.getNodes()]
      const menus = []
      let [checkNode] = this.expandedNode.slice(-1)
      if (!checkNode.isLeaf && checkNode.loaded) {
        menus.push(checkNode.children)
      }
      while (checkNode) {
        menus.unshift(checkNode.parent?.children ?? this.nodes.getNodes())
        checkNode = checkNode.parent
      }
      return menus
    },
    checkedValue() {
      return this.checkedNode?.valuePath ?? []
    }
  },

  watch: {
    options: {
      handler: function (newValue, oldValue) {
        // 重新生成当前节点树
        this.parseOptions(newValue)
        // 如果旧值已经有了，说明是后面强制修改了options，此时还需要重新计算一下checkedNode，并且抛出change事件。#148
        if (oldValue !== undefined && !this.searchMode) {
          this.autoExpand(false)
        }
      },
      immediate: true,
      deep: true
    },
    query() {
      const { checkedNode, config, lazyLoadNode, searchMode } = this
      // 如果在search模式下选择了未加载出来的节点，切换到选择面板时自动加载此节点，并强制重新渲染menu
      if (
        !searchMode &&
        checkedNode &&
        !checkedNode.loaded &&
        config.lazy &&
        !checkedNode.isLeaf
      ) {
        lazyLoadNode(checkedNode).then(() => {
          this.handleExpand(checkedNode, false, true)
        })
      }
    },
    value() {
      /**
       * 当前值发生变化，两种可能：要么是组件内部正常触发改变，要么是外部强行改变。
       * 如果是外部强行改变，触发非静默模式的自动展开逻辑
       */
      if (!isEqual(this.checkedValue, this.value) && !this.searchMode) {
        this.autoExpand(false)
      }
    }
  },

  mounted() {
    if (!this.searchMode) this.autoExpand(true)
  },

  methods: {
    initialCheckedNode() {
      // 根据value反分析出当前被选择的node.
      const { value } = this
      if (!Array.isArray(value)) return
      if (value.length <= 0) return
      const path = JSON.stringify(value)
      return this.nodes
        .getFlatteningNodes()
        .find(node => JSON.stringify(node.valuePath) === path)
    },
    parseOptions(options = this.options) {
      const { config } = this
      this.nodes = new Parser(options, config)

      if (config.lazy && options.length === 0) {
        return this.lazyLoadNode()
      }
    },
    lazyLoadNode(node) {
      const { config } = this
      const { lazyMethod } = config
      if (isFunction(lazyMethod)) {
        const parentNode = node
          ? {
              root: false,
              level: node.level,
              ...node.data
            }
          : {
              root: true,
              level: 0
            }
        const cKey = config.dataMap?.children ?? 'children'
        parentNode[cKey] = parentNode[cKey] || []
        const promise = lazyMethod(parentNode)
        if (node) node.loading = true
        return Promise.resolve(promise).then(_ => {
          //增量渲染children.
          if (parentNode[cKey]?.length) {
            this.nodes.appendNodes(parentNode[cKey], node || null)
          }
          this.nodes._getFlatteningCache = { leaf: false, all: false }
          if (node) {
            node.loading = false
            node.loaded = true
            node.isLeaf = node.checkLeaf()
          }
          // 当用户赋值了初始数据时，每次异步加载完成后，再次检查是否有节点被checked，除非初始值已经发生了变化
          if (!this.checkedNode) {
            this.autoExpand(true)
          }
        })
      }
    },
    renderMenuItems() {
      const { menus } = this
      return menus.map((menu, index) => {
        return <CCascaderMenu ref="menu" refInFor key={index} nodes={menu} />
      })
    },
    handleKeyDown(e) {
      if (this.$isServer) return
      e.preventDefault()
      const { target, code } = e
      switch (code) {
        case CodeMap.up:
          focusNode(findNode(this, target, 'up'))
          break
        case CodeMap.down:
          focusNode(findNode(this, target, 'down'))
          break
        case CodeMap.left: {
          // 如果到头部，效果和按上箭头一样
          const node = findNode(this, target, 'left')
          focusNode(node || findNode(this, target, 'up'))
          break
        }
        case CodeMap.right: {
          // 如果到尾部，效果和按下箭头一样
          const node = findNode(this, target, 'right')
          focusNode(node || findNode(this, target, 'down'))
          break
        }
        case CodeMap.enter:
          target.click()
          break
        case CodeMap.esc:
        case CodeMap.tab:
          this.$emit('close')
          break
        default:
          break
      }
    },
    handleSuggestKeyDown(e) {
      if (this.$isServer) return
      e.preventDefault()
      const { target, code } = e
      switch (code) {
        case CodeMap.up:
          focusNode(findSugNode(target, 'up'))
          break
        case CodeMap.down:
          focusNode(findSugNode(target, 'down'))
          break
        case CodeMap.enter:
          target.click()
          break
        case CodeMap.esc:
        case CodeMap.tab:
          this.$emit('close')
          break
        default:
          break
      }
    },
    handleExpand(node, silent, forceUpdate = false) {
      // 展开节点和点击节点 都会调用此方法。 点击节点时，silent为true。此时不需要抛出事件，但是需要重新计算当前的expandedNode
      // 计算时，需要根据当前点击的node取得expandedNode，不能依赖原有path和menu
      const { nodePath } = node
      // 如果没有切换选择节点
      if (pathEqual(nodePath, this.expandedNode) && !forceUpdate) return
      this.expandedNode = node.isLeaf ? node.parent.nodePath : nodePath
      if (!silent) {
        this.$emit('expand-change', {
          detail: { valuePath: node.valuePath, labelPath: node.labelPath }
        })
      }
    },
    handleCheckChange(node, silent) {
      if (node && this.checkedNode?.nid === node.nid) return
      if (node?.loading) return
      this.updateCheckNode(node, silent)
    },
    updateCheckNode(node, silent) {
      this.checkedNode = node
      if (!node) {
        if (!silent) {
          this.$emit('input', [])
          this.$emit('change', { detail: { valuePath: [], labelPath: [] } })
        }
        return
      }
      const { searchMode } = this
      const { isLeaf } = node
      if (!silent) {
        this.$emit('input', node.valuePath)
        this.$emit('change', {
          detail: { valuePath: node.valuePath, labelPath: node.labelPath }
        })
        // 如果是搜索模式或点击的是叶子节点，抛出允许关闭的close事件
        if (isLeaf || searchMode) this.$emit('close')
      }
      // 搜索模式下，点击任意节点，都刷新一下menu，是为了返回非搜索模式时 menu已经刷新好
      if (searchMode) this.handleExpand(node, true)
    },
    autoExpand(silent) {
      const initialCheckedNodes = this.initialCheckedNode()
      if (initialCheckedNodes) {
        const { nodePath } = initialCheckedNodes
        // eslint-disable-next-line no-magic-numbers
        const [expandNode, checkNode = expandNode] = nodePath.slice(-2)
        // 对于lazy模式，节点未展开时不自动展开，仅选中。
        if (expandNode.loaded) {
          this.handleExpand(expandNode, silent)
        } else {
          // lazy模式下，如果当前选中的是未展开的列表，应该手动将expandedNode置空，避免面板出现上次选择的遗留情况。
          this.expandedNode = []
        }
        this.handleCheckChange(checkNode, silent)
        this.$nextTick(this.scrollIntoView)
      } else {
        this.expandedNode = []
        this.handleCheckChange(initialCheckedNodes, silent)
      }
    },
    scrollIntoView() {
      if (this.$isServer) return
      const menus = this.$refs.menu || []
      menus.forEach(menu => {
        const el = menu.$el
        const node = el.querySelector('[aria-selected]')
        node && scrollIntoView(node, el)
      })
    },
    renderSugItems() {
      const { getFlatteningNodes, getLeafNodes } = this.nodes
      const { query, config } = this
      const { changeOnSelect } = config
      const getFilterableNodes = changeOnSelect
        ? getFlatteningNodes
        : getLeafNodes
      const filteredNodes = getFilterableNodes().filter(node => {
        return node.nodePath.some(n => {
          return this.filterFunction(getExposeNode(n), query)
        }, false)
      })
      return <CCascaderSuggest nodes={filteredNodes} ref="sug" />
    },
    // 抛出事件，提供给外部组件使用，聚焦cascader-panel的第一个选项
    focusFirstNode() {
      let el = null
      if (this.searchMode) {
        el = this.$refs.sug?.$refs?.node?.[0]
      } else {
        const targetNode = this.$refs.menu?.[0]?.$refs?.node?.find(
          n => !n.node.disabled
        )
        el = targetNode?.$el
      }
      focusNode(el)
    }
  },

  render() {
    const classes = {
      'c-cascader__panel': true,
      'c-cascader__panel--bordered': this.bordered
    }
    if (!this.searchMode) {
      return (
        <div class={classes} onKeydown={this.handleKeyDown}>
          {this.renderMenuItems()}
        </div>
      )
    }
    return (
      <div class={classes} onKeydown={this.handleSuggestKeyDown}>
        {this.renderSugItems()}
      </div>
    )
  }
}
