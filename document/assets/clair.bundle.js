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

// import css
const name = 'c-button';
const block = `c-button`;
const modifiers = [
  'primary',
  'readonly',
  'disabled'
];
const props = toVueProps(modifiers);
const classNames = toClassNames(block, modifiers);

var Button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"c-button",class:_vm.classNames},[_vm._t("default")],2)},staticRenderFns: [],
  name,
  props,
  computed: { classNames }
};

// styles
// importing components
// __import_next_compoent__(DO NOT remove this line)

const components = [
  Button
  // __import_next_compoent__(DO NOT remove this line)
];

const Clair = {
  install (Vue) {
    components.forEach(Component => {
      Vue.component(Component.name, Component);
    });
  }
};

export default Clair;