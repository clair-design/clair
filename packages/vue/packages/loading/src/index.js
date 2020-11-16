import Vue from 'vue'
import LoadingVue from './loading'
import { assembleOptions } from './util'
const LoadingComponent = /*@__PURE__*/ Vue.extend(LoadingVue)

/**
 *
 * @param {loadingOption} loadingOption
 */
const loading = function (loadingOption = {}) {
  const isThisVueInstance = this instanceof Vue
  const parentOption = {}
  if (isThisVueInstance) {
    parentOption.parent = this
  }
  const loadingInstance = new LoadingComponent(parentOption)
  loadingInstance.options = assembleOptions(
    Object.assign({}, loadingOption, {
      destroyAfterClose: true
    })
  )
  loadingInstance.$mount()
  loadingInstance.options.targetDom.appendChild(loadingInstance.$el)

  return {
    close() {
      loadingInstance.options.visible = false
    }
  }
}

export default loading
