<template lang="pug">
c-notification(
  :visible="visible",
  :title="title"
  :message="message"
  :position="position"
  :duration="duration"
  :offset="offset"
  :dangerouslySetInnerHTML="dangerouslySetInnerHTML"
  @close="onClose"
  @after-leave="afterLeave"
)
  .c-notification__icon
    c-icon(
      v-if="type"
      type="feather"
      :name="icon"
      :class="type"
    )
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    position: {
      type: String,
      default: 'topRight'
    },
    duration: Number,
    type: String,
    offset: Number,
    dangerouslySetInnerHTML: Boolean
  },
  data () {
    return {
      visible: true
    }
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
    onClose () {
      this.visible = false
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('destroy')
    }
  }
}
</script>
