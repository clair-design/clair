<template lang="pug">
c-notification(
  :title="title"
  :message="message"
  :position="position"
  :duration="duration"
  :offset="offset"
  :isDangerousHtml="isDangerousHtml"
  @close="onCancel"
)
  .c-notification__icon
    c-icon(
      v-if='type'
      type="feather", :name="icon", :class="type")
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
    isDangerousHtml: Boolean
  },
  data () {
    return {
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
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
