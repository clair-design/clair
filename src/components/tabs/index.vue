<script>
import { VueTypes } from '@util'
import './index.css'

export default {
  name: 'c-tabs',
  props: {
    mode: VueTypes.string.def('default'),
    position: VueTypes.string.def('top'),
    activeIndex: VueTypes.string.def('1'),
    type: VueTypes.string.def(''),
    color: VueTypes.string.def('')
  },
  provide () {
    return {
      rootTabs: this
    }
  },
  data () {
    return {
      panes: [],
      currentIndex: +this.activeIndex,
      reset: true,
      focusable: true,
      isFocused: false
    }
  },
  computed: {
    classNames () {
      const classNames = ['c-tabs']
      const { mode, position, color } = this
      if (mode) classNames.push(`c-tabs--${mode}`)
      if (position) classNames.push(`c-tabs--${position}`)
      if (color) classNames.push(`c-tabs--${color}`)
      return classNames
    }
  },
  mounted () {
    this.setPanes()
    window.addEventListener('blur', this.windowBlurHandler)
    window.addEventListener('focus', this.windowFocusHandler)
  },
  watch: {
    activeIndex (value) {
      this.setCurrentIndex(value)
    },
    position () {
      this.reset = false
      this.$nextTick(() => {
        this.reset = true
      })
    }
  },
  methods: {
    setPanes () {
      if (this.$slots.default) {
        const paneComponents = this.$slots.default.filter(vNode => vNode.tag && vNode.componentOptions && vNode.componentOptions.tag === 'c-tab-pane')
        const panes = paneComponents.map((node) => {
          if (node.componentInstance) {
            return node.componentInstance
          }
        })
        this.panes = panes
      } else if (this.panes.length !== 0) {
        this.panes = []
      }
    },
    setCurrentIndex (value, pane) {
      if (pane.componentOptions && pane.componentOptions.propsData && pane.componentOptions.propsData.disabled) return
      if (this.currentIndex === value) return
      this.currentIndex = value
      this.setPaneAriaHidden(value)
      this.$emit('changed', value)
    },
    setPaneAriaHidden (value) {
      const paneList = [].slice.call(this.$el.querySelectorAll('[role=tabpanel]'))
      for (let i = 0; i < paneList.length; i++) {
        paneList[i].setAttribute('aria-hidden', true)
      }
      paneList[value - 1].removeAttribute('aria-hidden')
    },
    getPaneChildren (pane) {
      if (!pane.componentOptions.children) {
        return pane.componentOptions.propsData.label
      }
      return pane.componentOptions.children.filter(
        child => child.data && child.data.slot === 'label'
      )
    },
    getPaneContent (pane) {
      if (!pane.componentOptions.children) {
        return ''
      }
      return pane.componentOptions.children.filter(child => {
        return !child.data || child.data.slot !== 'label'
      })
    },
    clickHandler (value, pane) {
      this.removeFocus()
      this.setCurrentIndex(value, pane)
    },
    windowBlurHandler () {
      this.focusable = false
    },
    windowFocusHandler () {
      setTimeout(() => {
        this.focusable = true
      }, 50)
    },
    keydownHandler (e) {
      const keyCode = e.keyCode
      let nextIndex
      let currentIndex, tabList, validTabArray
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        tabList = e.currentTarget.querySelectorAll('[role=tab]')
        validTabArray = Array.prototype.slice.call(tabList).filter(item => +item.getAttribute('tabindex') !== -1)
        currentIndex = Array.prototype.indexOf.call(validTabArray, e.target)
      } else {
        return
      }
      if (keyCode === 37 || keyCode === 38) {
        if (currentIndex === 0) {
          nextIndex = validTabArray.length - 1
        } else {
          nextIndex = currentIndex - 1
        }
      } else {
        if (currentIndex < validTabArray.length - 1) {
          nextIndex = currentIndex + 1
        } else {
          nextIndex = 0
        }
      }
      validTabArray[nextIndex].focus()
      validTabArray[nextIndex].click()
      this.setFocus()
    },
    setFocus () {
      if (this.focusable) {
        this.isFocused = true
      }
    },
    removeFocus () {
      this.isFocused = false
    }
  },
  render (h) {
    let {
      clickHandler,
      currentIndex,
      classNames,
      position,
      keydownHandler,
      setFocus,
      removeFocus
    } = this
    const panes = this.$slots.default.filter(pane => {
      return pane && pane.componentOptions
    })
    const navBar = h(
      'c-tab-bar',
      {
        class: 'c-tab-bar',
        props: {
          activeIndex: currentIndex > panes.length ? 1 : currentIndex,
          position: position
        }
      }
    )

    const navs = panes.map((pane, index) => {
      const disabled = pane.data && pane.data.attrs && pane.data.attrs.disabled
      return h(
        pane.componentOptions.tag,
        {
          props: Object.assign(pane.componentOptions.propsData, {
            shownav: true,
            index: index + 1,
            disabled: disabled
          }),
          attrs: {
            role: 'tab',
            tabindex: disabled ? -1 : index
          },
          ref: `tabs${index}`,
          slot: 'label',
          class: `tabs-nav__item ${disabled ? 'disabled' : ''} ${this.isFocused ? 'is-focused' : ''}`,
          on: {
            tabClicked: value => clickHandler(value, pane)
          },
          nativeOn: {
            focus: () => setFocus(),
            blur: () => removeFocus()
          }
        },
        this.getPaneChildren(pane)
      )
    })

    const navOuter = h(
      'div',
      {
        class: 'nav-outer'
      },
      navs
    )

    const navWrapperElem = this.mode === 'default' ? [navOuter, navBar] : [navs]
    const navWrapper = h(
      'div',
      {
        class: 'tabs-nav',
        ref: 'nav',
        attrs: {
          role: 'tablist'
        },
        on: {
          keydown: (event) => keydownHandler(event)
        }
      },
      navWrapperElem
    )

    const contentWrapper = h(
      'div',
      {
        class: 'tab-pane__content'
      },
      panes.map((pane, index) => {
        let ariaHidden = +this.activeIndex === index + 1 ? {} : { 'aria-hidden': true }
        return h(
          pane.componentOptions.tag,
          {
            props: Object.assign(pane.componentOptions.propsData, {
              shownav: false,
              index: index + 1
            }),
            attrs: Object.assign({
              id: `pane-${index + 1}`,
              role: 'tabpanel',
              'aria-labelledby': `tab-${index + 1}`
            }, ariaHidden),
            ref: `panes${index}`,
            slot: 'label'
          },
          this.getPaneContent(pane)
        )
      })
    )
    if (this.reset) {
      return h(
        'div',
        {
          class: classNames
        },
        [navWrapper, contentWrapper]
      )
    }

    return null
  }
}
</script>
