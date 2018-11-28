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
      reset: true
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
      this.$emit('handleClicked', value)
    }
  },
  render (h) {
    let {
      setCurrentIndex,
      currentIndex,
      classNames,
      position
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
          ref: `tabs${index}`,
          slot: 'label',
          class: `tabs-nav__item ${disabled ? 'disabled' : ''}`,
          on: {
            tabClicked: value => setCurrentIndex(value, pane)
          }
        },
        pane.componentOptions.children.filter(child => {
          return child.data && child.data.slot === 'label'
        })
      )
    })

    const navWrapperElem = this.mode === 'default' ? [navs, navBar] : [navs]
    const navWrapper = h(
      'div',
      {
        class: 'tabs-nav',
        ref: 'nav'
      },
      navWrapperElem
    )

    const contentWrapper = h(
      'div',
      {
        class: 'tab-pane__content'
      },
      panes.map((pane, index) => {
        return h(
          pane.componentOptions.tag,
          {
            props: Object.assign(pane.componentOptions.propsData, {
              shownav: false,
              index: index + 1
            }),
            ref: `panes${index}`,
            slot: 'label'
          },
          pane.componentOptions.children.filter(child => {
            return !child.data || child.data.slot !== 'label'
          })
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
