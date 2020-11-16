import CCascaderNode from './cascader-node'
export default {
  name: 'CCascaderMenu',
  inject: ['$panel'],
  provide() {
    return {
      $menu: this
    }
  },

  props: {
    nodes: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      delay: 150,
      timeout: null
    }
  },

  computed: {
    isEmpty() {
      return !this.nodes.length
    }
  },

  methods: {
    renderNode() {
      return this.nodes.map(node => {
        return <CCascaderNode node={node} key={node.nid} ref="node" refInFor />
      })
    },
    renderEmpty() {
      return (
        this.$panel.$scopedSlots.empty?.() ?? (
          <div class="c-cascader__empty-text">暂无数据</div>
        )
      )
    },
    handleMouseLeave() {
      const { timeout } = this
      if (timeout) {
        clearTimeout(timeout)
        this.timeout = null
      }
    }
  },

  render() {
    if (this.isEmpty) return this.renderEmpty()
    const events = { on: { mouseleave: this.handleMouseLeave } }
    return (
      <ul class="c-cascader__list" role="listbox" {...events}>
        {this.renderNode()}
      </ul>
    )
  }
}
