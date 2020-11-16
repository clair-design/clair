import { getFixedStyle, generateCellClassName } from './utils'
import { IconCaretRight, IconCaretDown } from 'packages/icon'
import Checkbox from 'packages/checkbox'
import Empty from 'packages/empty'

export default {
  name: 'CTableBody',
  inject: ['$table'],
  props: {
    columns: Array,
    dataSource: Array,
    rowClassName: Function,
    spanMethod: Function
  },
  computed: {
    hasExpandShown() {
      return this.columns?.[0]?.type === 'expand'
    },
    noResultNode() {
      return (
        <td class="c-table__text--center" colspan={this.columns.length}>
          <Empty
            description={
              this.$table.emptyText ? this.$table.emptyText : '暂无相关数据'
            }
          />
        </td>
      )
    },
    expandRender() {
      return this.$table.$scopedSlots.expand
    }
  },
  methods: {
    getRowKey(data) {
      const { [this.$table.rowKeyField]: rowKey } = data
      return rowKey
    },
    expandClick(data, index) {
      const rowKey = this.getRowKey(data)
      const newState = !this.$table.isRowExpanded(rowKey)
      this.$table.expandRow(rowKey, newState)
    },
    /**
     * @param { Object } arg - param0 checkbox 的change事件触发emit
     * @param { Object } arg.row
     * @param { number } arg.index
     */
    selectedChange({ row, index }) {
      const rowKey = this.getRowKey(row)
      const newSelectedState = !this.$table.isRowSelected(rowKey)
      this.$table.selectRow(rowKey, newSelectedState)
    },
    /**
     *
     * @param {Object} row  当前行的数据
     * @param {Object} column 当前列的对象
     * @param {Number} rowIndex 行号
     * @param {Number} columnIndex 列号
     *
     * @returns 支持两种
     * [rowspan, colspan] 一维二元数据
     *
     * {rowspan, colspan}
     */
    // eslint-disable-next-line max-params
    tdSpanMethod(row, column, rowIndex, columnIndex) {
      let rowspan = 1
      let colspan = 1

      if (this.spanMethod) {
        const spans = this.spanMethod({
          row,
          column,
          rowIndex,
          columnIndex
        })
        if (Array.isArray(spans)) {
          ;[rowspan, colspan] = spans // 避免被压缩
        } else if (spans) {
          rowspan = spans.rowspan
          colspan = spans.colspan
        }
      }
      return {
        rowspan,
        colspan
      }
    },

    // eslint-disable-next-line max-params
    renderTD(item, index, data, rowIndex) {
      const rowKey = this.getRowKey(data)
      if (item.type === 'selection') {
        return (
          <Checkbox
            name={`tdDataChecked-${rowKey}`}
            checked={this.$table.isRowSelected(rowKey)}
            on-change={this.selectedChange.bind(this, {
              row: data,
              index: rowIndex
            })}
          />
        )
      }
      if (item.type === 'expand') {
        const CurrentIcon = this.$table.isRowExpanded(rowKey)
          ? IconCaretDown
          : IconCaretRight
        return (
          <CurrentIcon
            class="c-table__expand--arrow"
            on-click={this.expandClick.bind(this, data, rowIndex)}
          />
        )
      }
      if (item.columnSlot) {
        return (
          <span>
            {item.columnSlot({ row: data, value: data[item.prop], index })}
          </span>
        )
      }
      const { [`${item.prop}_cell`]: scopedSlot } = this.$scopedSlots
      if (scopedSlot) {
        return scopedSlot({
          row: data,
          value: data[item.prop],
          index
        })
      }
      return data[item.prop]
    }
  },
  render(h) {
    // 无数据
    if (this.columns.length === 0) return <tbody />
    if (this.dataSource.length === 0) {
      return (
        <tbody>
          <tr class="c-table__row--empty">{this.noResultNode}</tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {this.dataSource.map((data, rowIndex) => {
          // generate unique key for each row
          const rowKey = this.getRowKey(data)
          const currentRowClassName = this.rowClassName
            ? this.rowClassName({ row: data, index: rowIndex })
            : ''
          const tr = (
            <tr
              key={`tr-${rowKey}`}
              aria-selected={this.$table.isRowSelected(rowKey)}
            >
              {this.columns.map((columnItem, index) => {
                const fixedStyle = getFixedStyle(
                  this.columns,
                  index,
                  columnItem.fixed
                )

                const { colspan, rowspan } = this.tdSpanMethod(
                  data,
                  columnItem,
                  rowIndex,
                  index
                )
                const tdClassObj = generateCellClassName(
                  columnItem,
                  index,
                  this.$table
                )
                const tdClassName = {
                  [currentRowClassName]: true,
                  ...tdClassObj
                }
                return colspan && rowspan ? (
                  <td
                    key={`td-${columnItem.prop || index}-${rowKey}`}
                    class={tdClassName}
                    style={fixedStyle}
                    colspan={colspan}
                    rowspan={rowspan}
                  >
                    {this.renderTD(columnItem, index, data, rowIndex)}
                  </td>
                ) : (
                  ''
                )
              })}
            </tr>
          )
          const expandTr =
            this.hasExpandShown &&
            this.$table.isRowExpanded(rowKey) &&
            this.expandRender ? (
              <tr class="c-table__expand" key={`tr-${rowKey}-expand`}>
                <td class="c-table__expand--first-cell" />
                <td
                  class="c-table__expand--merge-cell"
                  colspan={this.columns.length - 1}
                >
                  {this.expandRender({ row: data, index: rowIndex })}
                </td>
              </tr>
            ) : (
              ''
            )
          return [tr, expandTr]
        })}
      </tbody>
    )
  }
}
