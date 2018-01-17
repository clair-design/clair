<template lang="pug">
mixin thead(columnsRows)
  thead
    tr(v-for="column in columnsRows")
      th(
        v-for="item in column.columns"
        :style="getCellStyle(item)"
        :colspan="item.colspan"
        :rowspan="item.rowspan"
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
              c-icon(
                type="fa"
                valign="text-bottom"
                name="sort-asc")
            .c-sort-desc(
              :class="{'sorted': checkSorted(item.key, 'desc')}"
              @click="onSorted(item.key, 'desc')"
            )
              c-icon(
                type="fa"
                valign="top"
                name="sort-desc")
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
      v-else
    )
      td(
        v-for="columnsItem in allColumns"
        :style="getCellStyle(columnsItem)"
        :class="columnsItem.classname"
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
  .c-table(v-if="height")
    table
      +thead
    .c-table__body(
      :style="{maxHeight: tbodyHeight +'px'}"
    )
      table
        +tbody
  .c-table(v-else)
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
    sortorder: String
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
    tbodyHeight () {
      const theadHeight = this.$el ? this.$el.querySelector('table').getClientRects()[0].height : 0
      return this.height - theadHeight
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
      return {
        width: item.width ? `${item.width}px` : 'auto',
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
        /* eslint-disable no-nested-ternary */
        item.classname = index === 0
          ? 'c-table__bl'
          : index === list.length - 1 ? 'c-table__br' : ''
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
