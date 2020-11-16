import Button from 'packages/button'
import { props as popoverProps } from 'packages/popover/src/props'
import Popover from 'packages/popover'
import { assign } from 'src/utils'

const props = /*@__PURE__*/ assign(popoverProps, {
  trigger: /*@__PURE__*/ assign(popoverProps.trigger, {
    default: 'click'
  }),
  placement: /*@__PURE__*/ assign(popoverProps.placement, {
    default: 'top'
  }),
  showDelay: /*@__PURE__*/ assign(popoverProps.showDelay, {
    default: 100
  })
})

export default {
  name: 'CPopConfirm',
  inheritAttrs: false,
  props,
  model: {
    prop: 'visible',
    event: 'update:visible'
  },
  data() {
    return {
      ownVisible: Boolean(this.visible)
    }
  },
  computed: {
    isSelfControlled() {
      return typeof this.visible !== 'boolean'
    }
  },
  watch: {
    visible(value) {
      if (value !== this.ownVisible && typeof value === 'boolean') {
        this.ownVisible = value
      }
    },
    ownVisible(value) {
      if (value) {
        this.$nextTick().then(() => {
          this.$refs.confirm?.$el?.focus?.()
        })
      }
    }
  },
  methods: {
    onVisibilityChange(e) {
      this.$emit('update:visible', e.detail.visible)
      this.$emit('visibility-change', e)
      if (this.isSelfControlled) {
        this.ownVisible = e.detail.visible
      }
    },

    confirmHandler(event) {
      this.$emit('confirm', {
        nativeEvent: event
      })
      this.updateVisibility(false)
    },
    cancelHandler(event) {
      this.$emit('cancel', {
        nativeEvent: event
      })
      this.updateVisibility(false)
    },
    updateVisibility(visible) {
      if (this.isSelfControlled) {
        this.ownVisible = visible
      }
      this.onVisibilityChange({ detail: { visible } })
    },
    renderPopConfirm() {
      return (
        <div>
          <div class="c-popconfirm__content">
            <div>{this.$scopedSlots.content?.() || this.content}</div>
          </div>
          <div class="c-popconfirm__footer">{this.getFooter()}</div>
        </div>
      )
    },
    getFooter() {
      if (this.$scopedSlots.footer) {
        return this.$scopedSlots.footer()
      }
      return (
        <div>
          <Button
            class="btn-confirm"
            type="primary"
            size="small"
            on-click={this.confirmHandler}
            ref="confirm"
          >
            确认
          </Button>
          <Button class="btn-cancel" size="small" on-click={this.cancelHandler}>
            取消
          </Button>
        </div>
      )
    }
  },

  render(h) {
    const {
      trigger,
      ownVisible,
      onVisibilityChange,
      content,
      showDelay,
      hideDelay,
      customStyle,
      customClass,
      placement,
      appendTarget,
      transition
    } = this
    return (
      <Popover
        scopedSlots={{
          default: this.$scopedSlots.default,
          content: this.renderPopConfirm
        }}
        content={content}
        trigger={trigger}
        visible={ownVisible}
        on-visibility-change={onVisibilityChange}
        show-delay={showDelay}
        hide-delay={hideDelay}
        custom-style={customStyle}
        custom-class={`c-popconfirm ${customClass ?? ''}`}
        placement={placement}
        append-target={appendTarget}
        transition={transition}
        attrs={this.$attrs}
        role="dialog"
      ></Popover>
    )
  }
}
