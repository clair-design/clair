<template>
<article class="markdown-body">
<h1>安装和使用</h1><h2>直接使用我们的CDN地址</h2><h2>使用 npm</h2><pre v-pre class="lang-shell">
<code><span class="hljs-meta">$</span><span class="bash"> npm install clair</span></code>
</pre><p>或者</p>
<pre v-pre class="lang-shell">
<code><span class="hljs-meta">$</span><span class="bash"> yarn add clair</span></code>
</pre><p>使用：</p>
<pre v-pre class="lang-javascript">
<code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Clair <span class="hljs-keyword">from</span> <span class="hljs-string">'clair'</span>

Vue.use(Clair)</code>
</pre>
</article >
</template>

<script>

  module.exports = {
    components: {

    },

    layout: 'component',
    scrollTop: true,
    head () {
      return { title: '安装和使用' }
    }

  }
</script>
