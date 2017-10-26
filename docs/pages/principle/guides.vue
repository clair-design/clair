<template>
<article class="markdown-body">
<h2>组件设计规范</h2><ul>
<li>单一职责，一个组件只做一件事。</li>
<li>提供反馈。考虑组件在 focus、hover、active 等状态下的变化。</li>
<li>每个组件内部的样式尽可能使用相对单位去定义样式，通过对外部 <code>font-size</code> 的设置达到对组件整体缩放的效果。</li>
<li>考虑组件可能的键盘操作方式。如果是模拟实现系统原生的组件，最好和原生组件交互方式一致。</li>
<li>尽可能遵循 <a href="https://www.w3.org/TR/WCAG20/" target="blank">WCAG 2.0</a>，并提供 <a href="https://www.w3.org/TR/wai-aria-1.1/" target="blank">WAI-ARIA</a> 支持。</li>
<li>弹出类内容（比如下拉菜单、Tips）等要考虑是否会溢出祖先容器造成出现滚动条或被截断等问题。</li>
<li>界面发生变化时，尽可能提供过渡的动画效果。但是不要滥用动画造成使用效率的降低。</li>
<li>使用阴影来体现不同容器之间的层次。</li>
</ul>

</article >
</template>

<script>

  module.exports = {
    components: {

    },

    layout: 'principle',
    scrollTop: true,
    head () {
      return { title: '组件设计规范' }
    }

  }
</script>
