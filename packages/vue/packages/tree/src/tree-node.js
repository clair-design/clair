import Checkbox from '../../checkbox'
import { IconSpin, IconCaretRight } from '../../icon'

const INDENTATION = 24
const noop = () => {
  /* do nothing */
}

export default {
  name: 'CTreeNode',
  props: {
    node: {
      type: Object,
      require: true
    },
    childrenData: Array,
    selectable: Boolean,
    checkable: Boolean,
    clickCombineAction: String
  },
  inject: ['$treeVm'],
  data() {
    const { node } = this
    return {
      tree: node.tree
    }
  },
  computed: {
    checkedState() {
      if (this.node.indeterminate) {
        return 'mixed'
      }
      return `${this.node.checked}`
    }
  },
  watch: {
    childrenData: function (children) {
      this.$treeVm.setNodeChildren(this.node, children)
    },
    'node.selected': function () {
      this.$treeVm.$emit('node-select', {
        detail: {
          node: this.node,
          data: this.node.sourceData
        }
      })
    },
    'node.loaded': function (val) {
      if (val) {
        this.$treeVm.$emit('node-loaded', {
          detail: {
            node: this.node,
            data: this.node.sourceData
          }
        })
      }
    },
    checkedState: function () {
      this.$treeVm.$emit('node-check', {
        detail: {
          checked: this.node.checked,
          indeterminate: this.node.indeterminate,
          node: this.node,
          data: this.node.sourceData
        }
      })
    }
  },
  methods: {
    handleNodeClick(e) {
      const { node } = this
      if (node.disabled) {
        return
      }

      this.$treeVm.$emit('node-click', {
        detail: { data: node.sourceData, node },
        nativeEvent: e
      })
      if (this.selectable) {
        this.tree.setSelectedNode(node, !node.selected)
        return
      }

      if (this.clickCombineAction === 'none') {
        return
      }

      if (this.clickCombineAction === 'checkbox') {
        this.$refs.checkbox.$el.click()
        return
      }

      this.toggle()
    },
    toggle() {
      if (this.node.isLeaf) {
        return
      }
      const event = {
        detail: {
          node: this.node,
          data: this.node.sourceData,
          expanded: this.node.expanded
        }
      }
      if (this.node.expanded) {
        this.node.collapse()
      } else {
        // ! may update `this.node.children` implicitly
        // which will cause an update of UI
        // basically is what would happen when load data async
        this.node.expand()
      }
      this.$treeVm.$emit('node-expand', event)
    },
    handleCheckboxChange({ target: { checked } }) {
      this.node.setChecked(checked)
      this.$treeVm.$emit('check', {
        detail: {
          checkedNodes: this.tree.getCheckedNodes(),
          checkedKeys: this.tree.getCheckedKeys(),
          checkedNodesWithHalf: this.tree.getCheckedNodes(false, true),
          checkedKeysWithHalf: this.tree.getCheckedKeys(false, true),
          checkedLeafNodes: this.tree.getCheckedNodes(true),
          checkedLeafKeys: this.tree.getCheckedKeys(true)
        }
      })
    },
    handleKeydown(e) {
      const { code } = e
      const { $el, node } = this
      const { expanded } = node
      const isRoot = node.level === 1
      switch (code) {
        case 'ArrowLeft':
          if (expanded === true) {
            // 如果节点为展开状态，折叠该节点
            this.toggle()
          } else if (!isRoot) {
            // 如果节点不是根节点，移动焦点到它的父节点
            this.$parent.$el.focus()
          } else {
            // 如果节点不为展开状态，且是根节点，什么都不做
            break
          }
          e.preventDefault()
          break
        case 'ArrowRight':
          if (expanded === true) {
            // 如果节点为展开状态，移动焦点到第一个子节点
            const $children = [...$el.querySelectorAll('[role="treeitem"]')]
            $children[1].focus()
          } else if (expanded === false) {
            // 如果节点为折叠状态，展开该节点
            this.toggle()
          } else {
            // 如果节点是叶子节点，什么都不做
            break
          }
          e.preventDefault()
          break
        case 'ArrowUp':
        case 'ArrowDown':
          {
            const $tree = this.$treeVm.$el
            const $treeItems = [...$tree.querySelectorAll('[role="treeitem"]')]
            const index = $treeItems.indexOf($el)
            const targetIndex = code === 'ArrowUp' ? index - 1 : index + 1
            if (targetIndex >= 0 && targetIndex < $treeItems.length) {
              $treeItems[targetIndex].focus()
              e.preventDefault()
            }
          }
          break
        case 'Space':
        case 'Enter':
          if (this.checkable && !this.selectable) {
            $el.querySelector('.c-checkbox')?.click()
            $el.focus()
          } else {
            $el.click()
          }
          e.preventDefault()
          break
        default:
          break
      }
      e.stopPropagation()
    },
    renderContent() {
      const { node } = this

      const expandIcon = this.$scopedSlots.expandIcon?.({
        node,
        data: node.sourceData
      }) || <IconCaretRight style={{ fontSize: `12px` }} />
      const toggleIcon = node.loading ? (
        <IconSpin />
      ) : (
        !node.isLeaf && expandIcon
      )

      const customIcon = this.$scopedSlots.nodeIcon ? (
        <span class="c-tree__custom-icon">
          {this.$scopedSlots.nodeIcon({ node, data: node.sourceData })}
        </span>
      ) : null

      const checkbox = this.checkable ? (
        <Checkbox
          ref="checkbox"
          vModel={node.checked}
          indeterminate={node.indeterminate}
          disabled={node.disabled}
          on-change={this.handleCheckboxChange}
          vOn:click__stop__native={noop}
        />
      ) : null

      return (
        <div
          class="c-tree__content"
          style={{ paddingLeft: `${(node.level - 1) * INDENTATION}px` }}
        >
          <span class="c-tree__toggle" vOn:click_stop={this.toggle}>
            {toggleIcon}
          </span>
          {checkbox}
          {customIcon}
          <span class="c-tree__label" title={node.label}>
            {this.$scopedSlots.default?.({ node, data: node.sourceData }) ||
              node.label}
          </span>
        </div>
      )
    },
    renderGroup() {
      const { node } = this

      const children =
        node.children.length &&
        (node.expanded || Boolean(this.$treeVm.filterValue)) ? (
          <ul role="group">
            {node.children.map(child =>
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
        ) : null
      return (
        <transition
          on-before-enter={el => {
            el.style.height = 0
          }}
          on-enter={el => {
            el.style.height = `${el.scrollHeight}px`
          }}
          on-after-enter={el => {
            this.expanded = node.expanded
            el.style.height = ''
          }}
          on-before-leave={el => {
            el.style.height = `${el.scrollHeight}px`
          }}
          on-leave={el => {
            window.requestAnimationFrame(() => {
              el.style.height = 0
            })
          }}
          on-after-leave={el => {
            this.expanded = node.expanded
          }}
        >
          {children}
        </transition>
      )
    }
  },
  render() {
    const { node } = this

    return (
      <li
        role="treeitem"
        aria-disabled={node.disabled}
        aria-expanded={
          !node.isLeaf &&
          `${node.expanded || Boolean(this.$treeVm.filterValue)}`
        }
        aria-selected={this.selectable && `${node.selected}`}
        aria-checked={this.checkable && `${this.checkedState}`}
        aria-level={node.level}
        aria-busy={node.loading}
        tabindex="0"
        on-keydown={this.handleKeydown}
        vOn:click_stop={this.handleNodeClick}
      >
        {this.renderContent()}
        {this.renderGroup()}
      </li>
    )
  }
}
