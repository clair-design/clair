<template>
  <div class="error-container">
    <h1 v-if="error.statusCode === 404">404 无法找到请求的内容</h1>
    <h1 v-else>加载内容失败</h1>
    <div>
      <c-button primary @click="back">
        <c-icon name="arrow-left" size="1em" valign="middle" color="#fff"></c-icon>
        返回
      </c-button>
      <c-button href="/">
        <c-icon name="home" size="1em" valign="middle" color="#fff"></c-icon>
        首页
      </c-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
