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
    @sort="sorter"
    @selectChange="onSelectChange"
    @selectAllChange="onSelectAllChange"
    @rowEnter="rowEnter"
    @rowLeave="rowLeave"
  )
    +templateCell(columns)
mixin TableWithHeight(columns, tbody, onScroll)
  +Table(columns, "true", "false")
  .c-table__body(
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
          .c-scroll__thead
            +Table("columns", "true", "false")
        .c-table__bodywrapper
          .c-scroll__tbody(
            :style="getScrollTbodyStyle"
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
          +TableWithHeight("fixedLeftColumns", "fixedleft", "onYscroll")
        .c-fixtable__right(
          :class="{'c-fixed__rightscroll': isScrollMove}"
          @mouseenter="setCurrentScrollBox"
          @mouseleave="removeCurrentScrollBox"
          )
          +TableWithHeight("fixedRightColumns", "fixedright", "onYscroll")
    template(v-else)
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
  .c-table(v-else
    :class="withBorderClass"
  )
    template(v-if="height")
      +TableWithHeight("columns", "scrollBody")
    template(v-else)
      +Table("columns")
</template>

<script>
/* global window */
import './index.css'
import { getScrollBarSize } from '../../js/utils'

export default {
  name: 'c-table',
  props: {
    columns: Array,
    datasource: Array,
    height: [String, Number],
    sortkey: String,
    sortorder: String,
    size: String,
    border: String,
    rowClassName: [String, Function]
  },

  data () {
    return {
      dataList: [],
      selection: [],
      fixedLeftColumns: [],
      fixedRightColumns: [],
      hoverRowIndex: '',
      scrollBarSize: 5,
      scrollBox: '',
      allChecked: false,
      indeterminate: false,
      isScrollMove: false
    }
  },

  computed: {
    getScrollTbodyStyle () {
      if (this.$el) {
        const theadHeight = this.$el.querySelector('.c-scroll__thead').getClientRects()[0].height
        return {
          maxHeight: `${this.height - theadHeight}px`
        }
      }
      return {}
    },

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
    columns () {
      this.getColumnsDetail()
      this.height && this.getTbodyStyle()
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
    onSelectAllChange (status) {
      this.allChecked = status
      this.dataList = this.dataList.map(item => {
        this.$set(item, '_checked', status)
        return item
      })
      if (status) {
        this.selection = this.dataList
      } else {
        this.selection = []
      }
      this.$nextTick(() => {
        this.$emit('selectChange', this.selection)
      })
    },
    onSelectChange (currentItem, status) {
      if (status) {
        this.selection.push(currentItem)
      } else {
        this.selection = this.selection.filter(item => item._checked)
      }
      this.$nextTick(() => {
        this.allChecked = this.selection.length === this.dataList.length
        this.indeterminate = this.selection.length > 0 &&
          this.selection.length < this.dataList.length
        this.$emit('selectChange', this.selection)
      })
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
    setCurrentScrollBox (e) {
      this.scrollBox = e.target.className
    },
    removeCurrentScrollBox () {
      this.scrollBox = ''
    },
    getTbodyStyle () {
      const [ tableStyle ] = this.$el.querySelector('table').getClientRects()
      const tbodyEl = this.$el.querySelector('.c-scroll__tbody') || this.$el.querySelector('.c-table__body')
      const theadHeight = tableStyle.height
      const scrollBarHeight = tbodyEl.offsetHeight !== tbodyEl.clientHeight ? this.scrollBarSize : 0
      const height = `${this.height - theadHeight - scrollBarHeight}px`

      if (this.hasFixed) {
        this.$refs.fixedright.style.height = height
        this.$refs.fixedleft.style.height = height
      } else {
        tbodyEl.style.height = height
      }
    },
    getCurrentScrollBarSize () {
      const ua = window.navigator.userAgent
      if (ua.indexOf('MSIE') > 0 ||
        Boolean(ua.match(/Trident.*rv:11./))) {
        this.scrollBarSize = getScrollBarSize()
      }
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
      this.$refs.fixedleft.scrollTop = scrollTop
      this.$refs.fixedright.scrollTop = scrollTop

      scrollEl.scrollLeft = scrollLeft
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
