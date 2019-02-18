<template>
  <div class="vue-demo-tools">
    <input v-model="checked" @change="togglePre" type="checkbox" tabindex="-1" aria-hidden="true"/>
    <label aria-hidden="true"></label>
    <div class="vue-demo-tool-snippets">
      <a @click="$code.open($event, 'codepen')" title="在 Codepen 中打开"><c-icon type="feather" name="codepen" class="vue-demo-tools__icon"/></a>
      <a @click="$code.open($event, 'codesandbox')" title="在 CodeSandbox 中打开"><c-icon type="feather" name="edit-3" class="vue-demo-tools__icon"/></a>
      <a @click="$code.copy($event)" title="复制代码"><c-icon type="feather" name="copy" class="vue-demo-tools__icon"/></a>
    </div>
  </div>
</template>

<script>
let uid = 0
export default {
  data () {
    return { checked: false }
  },
  mounted () {
    const qs = s => this.$el.querySelector(s)
    const id = `x-toggle-${uid++}`
    qs('input').id = id
    qs('label').htmlFor = id
  },
  methods: {
    togglePre () {
      const pre = this.$el.nextElementSibling
      if (pre) {
        pre.style.height = this.checked ? `${pre.scrollHeight}px` : 0
      }
    }
  }
}
</script>
