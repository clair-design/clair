<template>
<article class="markdown-body">
<h1>Button 按钮</h1><p>Button 组件提供了不同的按钮风格以及状态、尺寸等选项。</p>
<h2>示例</h2>
<div class="vue-demo-block">
<md2vuedemo0></md2vuedemo0>
<input id="vdNDk1ODkxNjY" type="checkbox" /><label for="vdNDk1ODkxNjY"></label>
<pre v-pre class="lang-html">
<code><span class="hljs-tag">&lt;<span class="hljs-name">c-button</span>&gt;</span>默认按钮<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">c-button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">c-button</span> <span class="hljs-attr">primary</span>&gt;</span>主操作按钮<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">c-button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">c-button</span> <span class="hljs-attr">disabled</span>&gt;</span><span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">c-button</span>&gt;</span></code>
</pre>
</div>
<h2>API</h2><h3>属性</h3><table>
<thead>
<tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>primary</td>
<td>Boolean</td>
<td>false</td>
<td>是否主要操作按钮</td>
</tr>
<tr>
<td>size</td>
<td>String</td>
<td>&#39;normal&#39;</td>
<td>尺寸，可以取 <code>x-small</code> <code>small</code> <code>normal</code> <code>large</code> <code>x-large</code></td>
</tr>
</tbody>
</table>

</article >
</template>

<script>
  /* eslint-disable */
  const md2vuedemo0 = (function (module) {
  ;(function(){
    module.exports = {}
  })()
  if (module.exports.__esModule) module.exports = module.exports.default
  var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
  __vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('c-button',[_vm._v("默认按钮")]),_vm._v(" "),_c('c-button',{attrs:{"primary":""}},[_vm._v("主操作按钮")]),_vm._v(" "),_c('c-button',{attrs:{"disabled":""}})],1)}
  __vue__options__.staticRenderFns = []

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
