(function () {
'use strict';

var Index = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero"},[_c('div',{staticClass:"content-wrap"},[_c('h1',{staticClass:"x-large"},[_vm._v("Clair Design")]),_c('p',[_vm._v("一套包含设计规范、Vue 组件和配套资源的设计系统。")])])])}],
};

const { Vue, VueRouter } = window;
const navs = [
  { title: '首页', link: '/' },
  { title: '设计原则', link: '/principle' },
  { title: '组件', link: '/component' },
  { title: '资源', link: '/resource' }
];
const routes = [
  {
    path: '/',
    component: Index
  }
];
const router = new VueRouter({ routes });
const data = { navs };

new Vue({ data, router }).$mount('#app');

}());
