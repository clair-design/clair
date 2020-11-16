import { props as popoverProps } from 'packages/popover/src/props'
import Popover from 'packages/popover'
import { assign } from 'src/utils'

const props = /*@__PURE__*/ assign(popoverProps, {
  placement: /*@__PURE__*/ assign(popoverProps.placement, { default: 'top' })
})

export default {
  name: 'CTooltip',
  inheritAttrs: false,
  props,
  model: {
    prop: 'visible',
    event: 'update:visible'
  },
  methods: {
    onVisibilityChange(e) {
      this.$emit('update:visible', e.detail.visible)
      this.$emit('visibility-change', e)
    }
  },
  render(h) {
    const {
      trigger,
      visible,
      onVisibilityChange,
      content,
      showDelay,
      hideDelay,
      customStyle,
      customClass,
      placement,
      appendTarget
    } = this
    return (
      <Popover
        scopedSlots={this.$scopedSlots}
        content={content}
        trigger={trigger}
        visible={visible}
        on-visibility-change={onVisibilityChange}
        show-delay={showDelay}
        hide-delay={hideDelay}
        custom-style={customStyle}
        custom-class={`c-tooltip ${customClass ?? ''}`}
        placement={placement}
        append-target={appendTarget}
        attrs={this.$attrs}
      ></Popover>
    )
  }
}
