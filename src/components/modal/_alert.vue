
<template lang="pug">
c-modal(
  :title="title",
  :visible="visible",
  width="400px",
  @close="onCancel",
  @after-leave="$emit('destroy')"
)
  div
    slot(name="message")
  div(slot="footer")
    c-button(primary @click="onConfirm" autofocus) 确定
</template>

<script>
export default {
  props: {
    title: String,
    msg: {
      type: [String, Function],
      require: true
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    onCancel () {
      this.visible = false
      this.$emit('cancel')
    },
    onConfirm () {
      this.visible = false
      this.$emit('confirm')
    }
  },
  watch: {
    msg: {
      immediate: true,
      handler () {
        const { msg } = this
        const h = this.$createElement.bind(this)
        const message = typeof msg === 'function' ? msg(h) : h('span', null, msg)
        this.$slots.message = message
      }
    }
  }
}
</script>
