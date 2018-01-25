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
    :datasource="datasource"
    :height="height"
    :sortkey="sortkey"
    :sortorder="sortorder"
    :rowClassName="rowClassName"
    :hoverRowIndex="hoverRowIndex"
    :onlybody=onlybody
    :onlyhead=onlyhead
    @sort="sorter"
    @selectChange="selectChange"
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
  .c-table(v-if="hasFixed")
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
          @mouseenter="setCurrentScrollBox"
          @mouseleave="removeCurrentScrollBox"
          )
          +TableWithHeight("fixedLeftColumns", "fixedleft", "onYscroll")
        .c-fixtable__right(
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
  .c-table.c-test(v-else)
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
    rowClassName: [String, Function]
  },

  data () {
    return {
      fixedLeftColumns: [],
      fixedRightColumns: [],
      hoverRowIndex: '',
      scrollBarSize: 5,
      scrollBox: ''
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

    className () {
      return this.size ? `c-table__${this.size}` : ''
    },
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
      if (e.target.parentElement.className !== this.scrollBox) return
      this.$refs.fixedleft.scrollTop = e.target.scrollTop
      this.$refs.fixedright.scrollTop = e.target.scrollTop
      const scrollEl = this.$el.querySelector('.c-scroll__tbody')
      scrollEl.scrollTop = e.target.scrollTop
    },
    onScroll (e) {
      if (e.target.className !== this.scrollBox) return
      const { scrollLeft, scrollTop } = e.target
      const scrollEl = this.$el.querySelector('.c-scroll__thead')

      this.$refs.fixedleft.scrollTop = scrollTop
      this.$refs.fixedright.scrollTop = scrollTop

      scrollEl.scrollLeft = scrollLeft
    },
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
