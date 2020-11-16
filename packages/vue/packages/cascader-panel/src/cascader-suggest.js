import { flatten } from 'lodash-es'
export default {
  name: 'CCascaderSuggest',
  inject: ['$panel'],
  props: {
    nodes: {
      type: Array,
      required: true
    }
  },

  computed: {
    isEmpty() {
      return this.nodes.length <= 0
    }
  },

  methods: {
    handleClick(e, node) {
      if (node.disabled) return
      const { $panel } = this
      $panel.handleCheckChange(node)
    },
    isChecked(node) {
      const { checkedNode } = this.$panel
      if (!checkedNode) return false
      const { nodePath } = checkedNode
      //搜索模式下判定checked: 要求完全一致
      return nodePath[nodePath.length - 1].nid === node.nid
    },
    renderText(node) {
      if (this.$panel.$scopedSlots['filter-node']) {
        return this.$panel.$scopedSlots['filter-node'](node)
      }
      const { getNodeText } = node
      const { query } = this.$panel
      const renderText = getNodeText('/', 0)
      const partsWithoutQuery = renderText.split(String(query))
      const { length: len } = partsWithoutQuery
      return flatten(
        partsWithoutQuery.map((part, index) => {
          if (index === len - 1) return [part]
          return [part, <em>{query}</em>]
        })
      )
    },
    renderNode() {
      const itemNodes = this.nodes.map(node => {
        const { disabled } = node
        const isChecked = this.isChecked(node)
        return (
          <li
            role="option"
            tabindex={disabled ? null : -1}
            aria-disabled={disabled}
            aria-selected={isChecked}
            key={node.nid}
            ref="node"
            refInFor
            onClick={e => {
              this.handleClick(e, node)
            }}
          >
            {this.renderText(node)}
          </li>
        )
      })
      return itemNodes
    },
    renderEmpty() {
      return (
        this.$panel.$scopedSlots['filter-empty']?.() ?? (
          <div class="c-cascader__empty-text">无匹配数据</div>
        )
      )
    }
  },

  render() {
    if (this.isEmpty) return this.renderEmpty()
    return (
      <ul class="c-cascader__list" role="listbox">
        {this.renderNode()}
      </ul>
    )
  }
}
