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
  template(slot="expandRow" slot-scope="props")
    slot(name="expand" :row="props.row")
mixin Table(columns, onlyhead, onlybody)
  c-basetable(
    :columns=columns
    :datasource="dataList"
    :height="height"
    :sortkey="sortkey"
    :sortorder="sortorder"
    :rowClassName="rowClassName"
    :hoverRowIndex="hoverRowIndex"
    :onlybody=onlybody
    :onlyhead=onlyhead
    :allChecked="allChecked"
    :indeterminate="indeterminate"
    :noresultMsg="noresultMsg"
    @sort="sorter"
    @selectChange="onSelectChange"
    @selectAllChange="onSelectAllChange"
    @rowEnter="rowEnter"
    @rowLeave="rowLeave"
    @openExpand="onOpenExpand"
    :expand="expand"
    :spanMethod="spanMethod"
  )
    +templateCell(columns)
mixin TableWithHeight(columns, tbody, onScroll, nobody)
  .c-scroll__thead
    +Table(columns, "true", "false")
  .c-table__body(
    v-if="!" + nobody
    ref=tbody
    @scroll=onScroll
  )
    +Table(columns, "false", "true")
div(:class="className")
  .c-table(v-if="hasFixed"
    :class="withBorderClass"
  )
    template(v-if="height")
      .c-table__wrapper
        .c-table__headwrapper
          .c-scroll__thead(@scroll="theadScroll")
            +Table("columns", "true", "false")
        .c-table__bodywrapper
          .c-scroll__tbody(
            @mouseenter="setCurrentScrollBox"
            @mouseleave="removeCurrentScrollBox"
            :ref="scrollbody"
            )
            +Table("columns", "false", "true")
        .c-fixtable__left(
          :class="{'c-fixed__leftscroll': isScrollMove}"
          @mouseenter="setCurrentScrollBox"
          @mouseleave="removeCurrentScrollBox"
          )
          template(v-if="datasource.length > 0")
            +TableWithHeight("fixedLeftColumns", "fixedleft", "onYscroll")
          template(v-else)
            +TableWithHeight("fixedLeftColumns", "fixedleft", "onYscroll", "true")
        .c-fixtable__right(
          :class="{'c-fixed__rightscroll': isScrollMove}"
          @mouseenter="setCurrentScrollBox"
          @mouseleave="removeCurrentScrollBox"
          )
          template(v-if="datasource.length > 0")
            +TableWithHeight("fixedRightColumns", "fixedright", "onYscroll")
          template(v-else)
            +TableWithHeight("fixedRightColumns", "fixedright", "onYscroll", "true")
    template(v-else)
      .c-scrolltable(@scroll="onScroll")
        +Table("columns")
      .c-fixtable__left(
        :class="{'c-fixed__leftscroll': isScrollMove}"
        v-if="fixedLeftColumns.length > 0"
        )
        template(v-if="datasource.length > 0")
          +Table("fixedLeftColumns")
        template(v-else)
          +Table("fixedLeftColumns", "true")
      .c-fixtable__right(
        :class="{'c-fixed__rightscroll': isScrollMove}"
        v-if="fixedRightColumns.length > 0"
        )
        template(v-if="datasource.length > 0")
          +Table("fixedRightColumns")
        template(v-else)
          +Table("fixedRightColumns", "true")
  .c-table(v-else
    :class="withBorderClass"
  )
    template(v-if="height")
      +TableWithHeight("columns", "scrollBody", "onScroll")
    template(v-else)
      .c-scroll__table
        +Table("columns")
</template>

<script>
/* global window */
import './index.css'
import { getScrollBarSize } from '@util'

export default {
  name: 'c-table',
  props: {
    columns: Array,
    allSelected: Boolean,
    datasource: Array,
    height: [String, Number],
    sortkey: String,
    sortorder: String,
    size: String,
    border: String,
    rowClassName: [String, Function],
    noresultMsg: {
      type: String,
      default: '暂无数据'
    },
    expand: Boolean,
    spanMethod: Function
  },

  data () {
    return {
      dataList: [],
      selection: [],
      fixedLeftColumns: [],
      fixedRightColumns: [],
      hoverRowIndex: '',
      maxLevel: 1,
      scrollBarSize: 5,
      scrollBox: '',
      allChecked: false,
      indeterminate: false,
      isScrollMove: false,
      composeColumns: []
    }
  },

  computed: {
    withBorderClass () {
      if (!this.border || this.border === 'none') {
        return ''
      }
      let classes = this.border.split(' ')
      classes = classes.map(item => `c-table__${item}`)
      return classes.join(' ')
    },
    className () {
      return this.size ? `c-table__${this.size}` : ''
    },
    hasFixed () {
      return Boolean(this.columns.find(item => Boolean(item.fixed)))
    }
  },

  created () {
    this.composeData()
    this.getColumnsDetail()
  },

  watch: {
    datasource: {
      handler (newVal, oldVal) {
        if (newVal === oldVal) return
        this.composeData()
        this.getColumnsDetail()
        this.$nextTick(_ => {
          this.height && this.getTbodyStyle()
        })
      },
      deep: true
    },
    sortkey () {
      this.composeData()
    },
    sortorder () {
      this.composeData()
    },
    columns () {
      this.getColumnsDetail()
      this.$nextTick(_ => {
        this.height && this.getTbodyStyle()
        if (this.hasFixed) {
          const scrollEl = this.$el.querySelector('.c-scroll__tbody')
          scrollEl && scrollEl.addEventListener('scroll', this.onScroll, false)
        }
      })
    },
    allSelected (status) {
      this.updateSelectAll(status)
    }
  },

  mounted () {
    this.getCurrentScrollBarSize()
    this.height && this.getTbodyStyle()
    if (this.hasFixed) {
      const scrollEl = this.$el.querySelector('.c-scroll__tbody')
      scrollEl && scrollEl.addEventListener('scroll', this.onScroll, false)
    }
  },

  methods: {
    onOpenExpand (item, index) {
      this.$emit('openExpand', item, index)
    },
    updateSelectAll (status) {
      this.allChecked = status
      this.dataList = this.dataList.map(item => {
        this.$set(item, '_checked', status)
        return item
      })
      if (status) {
        this.selection = this.dataList.filter(item => item._checked && !item._disabled)
      } else {
        this.selection = []
      }
    },
    onSelectAllChange (status) {
      this.updateSelectAll(status)
      this.indeterminate = this.selection.length > 0 &&
          this.selection.length < this.dataList.length
      this.$nextTick(() => {
        this.$emit('selectChange', this.selection)
      })
    },
    onSelectChange (currentItem, status) {
      if (status) {
        this.selection.push(currentItem)
      }
      this.selection = this.selection.filter(item => item._checked && !item._disabled)
      this.$nextTick(() => {
        this.allChecked = this.selection.length === this.dataList.length
        this.indeterminate = this.selection.length > 0 &&
          this.selection.length < this.dataList.length
        this.$emit('selectChange', this.selection)
      })
    },
    composeData () {
      this.allChecked = this.allSelected
      const list = []
      const selectedList = []
      this.datasource && this.datasource.map((item, index) => {
        item._checked = (item.hasOwnProperty('_checked') && item._checked) || this.allChecked
        item._disabled = (item.hasOwnProperty('_disabled') && item._disabled) || this.allChecked
        item._showExpand = (item.hasOwnProperty('_showExpand') && item._showExpand)
        item._checked && selectedList.push(item)
        list.push(item)
      })
      this.dataList = list
      this.selection = selectedList
      this.allChecked = this.dataList.length !== 0 && this.selection.length === this.dataList.length
      this.indeterminate = this.selection.length > 0 &&
        this.selection.length < this.dataList.length
    },
    setCurrentScrollBox (e) {
      this.scrollBox = e.target.className
    },
    removeCurrentScrollBox () {
      this.scrollBox = ''
    },
    getTbodyStyle () {
      const [ tableStyle ] = this.$el.querySelector('table').getClientRects()
      const tbodyEl = this.$el.querySelector('.c-scroll__tbody') || this.$el.querySelector('.c-table__body')
      const tbodyWrapper = this.$el.querySelector('.c-table__wrapper')
      const theadHeight = tableStyle.height || this.maxLevel * 40
      const scrollBarHeight = tbodyEl.offsetHeight !== tbodyEl.clientHeight ? this.scrollBarSize : 0
      const height = `${this.height - theadHeight - scrollBarHeight}px`

      if (tbodyWrapper) {
        tbodyWrapper.style.maxHeight = ''
      }

      if (this.hasFixed) {
        if (this.$refs.fixedright) {
          this.$refs.fixedright.style.maxHeight = height
        }
        if (this.$refs.fixedleft) {
          this.$refs.fixedleft.style.maxHeight = height
        }
      }
      tbodyEl.style.maxHeight = `${this.height - theadHeight}px`
    },
    getCurrentScrollBarSize () {
      this.scrollBarSize = getScrollBarSize()
    },
    rowEnter (index) {
      this.hoverRowIndex = index
      this.$emit('rowEnter', index)
    },
    rowLeave () {
      this.hoverRowIndex = ''
      this.$emit('rowLeave')
    },
    onYscroll (e) {
      if (!this.hasFixed) return
      const scrollEl = this.$el.querySelector('.c-scroll__tbody')
      if (!(e.target.parentElement.className).includes(this.scrollBox)) {
        e.target.scrollTop = scrollEl.scrollTop
        return
      }
      this.$refs.fixedleft.scrollTop = e.target.scrollTop
      this.$refs.fixedright.scrollTop = e.target.scrollTop
      scrollEl.scrollTop = e.target.scrollTop
    },
    onScroll (e) {
      if (!e.target.className.includes(this.scrollBox)) {
        // fix mouseleave but scroll is keeping
        e.target.scrollTop = this.$refs.fixedleft.scrollTop
        return
      }

      const { scrollLeft, scrollTop } = e.target
      const scrollEl = this.$el.querySelector('.c-scroll__thead')

      this.isScrollMove = scrollLeft > 0
      if (this.$refs.fixedleft) {
        this.$refs.fixedleft.scrollTop = scrollTop
      }
      if (this.$refs.fixedright) {
        this.$refs.fixedright.scrollTop = scrollTop
      }
      if (scrollEl) {
        scrollEl.scrollLeft = scrollLeft
      }
    },
    theadScroll (e) {
      if (!this.hasFixed) return
      const scrollEl = this.$el.querySelector('.c-scroll__tbody')
      const { scrollLeft } = e.target
      if (scrollEl) {
        scrollEl.scrollLeft = scrollLeft
      }
    },
    sorter ({ key, order }) {
      this.$emit('sort', { key, order })
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
    },
    // set colspan
    getLeafColumns (list) {
      const columns = []
      list.forEach(item => {
        item.level = 1
        if (item.children) {
          item.colspan = this.getAllColumns(item.children).length
          item.children = this.getLeafColumns(item.children)
          item.children = this.getLevels(item)
        } else {
          item.colspan = 1
        }
        columns.push(item)
      })
      return columns
    },
    // set rolspan
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
    getColumnsDetail () {
      const columns = this.getLeafColumns(this.columns)
      const maxlevel = this.findMaxLevel(this.columns)
      const columnsrows = this.getColumnsRows(columns, maxlevel)
      this.composeColumns = this.getLevelColumns(columnsrows, maxlevel)
      this.maxLevel = maxlevel
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
