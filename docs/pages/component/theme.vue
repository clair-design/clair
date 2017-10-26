<template>
<article class="markdown-body">
<h1>自定义样式</h1><p>您可以使用内置的主题：</p>
<ul>
<li><a href="">default</a></li>
<li><a href="">dark</a></li>
<li><a href="">light</a></li>
<li><a href="">material</a></li>
</ul>
<h2>定制主题</h2><p>定制主题需要在项目中使用 <a href="http://postcss.org/" target="blank">PostCSS</a> 进行构建。 </p>
<h3>1. 修改 CSS 变量</h3><p>在项目的 CSS 目录创建一个 <code>custom.css</code> 文件，根据需要修改以下 CSS 变量：</p>
<pre v-pre class="lang-css">
<code><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attribute">--primary-color</span>: <span class="hljs-number">#2196f3</span>;
  <span class="hljs-attribute">--grid-gap</span>: <span class="hljs-number">1em</span>;
}</code>
</pre><h3>2. 在你的项目中引入 Clair 的样式</h3><pre v-pre class="lang-css">
<code>@<span class="hljs-keyword">import</span> url(<span class="hljs-string">'node_modules/clair/src/css/main.css'</span>)</code>
</pre><h3>3. 配置 PostCSS 插件</h3>
</article >
</template>

<script>

  module.exports = {
    components: {

    },

    layout: 'component',
    scrollTop: true,
    head () {
      return { title: '自定义样式' }
    }

  }
</script>
