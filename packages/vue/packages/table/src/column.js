export default {
  name: 'CTableColumn',
  props: {
    prop: String,
    type: {
      type: String,
      default: '',
      validator(type) {
        return ['', 'selection', 'expand'].includes(type)
      }
    },
    title: String,
    width: Number,
    align: {
      type: String,
      default: 'left',
      validator(type) {
        return ['left', 'right', 'center'].includes(type)
      }
    },
    hidden: Boolean,
    className: String,
    fixed: {
      type: String,
      default: '',
      validator(type) {
        return ['', 'left', 'right'].includes(type)
      }
    },
    sortable: Boolean
  },
  provide() {
    return {
      $column: this
    }
  },
  inject: {
    $table: { default: null },
    $column: { default: null }
  },
  data() {
    return {
      column: {}
    }
  },
  mounted() {
    if (!this.$table) {
      /* istanbul ignore next */
      throw new Error('c-column 必须在 c-table 中使用')
    }
    //
    if (this.$el) {
      this.$el.parentElement.removeChild(this.$el)
    }
    this.updateTableColumns()
  },

  methods: {
    updateTableColumns() {
      const column = Object.assign({}, this.$props)
      if (this.$column && !this.$column.column.children) {
        this.$column.column.children = []
      }
      // 含有slot
      if (this.$scopedSlots.default) {
        // 自定义表头
        column.theadRender = this.$scopedSlots.title
        // 自定义单元格
        column.columnSlot = this.$scopedSlots.default
      }
      // there could be column.children already
      // so keep it
      this.column = {
        ...this.column,
        ...column
      }
      if (this.$column) {
        this.$column.column.children.push(this.column)
      } else {
        this.$table.customColumns.push(this.column)
      }
    }
  },

  render(h) {
    // reason to render this.$slots.default is that
    // need the original component tree structure
    // to form correct the provide/inject relationship
    // by component tree, here means to keep
    // <CTableColumn><CTableColumn/></CTableColumn>
    // only by having this structure, can there be provide/inject of $column
    return (
      <template scopedSlots={this.$scopedSlots}>{this.$slots.default}</template>
    )
  }
}
