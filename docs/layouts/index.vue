<template lang="pug">
  #main
    c-header
    c-box.main
      .hero.no-gap
        c-box-item(xs="offset-0" sm="offset-3" md="offset-2")
          h1.is-text-xxl.has-weight-light Clair Design
          p 一套包含设计规范、Vue 组件和配套资源的设计系统。
          p
            c-button(href="/principle/introduction" primary icon="book")
              | 设计原则
            c-button(href="/component/install" icon="layers")
              | Vue 组件
      div
        transition(name='fade')
          router-view
      c-footer
</template>
