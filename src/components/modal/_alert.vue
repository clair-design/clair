<template lang="pug">
c-modal(
  :title="title",
  :visible="visible",
  width="400px",
  @close="onCancel",
  @after-leave="$emit('destroy')"
)
  div {{msg}}
  div(slot="footer")
    c-button(primary @click="onConfirm" autofocus) 确定
</template>

<script>
export default {
  props: {
    title: String,
    msg: {
      type: String,
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
  }
}
</script>
