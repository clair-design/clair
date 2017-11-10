import '../css/main.css'
import responsive from './responsive.js'

// polyfill `Object.assign`
// SEE https://www.npmjs.com/package/object-assign
import objectAssign from 'object-assign'
Object.assign = objectAssign

/**
 * install function when Clair is used
 * NOTE: components is registered automatically, DON'T register them here
 */
export default {
  install (Vue) {
    // responsive utility
    if (!('$media' in Vue.prototype)) {
      Object.defineProperty(Vue.prototype, '$media', {
        get () { return responsive(Vue) }
      })
    }
  }
}
