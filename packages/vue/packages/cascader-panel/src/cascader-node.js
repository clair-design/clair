import { IconArrowRight, IconSpin } from 'packages/icon'
export default {
  name: 'CCascaderNode',
  inject: ['$panel', '$menu'],
  props: {
    node: {
      type: Object,
      required: true
    }
  },

  computed: {
    config() {
      return this.$panel.config
    },
    isHoverTrigger() {
      return this.$panel.config.trigger === 'hover'
    },
    isExpanded() {
      const { expandedNode } = this.$panel
      return expandedNode.includes(this.node)
    },
    isChecked() {
      const { checkedNode } = this.$panel
      if (!checkedNode) return false
      const { nodePath } = checkedNode
      return nodePath.some(node => node.nid === this.node.nid, false)
    }
  },

  methods: {
    renderSuffix() {
      const { node } = this
      if (node.loading) {
        return (
          <span class="c-cascader__icon">
            <IconSpin />
          </span>
        )
      }
      if (!node.isLeaf && !node.disabled) {
        return (
          <span class="c-cascader__icon">
            <IconArrowRight />
          </span>
        )
      }
      return null
    },
    renderContent() {
      const { node, $panel } = this
      return (
        <span class="c-cascader__label">
          {$panel.$scopedSlots.node?.(node) ?? node.label}
        </span>
      )
    },
    async handleExpand() {
      const { $panel, node, config } = this
      if (node.loading) return
      if (config.lazy && !node.loaded && !node.isLeaf) {
        await $panel.lazyLoadNode(node)
        this.handleExpand()
      } else {
        $panel.handleExpand(node)
      }
    },
    handleCheckChange() {
      const { $panel, node } = this
      $panel.handleCheckChange(node, false)
    },
    delayExpand() {
      const { $menu } = this
      if ($menu.timeout) {
        clearTimeout($menu.timeout)
        $menu.timeout = null
      }
      $menu.timeout = setTimeout(() => {
        this.handleExpand()
        $menu.timeout = null
      }, $menu.delay)
    }
  },

  render() {
    const { isHoverTrigger, isExpanded, isChecked, node } = this
    const { changeOnSelect } = this.config
    const events = { on: {} }
    if (!node.disabled) {
      events.on.focus = this.handleExpand
      if (!node.isLeaf && isHoverTrigger) {
        events.on.mouseenter = this.delayExpand
      }
      if (node.isLeaf || changeOnSelect) {
        events.on.click = this.handleCheckChange
      }
    }
    return (
      <li
        role="option"
        tabindex={node.disabled ? null : -1}
        aria-disabled={node.disabled}
        aria-expanded={isExpanded}
        aria-selected={isChecked}
        aria-level={node.level}
        is-leaf={node.isLeaf}
        {...events}
      >
        {this.renderContent()}
        {this.renderSuffix()}
      </li>
    )
  }
}
