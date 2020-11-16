import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight
} from 'packages/icon'
import SizeSelect from './size-select'
const allowedLayout = ['pages', 'total', 'jump', 'size-select']
export default {
  name: 'CPagination',
  props: {
    size: {
      type: String,
      default: 'normal',
      validator(type) {
        return ['normal', 'small'].includes(type)
      }
    },
    total: {
      type: Number,
      required: true
    },
    pn: {
      type: Number,
      default() {
        return 1
      }
    },
    ps: {
      type: Number,
      default() {
        return 20
      }
    },
    psOptions: {
      type: Array,
      default() {
        // eslint-disable-next-line no-magic-numbers
        return [20, 30, 40, 50]
      },
      validator(val) {
        return val.every(ps => typeof ps === 'number' && !Number.isNaN(ps))
      }
    },
    span: {
      type: Number,
      default() {
        return 2
      }
    },
    layout: {
      type: String,
      default: 'pages',
      validator(value) {
        return value.split(',').every(item => allowedLayout.includes(item))
      }
    },
    simple: {
      type: Boolean,
      default: false
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      jumpPage: ''
    }
  },
  computed: {
    pageNumber() {
      return this.getValidPage(this.pn)
    },
    pageCount() {
      return this.getPageCount(this.ps)
    },
    /**
     * 标记当前page的前后是否展现...
     * 第一页和最后一页是必须展现的
     */
    showStartEllipse() {
      return this.pagers[0] > 2
    },
    showEndEllipse() {
      const lastPageInRange = this.pagers[this.pagers.length - 1]
      return lastPageInRange < this.pageCount - 1
    },
    /**
     * 计算展现的page区间，排除首尾的页号
     */
    pagers() {
      const array = []
      let start = Math.max(2, this.pageNumber - this.span)
      let end = Math.min(this.pageNumber + this.span, this.pageCount - 1)
      // 保证pages的个数不变
      if (this.pageNumber < 2 + this.span) {
        end = Math.min(this.pageCount - 1, start + 2 * this.span)
      } else if (this.pageNumber > this.pageCount - 1 - this.span) {
        start = Math.max(2, this.pageCount - 1 - 2 * this.span)
      }
      for (let i = start; i <= end; i++) {
        array.push(i)
      }
      return array
    },
    isFirstPage() {
      return this.pageNumber === 1
    },
    isLastPage() {
      return this.pageNumber === this.pageCount
    },
    isPnExceedPageCount() {
      return this.pn > this.pageCount
    },
    totalFrag() {
      return (
        <div class="c-pagination__total">
          总共 <em>{this.total}</em> 条
        </div>
      )
    },
    jumpFrag() {
      return (
        <div class="c-pagination__jump">
          跳至
          <input
            class={`c-input c-input--${this.size}`}
            type="number"
            vModel_number={this.jumpPage}
            vOn:change={this.jumpToPage}
          />
          页
        </div>
      )
    },
    sizeSelectFrag() {
      return (
        <SizeSelect
          value={this.ps}
          options={this.psOptions}
          onChange={this.onPageSizeChange}
        />
      )
    }
  },
  watch: {
    isPnExceedPageCount: {
      immediate: true,
      handler(val) {
        if (val) {
          this.ensurePnInRange()
        }
      }
    }
  },
  mounted() {
    this.jumpPage = this.simple ? this.pageNumber : ''
  },
  methods: {
    /**
     * 为了处理tab焦点管理，避免ellipsis点击后焦点还停留在「原来的 ellipsis 对应的 DOM」
     */
    focusCurrentPage() {
      this.$refs.current?.focus()
    },
    ensurePnInRange() {
      this.emitPageChange({
        pn: Math.min(this.pageCount, this.pn),
        ps: this.ps
      })
    },
    emitPageChange(
      detail = {
        pn: this.pn,
        ps: this.ps
      }
    ) {
      this.$emit('page-change', { detail })
    },
    getPageCount(pageSize) {
      if (pageSize <= 0 || this.total <= 0) {
        return 1
      }
      return Math.ceil(this.total / pageSize)
    },
    onPageSizeChange(e) {
      const {
        target: { value }
      } = e
      const nextPageCount = this.getPageCount(value)
      this.emitPageChange({
        // prevent `this.pn` exceed pageCount
        // could rely on `watch isPnExceedPageCount` logic
        // but that would result in emitting `page-change` twice
        pn: Math.min(nextPageCount, this.pn),
        ps: Number(value)
      })
    },
    gotoPage(curPn, e) {
      e && e.preventDefault()
      if (this.pageNumber === curPn) return
      if (this.simple) {
        this.jumpPage = curPn
      }
      this.emitPageChange({ pn: curPn, ps: this.ps })
      if (e) {
        this.$nextTick(this.focusCurrentPage)
      }
    },
    gotoPrevPage(e) {
      e.preventDefault()
      this.gotoValidPage(this.pageNumber - 1)
    },
    gotoNextPage(e) {
      e.preventDefault()
      this.gotoValidPage(this.pageNumber + 1)
    },
    getValidPage(page) {
      let validPage = Math.floor(page)
      if (page < 1) {
        validPage = 1
      } else if (page > this.pageCount) {
        validPage = this.pageCount
      }
      return validPage
    },
    gotoValidPage(page) {
      this.gotoPage(this.getValidPage(page))
    },
    jumpToPage() {
      const jumpPage = this.getValidPage(this.jumpPage)
      this.jumpPage = this.simple ? jumpPage : ''
      this.gotoPage(jumpPage)
    },
    updatePages(trend) {
      let ellipseName = 'showEndEllipse'
      let currentPageNumber = this.pageNumber + 2 * this.span + 1
      if (trend === 'prev') {
        currentPageNumber = this.pageNumber - 2 * this.span - 1
        ellipseName = 'showStartEllipse'
      }
      this.gotoValidPage(currentPageNumber)
      this.$nextTick(() => {
        !this[ellipseName] && this.focusCurrentPage()
      })
    }
  },
  render() {
    if (this.hideOnSinglePage && this.pageCount === 1) return
    const pageClass = pn => {
      return {
        'c-pagination__page': true,
        'c-pagination__page-only': this.pageCount === 1,
        'c-pagination__page--active': pn === this.pageNumber
      }
    }
    const prevBtnClass = {
      'c-pagination__prev': true
    }
    const nextBtnClass = {
      'c-pagination__next': true
    }
    const paginationClass = {
      'c-pagination--simple': this.simple,
      'c-pagination': true,
      [`c-pagination--${this.size}`]: !this.simple
    }
    const ellipse = trend => {
      const hoverIcon =
        trend === 'prev' ? <IconDoubleArrowLeft /> : <IconDoubleArrowRight />
      return (
        <span
          key={trend}
          class="c-pagination__ellipsis"
          role="button"
          tabIndex={0}
          on-click={this.updatePages.bind(this, trend)}
          vOn:keyup_enter={this.updatePages.bind(this, trend)}
        >
          <span>...</span>
          {hoverIcon}
        </span>
      )
    }
    const pageShown = curPage => {
      const isCurrent = curPage === this.pageNumber
      const ref = isCurrent ? { ref: 'current' } : {}
      return (
        <a
          key={curPage}
          role="button"
          aria-label={`跳转到第${curPage}页`}
          aria-current={isCurrent}
          tabIndex={isCurrent ? -1 : 0}
          class={pageClass(curPage)}
          on-click={this.gotoPage.bind(this, curPage)}
          vOn:keyup_enter={this.gotoPage.bind(this, curPage)}
          {...ref}
        >
          {curPage}
        </a>
      )
    }
    const prevBtn = (
      <a
        class={prevBtnClass}
        role="button"
        aria-label="上一页"
        aria-disabled={this.isFirstPage}
        tabIndex={this.isFirstPage ? -1 : 0}
        on-click={this.gotoPrevPage}
        vOn:keyup_enter={this.gotoPrevPage}
      >
        <IconArrowLeft />
      </a>
    )
    const nextBtn = (
      <a
        class={nextBtnClass}
        role="button"
        aria-label="下一页"
        aria-disabled={this.isLastPage}
        tabIndex={this.isLastPage ? -1 : 0}
        on-click={this.gotoNextPage}
        vOn:keyup_enter={this.gotoNextPage}
      >
        <IconArrowRight />
      </a>
    )
    const simplePages = (
      <div>
        {prevBtn}
        <input
          class="c-input"
          type="number"
          vModel_number={this.jumpPage}
          vOn:change={this.jumpToPage}
        />
        <span class="c-pagination__slash">/</span>
        <span class="c-pagination__total-page">{this.pageCount}</span>
        {nextBtn}
      </div>
    )
    const normalPages = (
      <div>
        {prevBtn}
        {pageShown(1)}
        {this.showStartEllipse ? ellipse('prev') : ''}
        {this.pagers.map(n => {
          return pageShown(n)
        })}
        {this.showEndEllipse ? ellipse('next') : ''}
        {this.pageCount > 1 ? pageShown(this.pageCount) : ''}
        {nextBtn}
      </div>
    )
    const pages = this.simple ? simplePages : normalPages
    const { totalFrag, jumpFrag, sizeSelectFrag } = this
    const renderObj = {
      pages,
      total: totalFrag,
      jump: jumpFrag,
      'size-select': sizeSelectFrag
    }
    const layoutList = this.layout.split(',')
    return (
      <nav role="navigation" aria-label="分页器" class={paginationClass}>
        {layoutList.map(item => {
          return renderObj[item]
        })}
      </nav>
    )
  }
}
