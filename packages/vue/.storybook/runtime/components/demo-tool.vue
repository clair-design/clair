<template>
  <div class="vue-demo-tools">
    <input
      v-model="checked"
      @change="togglePre"
      type="checkbox"
      tabindex="-1"
      aria-hidden="true"
    />
    <label aria-hidden="true"></label>
  </div>
</template>

<script>
let uid = 0

export default {
  name: 'DemoTool',
  data() {
    return { checked: false }
  },
  mounted() {
    this.$nextTick(() => {
      const qs = s => this.$el.querySelector(s)
      const id = `x-toggle-${uid++}`
      qs('input').id = id
      qs('label').htmlFor = id

      const pre = this.$el.nextElementSibling
      if (pre) {
        pre.addEventListener('focus', this.onPreFocus)
      }
    })
  },
  beforeDestroy() {
    const pre = this.$el.nextElementSibling
    if (pre) {
      pre.removeEventListener('focus', this.onPreFocus)
    }
  },
  methods: {
    togglePre() {
      const pre = this.$el.nextElementSibling
      if (pre) {
        pre.style.height = this.checked ? `${pre.scrollHeight}px` : 0
      }
    },
    onPreFocus() {
      this.checked = true

      this.$nextTick(() => {
        this.togglePre()
      })
    }
  }
}
</script>
