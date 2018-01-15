<template lang="pug">
div
  .c-table(v-if="hasFixed")
    c-basetable.c-fixtable__left(
      v-if="fixedLeftColumns.length > 0"
      :columns="fixedLeftColumns"
      :datasource="datasource"
    )
    c-basetable.c-scrolltable(
      :columns="columns"
      :datasource="datasource"
    )
    c-basetable.c-fixtable__right(
      v-if="fixedRightColumns.length > 0"
      :columns="fixedRightColumns"
      :datasource="datasource"
    )
  .c-table(v-else)
    c-basetable(
      :columns="columns"
      :datasource="datasource"
      :height="height"
    )
</template>

<script>
import './index.css'

export default {
  name: 'c-table',
  props: {
    columns: Array,
    datasource: Array,
    height: [String, Number]
  },

  data () {
    return {
      fixedLeftColumns: [],
      fixedRightColumns: []
    }
  },

  computed: {
    hasFixed () {
      return Boolean(this.columns.find(item => Boolean(item.fixed)))
    }
  },

  created () {
    this.getColumnsDetail()
  },

  watch: {
    columns () {
      this.getColumnsDetail()
    }
  },

  methods: {
    getColumnsDetail () {
      if (!this.hasFixed) return
      const leftColumns = []
      const rightColumns = []
      this.columns.map(item => {
        if (item.fixed) {
          item.fixed === 'left' && leftColumns.push(item)
          item.fixed === 'right' && rightColumns.push(item)
        }
      })
      this.fixedLeftColumns = leftColumns
      this.fixedRightColumns = rightColumns
    }
  }
}
</script>
