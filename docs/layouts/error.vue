<template>
  <div class="error-container">
    <h1 v-if="error.statusCode === 404">404 无法找到请求的内容</h1>
    <h1 v-else>加载内容失败</h1>
    <c-button href="/principle/introduction" primary>
      <c-icon type="home"></c-icon>
      返回首页
    </c-button>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
