import CTabBar from './tab-bar'
import { IconClose } from 'packages/icon'
import { KEYS } from './constant'

export default {
  name: 'CTabNav',

  props: {
    panes: Array
  },

  inject: {
    $tabs: { default: null }
  },

  provide() {
    return {
      $nav: this
    }
  },

  methods: {
    getLabel(pane) {
      return pane.label
    },
    clickHandler({ disabled, key }) {
      if (disabled) {
        return
      }
      this.$emit('click', key)
    },
    emitClose(key, event) {
      event.stopPropagation()
      this.$emit('close', key)
    },
    emitAdd() {
      this.$emit('add')
    },
    getNextActive(index, direction = 'forward') {
      const { tabsData: siblings, validTabsData } = this
      const len = siblings.length
      if (!validTabsData.length) {
        return {
          dom: null,
          key: ''
        }
      }
      const getDomAndKey = i => {
        return {
          dom: this.getTabsDom()[i],
          key: this.tabsData[i].tabKey
        }
      }

      // recursively find the "next" active-able element
      if (direction === 'forward') {
        if (index === len - 1) {
          return this.getNextActive(-1, 'forward')
        }
        if (this.canTabBeActive(index + 1)) {
          return getDomAndKey(index + 1)
        }
        return this.getNextActive(index + 1, 'forward')
      }
      // backward 同理
      if (direction === 'backward') {
        if (index === 0) {
          return this.getNextActive(len, 'backward')
        }
        if (this.canTabBeActive(index - 1)) {
          return getDomAndKey(index - 1)
        }
        return this.getNextActive(index - 1, 'backward')
      }
    },
    keydownHandler(e) {
      if (!this.$refs.nav.contains(document.activeElement)) {
        return
      }
      const { code, target } = e
      if (!Object.values(KEYS).includes(code)) return

      e.preventDefault()
      // which tab has the focus now
      const index = this.getTabsDom().findIndex(tab => tab === target)
      if (index < 0) return
      const { tabKey: key, closable } = this.tabsData[index]
      if (code === KEYS.BACKSPACE) {
        if (this.$tabs.type && this.$tabs.type === 'card' && closable) {
          this.$emit('close', key)
        }
      } else {
        let keyNode
        let newKey = key
        if (code === KEYS.LEFT || code === KEYS.UP) {
          // previous sibling
          const { dom, key: nextKey } = this.getNextActive(index, 'backward')
          keyNode = dom
          newKey = nextKey
        } else {
          // next sibling
          const { dom, key: nextKey } = this.getNextActive(index, 'forward')
          keyNode = dom
          newKey = nextKey
        }

        if (!keyNode) return

        this.$tabs.setCurrentKey(newKey)
        keyNode.focus()
        keyNode.click()
      }
    },
    // about why using methods instead of computed
    // SEE https://vuejs.org/v2/api/#ref
    // tip: $refs is non-reactive
    // dom reference to tab
    // ! 管理 dom
    getTabsDom() {
      return this.tabsData.map(({ tabKey }) => this.$refs[`tab-${tabKey}`])
    },
    getActiveTabDom() {
      const { currentKey } = this
      const found = this.tabsData.some(({ tabKey }) => tabKey === currentKey)
      if (found) {
        return this.$refs[`tab-${currentKey}`]
      }
    },
    canTabBeActive(index) {
      const { disabled } = this.tabsData[index]
      const isDisabled = disabled
      const isCurrent = index === this.currentIndex
      return !isDisabled && !isCurrent
    }
  },
  computed: {
    currentKey() {
      return this.$tabs.currentKey
    },
    currentIndex() {
      return this.$tabs.currentIndex
    },
    // shorthand for this.$tabs.panes
    tabsData() {
      return this.$tabs.validPanes
    },
    // data that are NOT disabled && Not current
    validTabsData() {
      const { currentKey } = this
      return this.tabsData.filter(
        ({ disabled, tabKey }) => !disabled && tabKey !== currentKey
      )
    }
  },

  render(h) {
    const { currentKey, type, addable } = this.$tabs
    const { panes } = this
    const navItems = panes.map(pane => {
      const { tabKey: key, disabled } = pane
      const closable = type === 'card' && pane.closable
      const active = key === currentKey

      const className = {
        'c-tabs__item': true,
        'c-tabs__item-disabled': disabled,
        'c-tabs__item-active': active,
        'c-tabs__item-closable': closable
      }

      const closeIcon = closable ? (
        <IconClose
          class="c-icon--close-tab"
          role="button"
          tabindex="0"
          aria-label="关闭标签"
          onClick={e => this.emitClose(key, e)}
        />
      ) : null

      const id = `tab-${key}`

      return (
        <div
          class={className}
          id={id}
          role="tab"
          tabindex={active ? 0 : -1}
          aria-selected={active ? 'true' : 'false'}
          aria-controls={`panel-${key}`}
          ref={id}
          slot="label"
          onClick={() => this.clickHandler({ disabled, key })}
          key={id}
        >
          {pane.getLabel()}
          {closeIcon}
        </div>
      )
    })

    const nav = (
      <div class="c-tabs__nav" ref="nav" role="tablist">
        {navItems}
      </div>
    )

    const navBar = <CTabBar listRef={this.$refs.navList} />

    const addBtn = (
      <div class="add-btn-container" onClick={this.emitAdd}>
        <button />
      </div>
    )

    const isCard = type === 'card'

    const navContainer = (
      <div class="c-tabs__nav-container" onKeydown={this.keydownHandler}>
        <div class="c-tabs__nav-list" ref="navList">
          {nav}
        </div>
        {isCard ? null : navBar}
        {isCard && addable ? addBtn : null}
      </div>
    )

    return navContainer
  }
}
