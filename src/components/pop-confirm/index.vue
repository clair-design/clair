<template lang="pug">
c-tip(
  ref="tip",
  theme="light",
  trigger="click",
  max-width="300px",
  :position="position",
  :disabled="disabled"
)
    .c-pop-confirm(slot="content")
      .c-pop-confirm__body
        slot(name="content")
      .c-pop-confirm__footer
        c-button(outline, size="sm", @click="handleCancel") {{ cancelText }}
        c-button(primary, size="sm", @click="handleConfirm") {{ okText }}
    slot
</template>

<script>
import CTip from '../tip'
import CButton from '../button'

import './index.css'

export default {
  name: 'c-pop-confirm',
  props: {
    disabled: Boolean,
    position: {
      type: String,
      default: 'top'
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  components: { CTip, CButton },
  methods: {
    show () {
      this.$refs.tip.show({ type: 'click' })
    },
    hide () {
      this.$refs.tip.hide({ type: 'click' })
    },
    handleCancel () {
      this.hide()
      this.$emit('cancel')
    },
    handleConfirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>
