import { assembleOptions } from './util'
import { wrapElement } from './dom'

const loadingDirective = {}
const getDefaultOption = (el, binding, vnode) => {
  return {
    target: binding.modifiers.fullscreen ? 'body' : el.tagName.toLowerCase(),
    visible: binding.value
  }
}
loadingDirective.install = Vue => {
  let loadingTargetDom
  Vue.directive('loading', {
    bind: function (el, binding, vnode) {
      const { mount, loadingComponent } = wrapElement(el)
      // todo: figure out why using `Vue.nextTick` and add comment
      mount(resolve =>
        Vue.nextTick(() => {
          const { arg: options = {} } = binding
          loadingComponent.options = assembleOptions(
            { ...getDefaultOption(el, binding, vnode), ...options },
            el
          )
          loadingComponent.$mount()
          loadingTargetDom = loadingComponent.options.targetDom
          if (binding.value) {
            loadingTargetDom.appendChild(loadingComponent.$el)
          }
          resolve()
        })
      )
    },
    update: function (el, binding, vnode) {
      const { mountedAsync, loadingComponent } = wrapElement(el)
      mountedAsync.then(() => {
        const isShowing = binding.value === true
        if (binding.oldValue !== binding.value) {
          const { arg: options = {} } = binding
          loadingComponent.options = assembleOptions(
            { ...getDefaultOption(el, binding, vnode), ...options },
            el
          )
          if (isShowing) {
            loadingComponent.options.targetDom.appendChild(loadingComponent.$el)
          }
        }
      })
    },
    unbind: function (el, binding) {
      const { loadingComponent } = wrapElement(el)
      loadingComponent?.$destroy?.()
    }
  })
}

export default loadingDirective
