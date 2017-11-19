<template lang="pug">
  #app
    c-header
    c-box.hero.no-gap
      c-box-item(xs="offset-0" sm="offset-3" md="offset-2")
        h1.is-text-xxl.is-weight-light Clair Design
        p 一套包含设计规范、Vue 组件和配套资源的设计系统。
        p
          c-button(href="/principle/introduction" primary icon="book")
            | 设计原则
          c-button(href="/component/install" icon="cubes")
            | Vue 组件
    nuxt
    c-footer
</template>
