<template>
<article class="markdown-body">
<h2>核心理念</h2><p>Clair 的核心设计理念包含「清晰明了」、「高效」和「无障碍」三个方面。</p>
<h3>清晰明了</h3><ul>
<li>提供清晰明了的设计，让用户明白当前有哪些可以进行的操作，以及这些操作带来的结果。</li>
<li>当用户操作时，提供必要的反馈。</li>
<li>使用恰当的动画揭示当前界面上发生的变化，避免界面突兀的改变。</li>
</ul>
<h3>高效</h3><ul>
<li>快速反馈。当用户操作后，要及时给出反馈。当执行超过 <code>500ms</code> 的操作时，给出等待状态。</li>
<li>避免过度使用动画而影响效率。一般情况下，过渡性动画不要超过<code>300ms</code>。</li>
<li>支持键盘操作。符合用户习惯的键盘操作往往比鼠标操作更高效。</li>
</ul>
<h3>无障碍</h3><ul>
<li>尽量遵循 <a href="https://www.w3.org/TR/WCAG20/" target="blank">WCAG 2.0</a> 要求。</li>
<li>使用 <a href="https://www.w3.org/TR/wai-aria-1.1/" target="blank">WAI-ARIA</a> 增强应用的无障碍性。</li>
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
      return { title: '核心理念' }
    }

  }
</script>
