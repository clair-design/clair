import VueTypes from './vue-types'
import zIndexManager from './zIndexManager'
export { VueTypes }

/**
 * @desc get Vue Constructor inside Vue instances
 * @param vm {VueComponent} Vue instance
 */
export function getVueCtor (vm) {
  // SEE https://github.com/vuejs/vue/blob/dev/src/core/global-api/extend.js#L43
  return vm.constructor.super
}

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
    return modifiers.filter(m => this[m]).map(m => `${block}--${m}`)
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

/**
 * SEE:
 * https://github.com/react-component/util/blob/master/src/getScrollBarSize.js
 */
let cached
export function getScrollBarSize (fresh) {
  if (fresh || typeof cached === 'undefined') {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = 0
    outerStyle.left = 0
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)

    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth
    }

    document.body.removeChild(outer)

    cached = widthContained - widthScroll
  }
  return cached
}

/**
 * Promise defer
 */
export function defer () {
  if (typeof Promise !== 'undefined' && Promise.defer) {
    return Promise.defer()
  }

  const deferred = {}
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

/**
 * DOM `contains`
 */
export function contains (elem, target) {
  return elem && elem.contains ? elem.contains(target) : false
}

/**
 *
 */
export function getPopupStyle (elem, panel) {
  if (!elem || !panel) {
    return 'position: absolute;'
  }
  const clientRect = elem.getBoundingClientRect()
  const windowH = window.innerHeight
  const windowW = window.innerWidth
  const marginTop = 4
  const scrollBarSize = getScrollBarSize()
  const droplistHeight = panel.clientHeight
  const droplistWidth = panel.clientWidth
  const clientHeight = clientRect.height + marginTop
  const defaultTop = clientRect.top + clientHeight + window.pageYOffset

  const clientY = clientRect.y
  const compTop = clientY + window.pageYOffset - droplistHeight - marginTop
  const left =
    droplistWidth + clientRect.left + scrollBarSize + window.pageXOffset > windowW
      ? windowW - droplistWidth - scrollBarSize
      : clientRect.left + window.pageXOffset
  const top =
    droplistHeight + clientHeight + clientY + scrollBarSize > windowH
      ? compTop
      : defaultTop
  const zIndex = zIndexManager.next()

  return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: ${zIndex};
      `
}
