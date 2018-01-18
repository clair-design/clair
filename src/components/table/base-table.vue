<template lang="pug">
mixin thead(columnsRows)
  thead
    tr(v-for="column in columnsRows")
      th(
        v-for="item in column.columns"
        :style="getCellStyle(item)"
        :colspan="item.colspan"
        :rowspan="item.rowspan"
        :class="getColumnClassName(item)"
      )
        slot(:name="item.key + '-base-th'")
          span {{item.title}}
          span.c-table__check(v-if="item.type === 'selection'")
            c-checkbox(
              v-model="allChecked"
              :indeterminate="indeterminate"
              @change="onSelectAllChange"
            )
          span.c-table__sort(v-else-if="item.sorter")
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
mixin tbody(dataList, columns, allColumns)
  tbody
    tr.c-table__noresult(
      v-if="dataList.length == 0"
    )
      td(:colspan="columns.length") 暂无数据
    tr(
      v-for="dataItem,index in dataList"
      @mouseenter="setCurrentItem(dataItem)"
      @mouseleave="resetCurrentItem"
      :class="getRowClassName(item, index)"
      v-else
    )
      td(
        v-for="columnsItem in allColumns"
        :style="getCellStyle(columnsItem)"
        :class="getColumnClassName(columnsItem)"
      )
        slot(
          :name="columnsItem.key + '-base-td'"
          :item="dataItem"
        )
          span.c-table__check(v-if="columnsItem.type === 'selection'")
            c-checkbox(
              v-model="dataItem._checked"
              @change="onSelectChange"
            )
          div(
            v-if="columnsItem.render"
            v-html="columnsItem.render(index, dataItem[columnsItem.key], dataItem)"
          )
          span(v-else) {{dataItem[columnsItem.key]}}
div
  template(v-if="height")
    table
      +thead
    .c-table__body(
      :style="getTbodyStyle"
    )
      table
        +tbody
  template(v-else)
    table
      +thead
      +tbody
</template>

<script>
import './index.css'

export default {
  name: 'c-basetable',
  props: {
    columns: Array,
    datasource: Array,
    height: [String, Number],
    sortkey: String,
    sortorder: String,
    rowClassName: [String, Function]
  },

  data () {
    return {
      dataList: [],
      allChecked: false,
      indeterminate: false,
      selection: [],
      currentItem: {}
    }
  },

  computed: {
    getTbodyStyle () {
      if (this.$el) {
        const tableStyle = this.$el.querySelector('table').getClientRects()[0]
        const theadWidth = tableStyle.width
        const tbodyHeight = tableStyle.height
        return {
          maxHeight: `${this.height - tbodyHeight}px`,
          width: `${theadWidth}px`
        }
      }
      return {
        maxHeight: 0,
        width: 0
      }
    },
    columnsRows () {
      const columns = this.getLeafColumns(this.columns)
      const maxlevel = this.findMaxLevel(columns)
      const columnsrows = this.getColumnsRows(columns, maxlevel)
      return this.getLevelColumns(columnsrows, maxlevel)
    },
    allColumns () {
      return this.getAllColumns(this.columns)
    }
  },

  created () {
    this.composeData()
  },

  watch: {
    datasource (newVal, oldVal) {
      if (newVal === oldVal) return
      this.composeData()
    }
  },

  methods: {
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
      return classes.join(' ')
    },
    getColumnClassName (item) {
      return item.hasOwnProperty('className') ? item.className : ''
    },
    setCurrentItem (item) {
      this.currentItem = item
    },
    resetCurrentItem () {
      this.currentItem = {}
    },
    onSelectAllChange (status) {
      this.dataList = this.dataList.map(item => {
        this.$set(item, '_checked', status)
        return item
      })
      if (status) {
        this.selection = this.dataList
      } else {
        this.selection = []
      }
      this.$emit('selectChange', this.selection)
    },
    onSelectChange (status) {
      if (status) {
        this.selection.push(this.currentItem)
      } else {
        this.selection = this.selection.filter(item => item._checked)
      }
      this.allChecked = this.selection.length === this.dataList.length
      this.indeterminate = this.selection.length > 0 && this.selection.length < this.dataList.length
      this.$emit('selectChange', this.selection)
    },
    composeData () {
      const list = []
      this.datasource.map((item, index) => {
        item._checked = item.hasOwnProperty('_checked') || item._checked
        item._disabled = item.hasOwnProperty('disabled') || item._disabled
        list.push(item)
      })
      this.dataList = list
    },
    checkSorted (key, order) {
      return key === this.sortkey && order === this.sortorder
    },
    onSorted (key, order) {
      this.$emit('sort', {key, order})
    },
    getCellStyle (item) {
      const width = typeof item.width === 'number' ? `${item.width}px` : item.width
      return {
        width: item.width ? width : 'auto',
        textAlign: item.align ? item.align : 'left'
      }
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

    getLevels (item) {
      item.children.forEach(child => {
        child.level = item.level + 1
        if (child.children) {
          child.children = this.getLevels(child)
        }
      })
      return item.children
    },

    getLeafColumns (list) {
      const columns = []
      list.forEach(item => {
        item.level = 1
        if (item.children) {
          item.colspan = item.children.length
          item.children = this.getLeafColumns(item.children)
          item.children = this.getLevels(item)
        } else {
          item.colspan = 1
        }
        columns.push(item)
      })
      return columns
    },

    getColumnsRows (list, maxLevel) {
      list.forEach(item => {
        item.rowspan = maxLevel - item.level + 1
        if (item.children) {
          item.rowspan = 1
          item.children = this.getColumnsRows(item.children, maxLevel)
        }
      })
      return list
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
