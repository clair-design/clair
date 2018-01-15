<template lang="pug">
mixin thead(columnsRows)
  thead
    tr(v-for="column in columnsRows")
      th(
        v-for="item in column.columns"
        :style="{width: item.width ? item.width + 'px' : 'auto'}"
        :colspan="item.colspan"
        :rowspan="item.rowspan"
      )
        slot(:name="item.key + '-th'")
          span {{item.title}}
mixin tbody(dataList, columns, allColumns)
  tbody
    tr.c-table__noresult(
      v-if="dataList.length == 0"
    )
      td(:colspan="columns.length") 暂无数据
    tr(
      v-for="dataItem,index in dataList"
      v-else
    )
      td(
        v-for="columnsItem in allColumns"
        :style="{width: columnsItem.width ? columnsItem.width + 'px' : 'auto'}"
        :class="columnsItem.classname"
      )
        slot(
          :name="columnsItem.key + '-td'"
          :item="dataItem"
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
    height: [String, Number]
  },

  computed: {
    tbodyHeight () {
      const theadHeight = this.$el ? this.$el.querySelector('table').getClientRects()[0].height : 0
      return this.height - theadHeight
    },
    dataList () {
      return this.datasource
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

  methods: {
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
