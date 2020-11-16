import { getFixedStyle, generateCellClassName } from './utils'
import Checkbox from 'packages/checkbox'
export default {
  name: 'CTableHead',
  inject: ['$table'],
  props: {
    columns: Array,
    sticky: Boolean,
    defaultSort: {
      type: Object,
      default() {
        return {
          column: '',
          order: ''
        }
      }
    }
  },
  data() {
    return {
      sort: this.defaultSort
    }
  },
  computed: {
    className() {
      return { 'c-table__thead--sticky': this.sticky }
    }
  },
  watch: {
    defaultSort() {
      this.sort = this.defaultSort
    }
  },
  methods: {
    /**
     *
     * @param {string} item 当前的key
     * @param {string} order 排序的顺序
     * @emits {
     *  column 当前的key, 取消排序时为‘’
     *  order 排序的顺序, 取消排序时为‘’
     * }
     */
    sortIconClick(item, order) {
      if (this.sort.column === item.prop && this.sort.order === order) {
        this.sort = { column: '', order: '' }
      } else {
        this.sort = { column: item.prop, order }
      }
      this.$table.$emit('sort-change', { detail: this.sort })
    },
    allSelectedChange({ target: { checked } }) {
      this.$table.setDataAllChecked(checked)
    },
    renderSortableTh(item) {
      const sortClassName = {
        'c-table__sort': true,
        [`c-table__sort--${this.sort.order}`]: item.prop === this.sort.column
      }

      return (
        <div>
          <span>{item.title}</span>
          <span class={sortClassName}>
            <i
              class="c-table__sort--asc-icon"
              on-click={this.sortIconClick.bind(this, item, 'ascending')}
            />
            <i
              class="c-table__sort--desc-icon"
              on-click={this.sortIconClick.bind(this, item, 'descending')}
            />
          </span>
        </div>
      )
    },
    /**
     *
     * @param {Object} item 当前列的column
     * 渲染优先级：selection/expand
     * theadRender c-table-column中的title 的slot内容
     * title的slot，使用columns的传入
     * 带排序icon的渲染
     * 默认的字符title
     */
    renderTh(item) {
      if (item.type === 'selection') {
        const checkItem = (
          <Checkbox
            name="allSelected"
            disabled={this.$table.isSelectAllDisabled}
            checked={this.$table.isAllSelected}
            indeterminate={this.$table.isIndeterminate}
            on-change={this.allSelectedChange.bind(this)}
          />
        )
        const slot = this.$scopedSlots[`${item.prop}_title`]
          ? this.$scopedSlots[`${item.prop}_title`]()
          : ''
        return [checkItem, slot]
      }
      if (item.theadRender) {
        return item.theadRender()
      }
      const { [`${item.prop}_title`]: scopedSlot } = this.$scopedSlots
      if (scopedSlot) {
        return scopedSlot()
      }
      if (item.sortable) {
        return this.renderSortableTh(item)
      }
      return item.title
    }
  },
  render() {
    return (
      <thead class={this.className}>
        {this.columns.map(rows => {
          return (
            <tr>
              {rows.map((item, index) => {
                const fixedStyle = getFixedStyle(rows, index, item.fixed)

                return (
                  <th
                    class={generateCellClassName(item, index, this.$table)}
                    style={fixedStyle}
                    rowspan={item.rowspan}
                    colspan={item.colspan}
                    key={item.prop}
                  >
                    {this.renderTh(item)}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
    )
  }
}
