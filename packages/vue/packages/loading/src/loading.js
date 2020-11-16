import { zIndexManager, AutoIncreasingCounter } from '@clair/helpers'
import { IconSpin } from 'packages/icon'

const idGen = /*@__PURE__*/ new AutoIncreasingCounter()
export default {
  name: 'CLoading',

  data() {
    return {
      options: {},
      zIndex: zIndexManager.next()
    }
  },
  computed: {
    ariaAttr() {
      if (this.options.text) {
        return {
          'aria-labelledby': this.textId
        }
      }
      return {
        'aria-label': '加载中'
      }
    },
    classes() {
      const { customClass, target } = this.options
      return [
        'c-loading-mask',
        customClass,
        target === 'body' ? 'c-loading-mask--fullscreen' : ''
      ]
    },
    styles() {
      const { zIndex } = this
      const { backgroundColor, top, left, target } = this.options
      let styles = {
        background: backgroundColor,
        top: `${top}`,
        left: `${left}`
      }
      if (target === 'body') {
        styles = { zIndex, ...styles }
      }
      return styles
    },
    sizeClass() {
      return ['c-loading-spin', `c-loading-spin--${this.options.size}`]
    },
    spinDotClass() {
      return ['c-loading-spin__icon', this.options.spinClass]
    },
    textId() {
      return `c-loading-spin__text${idGen.next()}`
    }
  },
  watch: {
    'options.visible'(val) {
      this.setTargetAttr()
      if (val) {
        this.moveUp()
      }
    }
  },
  methods: {
    loadingOut() {
      //loading fade out
      this.options.targetDom.classList.remove(
        'c-loading-container--relative',
        'c-loading-container--hidden'
      )
      if (this.$el) {
        this.options.targetDom.removeChild(this.$el)
        // should be the case for service
        // not for directive
        if (this.options.destroyAfterClose) {
          this.$destroy()
        }
      }
    },
    setTargetAttr() {
      if (this.options.visible) {
        this.options.targetDom.setAttribute('aria-busy', 'true')
        this.options.targetDom.setAttribute('aria-live', 'polite')
      } else {
        this.options.targetDom.removeAttribute('aria-busy')
        this.options.targetDom.removeAttribute('aria-live')
      }
    },
    moveUp() {
      this.zIndex = zIndexManager.next()
    }
  },
  render(h) {
    return (
      <transition appear name="c-loading" on-after-leave={this.loadingOut}>
        <div
          v-show={this.options.visible}
          class={this.classes}
          style={this.styles}
          {...{ attrs: this.ariaAttr }}
        >
          <div class={this.sizeClass}>
            <IconSpin class={this.spinDotClass} />
            <div
              v-show={this.options.text}
              class="c-loading-spin__text"
              id={this.textId}
            >
              {this.options.text}
            </div>
          </div>
        </div>
      </transition>
    )
  }
}
