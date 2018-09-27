<template lang="pug">
table
  thead(v-if="!onlybody")
    tr(v-for="column in columnsRows")
      th(
        v-for="item in column.columns"
        :style="getTHCellStyle(item)"
        :colspan="item.colspan"
        :rowspan="item.rowspan"
        :class="getColumnClassName(item)"
      )
        span.c-table__check(v-if="item.type === 'selection'")
          c-checkbox(
            v-model="allSelect"
            :indeterminate="checkIndeterminate"
            @change="onSelectAllChange"
          )
        slot(:name="item.key + '-base-th'")
          span {{item.title}}
        span.c-table__sort(v-if="item.sorter")
          .c-sort-asc(
            :class="{'sorted': checkSorted(item.key, 'asc')}"
            @click="onSorted(item.key, 'asc')"
          )
            i.sort-asc
          .c-sort-desc(
            :class="{'sorted': checkSorted(item.key, 'desc')}"
            @click="onSorted(item.key, 'desc')"
          )
            i.sort-desc
  tbody(v-if="!onlyhead")
    tr(
      v-if="dataList.length == 0"
    )
      td.c-table__noresult(:colspan="columns.length") {{noresultMsg}}
    template(v-for="dataItem,index in dataList" v-else)
      tr(
        @mouseenter="setCurrentItem(dataItem, index)"
        @mouseleave="resetCurrentItem"
        :class="getRowClassName(item, index)"
      )
        td(
          v-for="columnsItem,colIndex in allColumns"
          :style="getCellStyle(columnsItem)"
          :class="getColumnClassName(columnsItem)"
          @click="openExpand(dataItem, columnsItem, index, colIndex)"
          :colspan="tdSpanMethod(dataItem, columnItem, index, colIndex).colspan"
          :rowspan="tdSpanMethod(dataItem, columnItem, index, colIndex).rowspan"
          v-if="tdSpanMethod(dataItem, columnItem, index, colIndex).rowspan && tdSpanMethod(dataItem, columnItem, index, colIndex).colspan"
        )
          slot(
            :name="columnsItem.key + '-base-td'"
            :item="dataItem"
          )
            span.c-table__expand(v-if="columnsItem.type === 'expand'")
              c-icon(name="chevron-down" v-if="dataItem._showExpand")
              c-icon(name="chevron-right" v-else)
            span.c-table__check(v-if="columnsItem.type === 'selection'")
              c-checkbox(
                v-model="dataItem._checked"
                :disabled="dataItem._disabled"
                @change="onSelectChange"
              )
            div(
              v-if="columnsItem.render"
              v-html="columnsItem.render(index, dataItem[columnsItem.key], dataItem)"
            )
            span(v-else) {{dataItem[columnsItem.key]}}
      tr(v-show="hasExpand && dataItem._showExpand")
        td(:colspan="allColumns.length")
          slot(name="expandRow" :row="dataItem")
</template>

<script>
import './index.css'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'c-basetable',
  props: {
    columns: Array,
    datasource: Array,
    allChecked: Boolean,
    indeterminate: Boolean,
    height: [String, Number],
    sortkey: String,
    sortorder: String,
    rowClassName: [String, Function],
    hoverRowIndex: [Number, String],
    onlybody: [String, Boolean],
    onlyhead: [String, Boolean],
    noresultMsg: String,
    expand: Boolean,
    spanMethod: Function
  },

  data () {
    return {
      dataList: {},
      currentItem: {},
      columnsRows: [],
      allSelect: false,
      checkIndeterminate: false
    }
  },

  computed: {
    allColumns () {
      const columns = cloneDeep(this.columns)
      return this.getAllColumns(columns)
    },
    hasExpand () {
      return this.expand
    }
  },

  created () {
    this.allSelect = this.allChecked
    this.checkIndeterminate = this.indeterminate
    this.dataList = cloneDeep(this.datasource)
  },

  mounted () {
    this.getTHWidth(this.columns)
    const maxlevel = this.findMaxLevel(this.columns)
    this.columnsRows = this.getLevelColumns(this.columns, maxlevel)
  },
  watch: {
    datasource (newVal) {
      this.dataList = cloneDeep(newVal)
    },
    allChecked (newVal) {
      if (this.allSelect === newVal) return
      this.allSelect = newVal
    },
    indeterminate (newVal) {
      this.checkIndeterminate = newVal
    },
    hoverRowIndex () {
      this.$forceUpdate()
    },
    columns () {
      this.getTHWidth(this.columns)
      const maxlevel = this.findMaxLevel(this.columns)
      this.columnsRows = this.getLevelColumns(this.columns, maxlevel)
    }
  },

  methods: {
    tdSpanMethod (row, column, rowIndex, colIndex) {
      let rowspan = 1
      let colspan = 1
      if (this.spanMethod) {
        const spans = this.spanMethod(row, column, rowIndex, colIndex)
        const isArray = spans instanceof Array
        if (isArray) {
          [rowspan, colspan] = spans
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
    openExpand (dataItem, columnsItem, index, colIndex) {
      if (columnsItem.type !== 'expand') return
      dataItem._showExpand = !dataItem._showExpand
      this.$emit('openExpand', dataItem, index)
    },
    getRowClassName (row, rowIndex) {
      const classes = []
      const { rowClassName } = this
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName)
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName({
          row,
          rowIndex
        }))
      }

      if (rowIndex === this.hoverRowIndex) {
        classes.push('row-hover')
      }
      return classes.join(' ')
    },
    getColumnClassName (item) {
      return item.hasOwnProperty('className') ? item.className : ''
    },
    setCurrentItem (item, index) {
      this.currentItem = item
      this.$emit('rowEnter', index)
    },
    resetCurrentItem () {
      this.currentItem = {}
      this.$emit('rowLeave')
    },
    onSelectAllChange (status) {
      this.$emit('selectAllChange', status)
    },
    onSelectChange (status) {
      this.$emit('selectChange', this.currentItem, status)
    },
    checkSorted (key, order) {
      return key === this.sortkey && order === this.sortorder
    },
    onSorted (key, order) {
      this.$emit('sort', { key, order })
    },
    getCellStyle (item) {
      const width = typeof item.width === 'number' ? `${item.width}px` : item.width
      return {
        width: item.width ? width : 'auto',
        textAlign: item.align ? item.align : 'left'
      }
    },
    getTHCellStyle (item) {
      const cellStyle = this.getCellStyle(item)
      const thHeight = 40
      cellStyle.height = item.rowspan ? `${item.rowspan * thHeight}px` : `${thHeight}px`
      return cellStyle
    },
    getAllColumnsRows (list) {
      const columns = []
      list.forEach(item => {
        columns.push(item)
        if (item.children && item.children.length > 0) {
          columns.push(...this.getAllColumnsRows(item.children))
        }
      })
      return columns
    },
    getLevelColumns (list, maxlevel) {
      const allColumns = this.getAllColumnsRows(list)
      const columns = []
      for (let i = 1; i <= maxlevel; i++) {
        columns.push({
          level: i,
          columns: allColumns.filter(item => item.level === i)
        })
      }
      return columns
    },

    findMaxLevel (list) {
      let maxlevel = 0
      list.forEach(item => {
        if (item.children) {
          maxlevel = Math.max(this.findMaxLevel(item.children), maxlevel)
        } else {
          maxlevel = Math.max(item.level, maxlevel)
        }
      })
      return maxlevel
    },

    getTHWidth (list) {
      let width = 0
      list.forEach(item => {
        if (item.children) {
          item.width = this.getTHWidth(item.children)
        }
        width += item.width ? item.width : 0
      })
      return width || ''
    },
    getAllColumns (list) {
      const columns = []
      list.forEach((item, index) => {
        let classname = []
        index === 0 && classname.push('c-table__bl')
        index === list.length - 1 && classname.push('c-table__br')
        classname = classname.join(' ')
        item.className = item.hasOwnProperty('className') ? `${item.className} ${classname}` : classname
        if (item.children && item.children.length > 0) {
          columns.push(...this.getAllColumns(item.children))
        } else {
          columns.push(item)
        }
      })
      return columns
    }

  }
}
</script>
