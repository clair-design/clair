/**
 * @desc get Vue props definitions from modifier list
 * @param modifiers {Array}
 * @return {Object}
 * @see https://vuejs.org/v2/guide/components.html#Props
 */
export function toVueProps (modifiers) {
  return modifiers.reduce((props, modifier) => {
    props[modifier] = Boolean
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
export function toClassNames (block, modifiers) {
  return function () {
    return modifiers
      .filter(m => this[m])
      .map(m => `${block}--${m}`)
  }
}

/**
 * return a 6 length random string
 * warning: uniqueness NOT guaranteed
 */
export function randomString () {
  const radix = 36
  const length = 6
  return Math.random().toString(radix).substr(-length)
}
