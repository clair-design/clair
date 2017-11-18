import '../css/main.css'
import responsiveFun from './responsive.js'

// polyfill `Object.assign`
// SEE https://www.npmjs.com/package/object-assign
import objectAssign from 'object-assign'
Object.assign = objectAssign

/**
 * install function when Clair is used
 * NOTE: components are registered automatically, DON'T register them here
 */
export default {
  install (Vue) {
    if (!('$clair' in Vue.prototype)) {
      const responsive = responsiveFun(Vue)
      const $clair = new Vue({
        data: { responsive }
      })
      Object.defineProperty(Vue.prototype, '$clair', {
        get () { return $clair }
      })
    }
  }
}
