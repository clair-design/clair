(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Clair = factory());
}(this, (function () { 'use strict';

/**
 * @desc get Vue props definitions from modifier list
 * @param modifiers {Array}
 * @return {Object}
 * @see https://vuejs.org/v2/guide/components.html#Props
 */
function toVueProps (modifiers) {
  return modifiers.reduce((props, modifier) => {
    props[modifier] = Boolean;
    return props
  }, {})
}

/**
 * @desc get Vue class binding from `block` and `modifiers`
 * @param block {String} `block` part of BEM, eg. `.c-button`
 * @param modifiers {Array} list of `modifier`
 * @return {Object} Vue class binding object, see
 * @see https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax
 * @see https://en.bem.info/methodology/
 */
function toClassNames (block, modifiers) {
  return function () {
    return modifiers.reduce((classNames, modifier) => {
      classNames[`${block}--${modifier}`] = this[modifier];
      return classNames
    }, {})
  }
}

const name = 'button';
const block = `.c-${name}`;
const modifiers = [
  'primary',
  'readonly',
  'disabled'
];
const props = toVueProps(modifiers);
const classNames = toClassNames(block, modifiers);

var Button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:".c-button",class:_vm.className},[_vm._t("default")],2)},staticRenderFns: [],
  name,
  props,
  computed: { classNames }
};

// styles
// components
const Clair = {
  install (Vue) {
    Vue.component(Button.name, Button);
  }
};

return Clair;

})));
