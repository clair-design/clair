import { AutoIncreasingCounter } from '@clair/helpers'
import { IconArrowRight } from 'packages/icon'
import { waitFrames } from 'src/utils'

/**
 * for a11y, see
 * https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html
 */

const counter = /*@__PURE__*/ new AutoIncreasingCounter()

export default {
  name: 'CCollapseItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  inject: ['$collapse'],
  computed: {
    isActive() {
      return this.$collapse?.value.includes(this.name) ?? false
    },
    id() {
      return `c-collapse-item-${counter.next()}`
    },
    tabindex() {
      return this.disabled ? null : '0'
    }
  },
  watch: {
    isActive(val) {
      // set explicit `maxHeight` to DOM
      this.updateMaxHeight(!val)
      /**
       * create two frames here.
       * first frame: would be called before
       * the first `maxHeight` got painted
       * second frame: now the first `maxHeight` have been applied,
       * we try to update the style with the second `maxHeight`
       * if only wait for one frame
       * we would apply the second `maxHeight` before the first one got painted,
       * which equal to:
       * `auto` -> skip first `maxHeight` -> second `maxHeight`
       */
      waitFrames(() => {
        this.updateMaxHeight(val)
      }, 2)
    }
  },
  mounted() {
    this.updateMaxHeight(this.isActive)
  },
  methods: {
    updateMaxHeight(toExpand) {
      const { content } = this.$refs
      content.style.maxHeight = toExpand ? `${content.scrollHeight}px` : 0
    },
    onItemClick(e) {
      e?.preventDefault?.()
      if (this.disabled) return
      this.$collapse?.toggleActiveNames({
        name: this.name,
        isActive: this.isActive
      })
    },
    onKeydown(e) {
      // vOn:keydown_enter is not easy to be tested
      const KEYS = ['Enter', ' ']
      if (!KEYS.includes(e.key)) {
        return
      }
      this.onItemClick(e)
    },
    resetMaxHeight() {
      const { style } = this.$refs.content
      style.maxHeight = null
    }
  },
  render(h) {
    const headerClassNames = {
      'c-collapse-item__header': true,
      'c-collapse-item--disabled': this.disabled
    }

    const iconClassNames = {
      'c-collapse-item__icon': true,
      'c-collapse-item__icon--active': this.isActive
    }

    const contentClassNames = {
      'c-collapse-item__content': true,
      'c-collapse-item--active': this.isActive
    }

    return (
      <div class="c-collapse-item">
        <div
          class={headerClassNames}
          tabindex={this.tabindex}
          aria-expanded={`${this.isActive}`}
          aria-controls={this.id}
          onClick={this.onItemClick}
          onKeydown={this.onKeydown}
        >
          <IconArrowRight class={iconClassNames} />
          <div class="c-collapse-item__title">
            {this.$scopedSlots.title?.() || this.title}
          </div>
        </div>
        <div
          class={contentClassNames}
          id={this.id}
          ref="content"
          on-transitionend={this.resetMaxHeight}
        >
          <div class="c-collapse-item__inner">
            {this.$scopedSlots.default?.()}
          </div>
        </div>
      </div>
    )
  }
}
