<template>
  <div class="error-container" id="app">
    <h1>无法找到请求的内容</h1>
    <div>
      <c-button primary @click="$router.back()">
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
