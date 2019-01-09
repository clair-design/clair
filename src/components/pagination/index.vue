<template lang="pug">
.c-pagination
  span.c-pagination__total
      slot(name="total")
        | 共
        em {{total}}
        | 条
  span.c-pagination__pages(v-show="pageCount > 1")
    a(
      href="#"
      :class="{'is-disabled': pageNumber == 1}"
      class="c-pagination_prev"
      @click.prevent="goPage(pageNumber - 1)"
    )
      slot(name="prev")
        c-icon(name="chevron-left" valign="middle")
    a(
      href="#"
      class="c-pagination__page"
      :class="{'is-active': pageNumber == 1}"
      @click.prevent="goPage(1)"
    ) 1
    span(
      v-show="spanRange[0] > 2"
      class="c-pagination__ellipsis"
    ) ⋯
    a(
      v-for="n in spanRange"
      href="#"
      class="c-pagination__page"
      :class="{'is-active': n == pageNumber}"
      @click.prevent="goPage(n)"
    ) {{ n }}
    span(
      v-show="showEndEllipse"
      class="c-pagination__ellipsis"
    ) ⋯
    a(
      href="#"
      class="c-pagination__page"
      :class="{'is-active': pageNumber == pageCount}"
      @click.prevent="goPage(pageCount)"
    ) {{ pageCount }}
    a(
      href="#"
      :class="{'is-disabled': pageNumber == pageCount}"
      class="c-pagination_prev"
      @click.prevent="goPage(pageNumber + 1)"
    )
      slot(name="next")
        c-icon(name="chevron-right" valign="middle")
  </span>
</template>

<script>
import './index.css'

export default {
  name: 'c-pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pn: {
      type: Number,
      default: 1
    },
    ps: {
      type: Number,
      default: 20
    },
    span: {
      type: Number,
      default: 3
    }
  },

  data () {
    return {
      pageNumber: this.pn
    }
  },

  computed: {
    pageCount () {
      return Math.ceil(this.total / this.ps) || 0
    },
    /**
     * 计算要显示的页码，不包括第一页和最后一页
     * e.g. [4,5,6,7,8,9,10]
     */
    spanRange () {
      const range = []
      const start = Math.max(this.pageNumber - this.span, 2)
      const end = Math.min(this.pageNumber + this.span, this.pageCount - 1)
      for (let i = start; i <= end; i++) {
        range.push(i)
      }
      return range
    },
    showEndEllipse () {
      const lastPageInRange = this.spanRange[this.spanRange.length - 1]
      return lastPageInRange < (this.pageCount - 1)
    }
  },

  created () {
    this.$watch(vm => [vm.pn, vm.total].join(), _ => {
      const pn = parseInt(this.pn) || 1
      const exceedMax = pn > this.pageCount
      if (exceedMax) {
        this.pageNumber = this.pageCount
        this.$emit('change', this.pageNumber)
      } else {
        this.pageNumber = pn
      }
    })
  },

  methods: {
    /**
     * 切换页码
     * event 点击事件，用以获取target
     */
    goPage (page) {
      if (page < 1 || page > this.pageCount) return
      this.pageNumber = page
      this.$emit('change', page)
    }
  }
}
</script>
