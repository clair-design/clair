'use strict';

/**
 * @desc get Vue props definitions from modifier list
 * @param modifiers {Array}
 * @return {Object}
 * @see https://vuejs.org/v2/guide/components.html#Props
 */
function toVueProps (modifiers) {
  return modifiers.reduce(function (props, modifier) {
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
    var this$1 = this;

    return modifiers.reduce(function (classNames, modifier) {
      classNames[(block + "--" + modifier)] = this$1[modifier];
      return classNames
    }, {})
  }
}

// import css
var name = 'c-button';
var block = "c-button";
var modifiers = [
  'primary',
  'readonly',
  'disabled'
];
var props = toVueProps(modifiers);
var classNames = toClassNames(block, modifiers);

var Button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"c-button",class:_vm.classNames},[_vm._t("default")],2)},staticRenderFns: [],
  name: name,
  props: props,
  computed: { classNames: classNames }
};

// styles
// importing components
var install = function (Vue, component) {
  Vue.component(component.name, component);
};
var Clair = {
  install: function install$1 (Vue) {
    install(Vue, Button);
  }
};

module.exports = Clair;
