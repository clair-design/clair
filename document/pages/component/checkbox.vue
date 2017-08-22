<template>
<article class="markdown-body">
<h2>CHECKBOX 多选框</h2>
<div class="vue-demo-block">
<md2vuedemo0></md2vuedemo0>
<input id="vdODcwNjI1" type="checkbox" /><label for="vdODcwNjI1"></label>
<pre v-pre class="lang-html">
<code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.wrapper</span> <span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
</span><span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incr(-1)"</span>&gt;</span>-<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">readonly</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"count"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incr(+1)"</span>&gt;</span>+<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    incr(delta) {
      <span class="hljs-keyword">this</span>.count += delta
    }
  }
}
</span><span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">script</span>&gt;</span></code>
</pre>
</div>

</article >
</template>

<script>
  /* eslint-disable */
  const md2vuedemo0 = (function (module) {
  ;(function(){
    module.exports = {
    data: function data() {
      return {
        count: 0
      }
    },
    methods: {
      incr: function incr(delta) {
        this.count += delta
      }
    }
  }
  })()
  if (module.exports.__esModule) module.exports = module.exports.default
  var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
  if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
  __vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('div',{staticClass:"wrapper"},[_c('button',{on:{"click":function($event){_vm.incr(-1)}}},[_vm._v("-")]),_vm._v(" "),_c('input',{attrs:{"type":"text","readonly":""},domProps:{"value":_vm.count}}),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.incr(+1)}}},[_vm._v("+")])])])}
  __vue__options__.staticRenderFns = []
  __vue__options__._scopeId = "data-v-bba68bf6"
  if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
    hotAPI.install(require("vue"), true)
    if (!hotAPI.compatible) return
    module.hot.accept()
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-bba68bf6", __vue__options__)
    } else {
      hotAPI.reload("data-v-bba68bf6", __vue__options__)
    }
  })()}
    return module.exports;
  })({});

  /* eslint-enable */
  export default {
    components: {
      'md2vuedemo0': md2vuedemo0
    },

    layout: 'component',
    scrollToTop: true

  }
</script>

<style>
.wrapper input[data-v-bba68bf6] {
  width: 50px;
  text-align: center;
}
</style>
