<template lang="pug">
mixin templateCell(columns)
  template(
    v-for='item in ' + columns
    :slot="item.key + '-base-th'"
    slot-scope="props"
    v-if="$scopedSlots[item.key+'-th']"
    )
    slot(:name="item.key + '-th'" :item="props")
  template(
    v-for='item in ' + columns
    :slot="item.key + '-base-td'"
    slot-scope="props"
    v-if="$scopedSlots[item.key+'-td']"
  )
    slot(:name="item.key + '-td'" :item="props.item")

mixin Table(columns)
  c-basetable(
    :columns=columns
    :datasource="datasource"
    :height="height"
    :sortkey="sortkey"
    :sortorder="sortorder"
    @sort="sorter"
    @selectChange="selectChange"
  )
    +templateCell(columns)

div
  .c-table(v-if="hasFixed")
    .c-fixtable__left(
      v-if="fixedLeftColumns.length > 0"
      )
      +Table("fixedLeftColumns")
    .c-scrolltable
      +Table("columns")
    .c-fixtable__right(
      v-if="fixedRightColumns.length > 0"
    )
      +Table("fixedRightColumns")
  .c-table(v-else)
    +Table("columns")
</template>

<script>
import './index.css'

export default {
  name: 'c-table',
  props: {
    columns: Array,
    datasource: Array,
    height: [String, Number],
    sortkey: String,
    sortorder: String
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
    selectChange (selection) {
      this.$emit('selectChange', selection)
    },
    sorter ({key, order}) {
      this.$emit('sort', {key, order})
    },
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
