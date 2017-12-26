<template lang="pug">
c-modal(
  width="400px",
  :title="title",
  :visible="visible",
  @close="onCancel",
  @after-leave="$emit('destroy')"
)
  .c-modal-message
    c-icon(type="feather", :name="icon", :class="type")
    div {{msg}}
  div(slot="footer")
    c-button(outline, @click="onCancel") 取消
    c-button(primary, @click="onConfirm" autofocus) 确认
</template>

<script>
export default {
  props: {
    title: String,
    msg: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data () {
    return { visible: true }
  },
  computed: {
    icon () {
      switch (this.type) {
        case 'success':
          return 'check-circle'
        case 'warning':
          return 'alert-circle'
        case 'error':
          return 'alert-triangle'
        case 'info':
        default:
          return 'info'
      }
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
  }
}
</script>
