export default {
  name: 'CTabBar',

  props: ['listRef'],

  data() {
    return {
      barOffset: 0,
      barWidth: 0,
      barHeight: 0
    }
  },

  inject: {
    $tabs: { default: null },
    $nav: { default: null }
  },

  computed: {
    currentKey() {
      return this.$tabs.currentKey
    },
    currentIndex() {
      return this.$tabs.currentIndex
    },
    tabPosition() {
      return this.$tabs.tabPosition
    },
    barStyle() {
      const { tabPosition: pos } = this
      if (['top', 'bottom'].includes(pos)) {
        return {
          left: 0,
          width: `${this.barWidth}px`,
          transform: `translateX(${this.barOffset}px)`
        }
      }
      if (['left', 'right'].includes(pos)) {
        return {
          top: 0,
          height: `${this.barHeight}px`,
          transform: `translateY(${this.barOffset}px)`
        }
      }
      return null
    }
  },

  mounted() {
    this.setBarStyle(this.currentKey)
  },

  methods: {
    setBarStyle() {
      // in case scrollbar shows up
      const { listRef = { scrollLeft: 0 } } = this
      const isHorizontal =
        this.tabPosition === 'top' || this.tabPosition === 'bottom'
      this.$nextTick(() => {
        if (this.$nav.getActiveTabDom()) {
          const curTab = this.$nav.getActiveTabDom()
          this.barOffset = isHorizontal
            ? curTab.offsetLeft - listRef.scrollLeft
            : curTab.offsetTop - listRef.scrollTop
          if (isHorizontal) {
            this.barWidth = curTab.offsetWidth
          } else {
            this.barHeight = curTab.offsetHeight
          }
        }
      })
    }
  },

  watch: {
    currentKey() {
      this.setBarStyle()
    },
    currentIndex() {
      this.setBarStyle()
    },
    tabPosition() {
      this.setBarStyle()
    }
  },

  render(h) {
    return <div class="c-tabs__nav-bar" style={this.barStyle} />
  }
}
