import CTabNav from './tab-nav'
import TabPaneProvider from './tab-pane-provider'

export default {
  name: 'CTabs',

  props: {
    activeKey: {
      type: String,
      default: '1'
    },
    tabPosition: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'left', 'right'].includes(value)
      }
    },
    type: String,
    addable: Boolean
  },

  data() {
    return {
      panes: [],
      currentKey: this.activeKey,
      updateTimer: null
    }
  },

  provide() {
    return {
      $tabs: this
    }
  },

  computed: {
    classNames() {
      const { tabPosition, type, addable } = this
      const isCard = type && type === 'card'
      // eslint-disable-next-line no-nested-ternary
      const positionClassName =
        !isCard && tabPosition ? `c-tabs--${tabPosition}` : null
      return [
        'c-tabs',
        isCard ? 'c-tabs--card' : null,
        positionClassName,
        isCard && addable ? 'c-tabs-addable' : null
      ]
    },
    currentIndex() {
      return this.validPanes.findIndex(pane => pane.tabKey === this.currentKey)
    },
    validPanes() {
      return this.panes.filter(Boolean)
    }
  },

  watch: {
    activeKey(newKey) {
      this.setCurrentKey(newKey)
    }
  },

  methods: {
    setCurrentKey(key) {
      if (this.currentKey !== key) {
        this.$emit('change', { detail: { key } })
        this.currentKey = key
      }
    },

    clickHandler(key) {
      this.$emit('click', { detail: { key } })
      this.setCurrentKey(key)
    },

    closeHandler(key) {
      // get the correct nav dom and click
      if (this.currentKey === key) {
        const index = this.panes.findIndex(pane => pane.tabKey === key)
        const { dom, key: newKey } = this.$refs.tabNav.getNextActive(
          index,
          'forward'
        )
        if (dom) {
          dom.focus()
          dom.click()
          this.setCurrentKey(newKey)
        }
      }

      this.panes = this.panes.filter(pane => pane.tabKey !== key)
      this.$emit('close', {
        detail: { key }
      })
    },

    addHandler() {
      this.$emit('add')
    },

    updatePane(index, instance) {
      this.panes[index] = instance
      this.update()
    },

    deletePane(index, instance) {
      if (this.panes[index] !== instance) {
        return
      }

      this.panes[index] = null
      this.update()
    },

    update() {
      this.panes = [...this.panes]
      this.batchClean()
    },

    cleanPanes() {
      this.panes = this.panes.filter(Boolean)
    },

    batchClean() {
      if (this.updateTimer) {
        clearTimeout(this.updateTimer)
      }
      this.updateTimer = setTimeout(this.cleanPanes)
    },

    renderPanes() {
      return this.$scopedSlots
        .default?.()
        .filter(item => Boolean(item.tag))
        .map((item, index) => {
          return (
            <TabPaneProvider key={item.data.key ?? index} index={index}>
              {item}
            </TabPaneProvider>
          )
        })
    }
  },

  render(h) {
    return (
      <div class={this.classNames}>
        <CTabNav
          panes={this.validPanes}
          onClick={this.clickHandler}
          onClose={this.closeHandler}
          onAdd={this.addHandler}
          ref="tabNav" // ! 添加引用
        />
        <div class="c-tabs__pane-container">{this.renderPanes()}</div>
      </div>
    )
  }
}
