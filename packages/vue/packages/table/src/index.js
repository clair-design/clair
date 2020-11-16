import { findLastIndex, cloneDeep } from 'lodash-es'
import { isNumber } from '@clair/helpers'
import CTableHead from './thead'
import CTableBody from './tbody'
import CPagination from 'packages/pagination'
import { convertLengthValue } from './utils'

export default {
  name: 'CTable',

  provide() {
    return {
      $table: this
    }
  },
  props: {
    title: String,
    columns: Array,
    dataSource: Array,
    height: [String, Number],
    rowClassName: Function,
    spanMethod: Function,
    defaultSort: Object,
    pagination: Object,
    size: {
      type: String,
      default: 'normal',
      validator(type) {
        return ['normal', 'small', 'mini'].includes(type)
      }
    },
    bordered: Boolean,
    emptyText: String,
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    selectedRowKeys: Array,
    expandedRowKeys: Array,
    defaultSelectedRowKeys: {
      type: Array,
      default: () => []
    },
    defaultExpandedRowKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      topShadowShown: false,
      leftShadowShown: false,
      rightShadowShown: false,
      rightStickyIndex: -1,
      leftStickyIndex: -1,
      shadowStyle: {},
      customColumns: [], // 收集c-table-column的相关column
      selfSelectedRowKeys: [].concat(
        this.selectedRowKeys ?? this.defaultSelectedRowKeys
      ),
      selfExpandedRowKeys: [].concat(
        this.expandedRowKeys ?? this.defaultExpandedRowKeys
      )
    }
  },
  computed: {
    dataList() {
      return this.dataSource.map((dataItem, rowIndex) => {
        const rowKey = this.getRowKey(dataItem, rowIndex)
        return {
          ...dataItem,
          [this.rowKeyField]: rowKey
        }
      })
    },
    rowKeyField() {
      return Symbol.for('c-table-row-key')
    },
    allRowKeys() {
      return this.dataList.map(row => row[this.rowKeyField])
    },
    theadSticky() {
      return Boolean(this.height)
    },
    tableContainerClass() {
      const hasSpanMerge = this.spanMethod !== undefined // 是否有单元格合并
      const hasTheadGroup = this.theadColumns && this.theadColumns.length > 1
      return {
        'c-table--content': true,
        [`c-table--${this.size}`]: true,
        'c-table--bordered': this.bordered || hasTheadGroup || hasSpanMerge,
        'c-table--with-height': this.theadSticky
      }
    },
    tableClass() {
      return { 'c-table--fix': this.hasFixed }
    },
    // 支持分组的二级数组
    theadColumns() {
      const columns = this.columns
        ? cloneDeep(this.columns)
        : this.customColumns

      /**
       * columns树递归，标记column的level（用于计算rowspan），colspan
       * 记录所有叶子节点
       */

      const { flattenColumns, maxLevel } = columns.reduce(
        function traverse(last, columnItem) {
          // 浅复制 半模拟 immutable
          const ret = { ...last }
          // level 属于常量，无需自行修改
          columnItem.level = last.level
          if (Array.isArray(columnItem.children)) {
            const result = columnItem.children.reduce(traverse, {
              flattenColumns: [],
              level: ret.level + 1,
              maxLevel: ret.maxLevel,
              colspan: 0
            })
            // 更新"变量"
            ret.flattenColumns = [
              ...ret.flattenColumns,
              ...result.flattenColumns
            ]
            ret.maxLevel = result.maxLevel
            // "父"占用几列，应当由"子"决定
            // 没有"子"，也不需要添加 colspan，沿用浏览器默认即可
            columnItem.colspan = result.colspan
          }
          if (!columnItem.hidden) {
            ret.flattenColumns = [...ret.flattenColumns, columnItem]
            // 当前 columnItem 相当于"子"
            // 这里潜在作用之一，是用于更新"父"的 colspan
            // "子"占用几列 "父"就占用几列，因为要包裹住
            ret.colspan += columnItem.colspan || 1
          }
          ret.maxLevel = Math.max(ret.maxLevel, columnItem.level)
          return ret
        },
        {
          flattenColumns: [],
          level: 1, // 常量
          colspan: 0, // 只对 item 有副作用，不需返回
          maxLevel: 1
        }
      )

      /**
       * 计算rowspan
       */
      const theadColumns = flattenColumns.reduce((result, curr) => {
        const { level } = curr
        if (!result[level]) result[level] = []
        curr.rowspan = curr.children ? 1 : maxLevel - level + 1
        result[level].push(curr)
        return result
      }, [])
      return theadColumns.filter(item => Boolean(item))
    },
    tbodyColumns() {
      const columns = this.columns
        ? cloneDeep(this.columns)
        : this.customColumns
      // columns中的所有叶子节点集合
      return this.deepFlatten(columns).filter(item => !item.hidden)
    },
    hasFixed() {
      return this.tbodyColumns.some(column => column.fixed)
    },
    hasData() {
      return this.dataList.length > 0
    },
    isSelectAllDisabled() {
      return !this.hasData
    },
    rowKeys() {
      return this.dataList.map((row, index) => this.getRowKey(row, index))
    },
    isAllSelected() {
      if (!this.hasData) {
        return false
      }
      if (!this.selfSelectedRowKeys.length) {
        return false
      }
      return this.rowKeys.every(key => this.isRowSelected(key))
    },
    isIndeterminate() {
      const hasSelected = this.rowKeys.some(key => this.isRowSelected(key))
      return hasSelected && !this.isAllSelected
    },
    tableHeight() {
      if (isNumber(this.height)) {
        return `${this.height}px`
      } else if (this.height) {
        return this.height
      }
      return ''
    },
    tableStyle() {
      return {
        height: this.tableHeight
      }
    },
    titleNode() {
      if (!this.title) return
      return (
        <div class="c-table__header--item c-table__title">{this.title}</div>
      )
    },
    actionNode() {
      const { action } = this.$slots
      if (!action) return
      return <div class="c-table__header--item c-table__action">{action}</div>
    },
    headNode() {
      const { header } = this.$slots
      if (header) {
        return <div class="c-table__header">{header}</div>
      }
      if (this.titleNode || this.actionNode) {
        return (
          <div class="c-table__header">
            {this.titleNode}
            {this.actionNode}
          </div>
        )
      }
    },
    colGroupNode() {
      return (
        <colgroup>
          {this.tbodyColumns.map(item => {
            const width = convertLengthValue(item.width) ?? 'auto'
            return <col style={{ width }} />
          })}
        </colgroup>
      )
    },
    paginationNode() {
      if (!this.pagination) return
      return (
        <CPagination
          {...{
            props: this.pagination,
            on: {
              'page-change': e => {
                this.$emit('page-change', e)
              }
            }
          }}
        />
      )
    },
    shadowNode() {
      let theadShadow
      if (this.topShadowShown) {
        const tbodyTop = this.$refs.Ctbody?.$el?.offsetTop ?? 0
        const top = (this.$refs.Ctable?.offsetTop ?? 0) + tbodyTop
        const topShadowStyle = {
          top: `${top}px`
        }
        theadShadow = (
          <div class="c-table__shadow--sticky-top" style={topShadowStyle} />
        )
      }
      return theadShadow
    },
    footerNode() {
      const { footer } = this.$slots
      if (!footer) return
      return <div class="c-table__footer">{footer}</div>
    }
  },
  watch: {
    // caveat: would assign `selfSelectedRowKeys` excessively (with same value)
    // after calling `selectRow`
    selectedRowKeys(val) {
      this.selfSelectedRowKeys = val
    },
    expandedRowKeys(val) {
      this.selfExpandedRowKeys = val
    },
    tbodyColumns: {
      handler: function (val) {
        // 查找左侧固定的last key， 右侧固定的first key
        this.findStickyKey(val)
        this.$nextTick(this.updateShadow)
      },
      deep: true,
      immediate: true
    },
    dataSource: {
      handler: function () {
        this.$nextTick(this.updateShadow)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateShadowVisibility()
      this.updateTableShadowStyle()
    })
  },
  methods: {
    /**
     * 供外部调用，去除全选
     */
    updateTableShadowStyle() {
      const { offsetTop = 0, offsetHeight = 0 } = this.getTableDOM() ?? {}
      this.shadowStyle = {
        top: `${offsetTop}px`,
        height: this.tableHeight || `${offsetHeight}px`
      }
    },
    clearSelection() {
      this.setDataAllChecked(false)
    },
    /**
     * 供外部调用，全选
     */
    selectAll() {
      this.setDataAllChecked(true)
    },
    fullScreen() {
      const content = this.$el.querySelector('.c-table--content')
      const requestFullscreen = [
        'requestFullscreen',
        'webkitRequestFullscreen',
        'mozRequestFullScreen',
        'msRequestFullscreen'
      ].find(fn => content[fn])
      /* istanbul ignore next */
      if (content[requestFullscreen]) {
        content[requestFullscreen]()
      }
    },
    exitFullScreen() {
      const exitFullscreen = [
        'exitFullscreen',
        'webkitExitFullscreen',
        'mozCancelFullScreen',
        'msExitFullscreen'
      ].find(fn => document[fn])
      /* istanbul ignore next */
      if (document[exitFullscreen]) {
        document[exitFullscreen]()
      }
    },

    /**
     * @param {array} list tbody columns
     * 查找左侧固定的last key， 右侧固定的first key
     */
    findStickyKey(list) {
      this.leftStickyIndex = findLastIndex(list, { fixed: 'left' })
      this.rightStickyIndex = list.findIndex(item => item.fixed === 'right')
    },
    updateShadowVisibility(container) {
      const el = container ?? this.getTableDOM()
      /* istanbul ignore next */
      const marginRight = el.scrollWidth - el.scrollLeft - el.offsetWidth
      /* istanbul ignore next */
      this.leftShadowShown = this.leftStickyIndex !== -1 && el.scrollLeft > 0
      /* istanbul ignore next */
      this.rightShadowShown = this.rightStickyIndex !== -1 && marginRight > 0
      /* istanbul ignore next */
      this.topShadowShown = this.height !== undefined && el.scrollTop > 0
    },
    onScroll(e) {
      /* istanbul ignore next */
      const el = e.target
      this.updateShadowVisibility(el)
    },
    updateShadow() {
      this.updateShadowVisibility()
      this.updateTableShadowStyle()
    },
    /**
     *
     * @param {Boolean} checked isAllSelected的值
     * @emits {
     *  currentItem 当前操作的行的数据
     *  currentIndex 当前操作的行号
     *  selectedDataList 已选中的数据集
     *  selectedIndexList 以选中的index的集合
     * }
     */
    setDataAllChecked(checked) {
      this.selectRow(this.allRowKeys, checked)
    },
    selectedChange(selectObj) {
      this.$emit('selected-change', selectObj)
    },
    getRowKey(data, rowIndex) {
      const defaultRowKey = this.rowKey
      let result
      if (typeof defaultRowKey === 'string') {
        result = data[defaultRowKey]
      }
      if (typeof defaultRowKey === 'function') {
        result = defaultRowKey(data)
      }
      if (typeof result === 'string') {
        return result
      }
      try {
        return `${JSON.stringify(data)}-${rowIndex}`
      } catch (e) {
        return `${rowIndex}`
      }
    },

    deepFlatten(list) {
      // 收集所有叶子节点
      return list.reduce((last, item) => {
        if (item.children && item.children.length > 0) {
          return [...last, ...this.deepFlatten(item.children)]
        }
        return [...last, item]
      }, [])
    },
    isRowSelected(rowKey) {
      return this.selfSelectedRowKeys.includes(rowKey)
    },
    isSelectAllRows(keys) {
      const hasLength = keys.length > 0
      const uniqueKeys = Array.from(new Set(keys))
      const isSameLength = uniqueKeys.length === this.dataList.length
      if (!hasLength || !isSameLength) {
        return false
      }
      return uniqueKeys.every(key => this.allRowKeys.includes(key))
    },
    selectRow(rowKey, state = true) {
      const keys = [].concat(rowKey)
      if (!state) {
        this.selfSelectedRowKeys = this.selfSelectedRowKeys.filter(
          key => !keys.includes(key)
        )
      } else {
        this.selfSelectedRowKeys = Array.from(
          new Set(this.selfSelectedRowKeys.concat(keys))
        )
      }
      // `v-model` for vue@3 and `.sync` for vue@2
      this.$emit('update:selected-row-keys', this.selfSelectedRowKeys)
      const { selectedDataList, selectedIndexList } = this.dataList.reduce(
        (acc, row, index) => {
          const { [this.rowKeyField]: key } = row
          if (this.selfSelectedRowKeys.includes(key)) {
            acc.selectedDataList.push(row)
            acc.selectedIndexList.push(index)
          }
          return acc
        },
        {
          selectedDataList: [],
          selectedIndexList: []
        }
      )
      if (this.isSelectAllRows(keys)) {
        return this.selectedChange({
          detail: {
            currentItem: {},
            currentIndex: -1,
            selectedIndexList,
            selectedDataList
          }
        })
      }
      keys.forEach(key => {
        const index = this.dataList.findIndex(
          row => row[this.rowKeyField] === key
        )

        if (index < 0) return
        this.selectedChange({
          detail: {
            currentItem: this.dataList[index],
            currentIndex: index,
            selectedDataList,
            selectedIndexList
          }
        })
      })
    },
    isRowExpanded(rowKey) {
      return this.selfExpandedRowKeys.includes(rowKey)
    },
    expandRow(rowKey, state = true) {
      const keys = [].concat(rowKey)
      if (!state) {
        this.selfExpandedRowKeys = this.selfExpandedRowKeys.filter(
          key => !keys.includes(key)
        )
      } else {
        this.selfExpandedRowKeys = Array.from(
          new Set(this.selfExpandedRowKeys.concat(keys))
        )
      }
      // `v-model` for vue@3 and `.sync` for vue@2
      this.$emit('update:expanded-row-keys', this.selfExpandedRowKeys)
      keys.forEach(key => {
        const index = this.dataList.findIndex(
          row => row[this.rowKeyField] === key
        )
        if (index < 0) return
        this.$emit('expand-change', {
          detail: {
            row: this.dataList[index],
            index,
            isExpanded: state
          }
        })
      })
    },
    getTBodyDOM() {
      return this.$refs.Ctbody
    },
    getTableDOM() {
      return this.$refs.Ctable
    }
  },

  render(h) {
    /* this.$slots.default 为table-column使用 */
    // passive events in vue JSX: `&scroll`
    // https://template-explorer.vuejs.org/#%3Cdiv%20%40scroll.passive%3D%22onScroll%22%3E...%3C%2Fdiv%3E%0A
    return (
      <div class="c-table">
        {this.headNode}
        <div
          ref="Ctable"
          class={this.tableContainerClass}
          style={this.tableStyle}
          {...{
            on: {
              '&scroll': this.onScroll
            }
          }}
        >
          <table class={this.tableClass}>
            {this.colGroupNode}
            {this.$slots.default}
            <CTableHead
              ref="thead"
              columns={this.theadColumns}
              sticky={this.theadSticky}
              defaultSort={this.defaultSort}
              scopedSlots={this.$scopedSlots}
            />
            <CTableBody
              ref="Ctbody"
              columns={this.tbodyColumns}
              dataSource={this.dataList}
              rowClassName={this.rowClassName}
              spanMethod={this.spanMethod}
              scopedSlots={this.$scopedSlots}
            />
          </table>
        </div>
        {this.footerNode}
        {this.shadowNode}
        {this.paginationNode}
      </div>
    )
  }
}
