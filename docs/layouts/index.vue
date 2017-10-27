<template lang="pug">
  #app
    c-header
    .c-row.hero
      .c-col-2
      div
        h1.x-large.text-slim Clair Design
        p 一套包含设计规范、Vue 组件和配套资源的设计系统。
        p
          c-button(href="/principle/introduction" primary)
            c-icon(name="book")
            |  设计原则
          c-button(href="/component/install")
            c-icon(name="cubes")
            |  Vue 组件
    nuxt
    c-footer
</template>
