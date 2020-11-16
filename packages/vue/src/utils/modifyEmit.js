import Vue from 'vue'

const DEFAULT_OPTION = {
  name: 'emit',
  handler(args) {
    return args.map(arg => arg.target?.value ?? arg)
  }
}

export const registerEmitDirective = (option = {}) => {
  const { name, handler } = Object.assign({}, DEFAULT_OPTION, option)
  const hook = (el, binding, vnode) => {
    const { value } = binding
    const formatter = typeof value === 'function' ? value : handler
    const component = vnode.componentInstance
    if (!component) {
      return
    }
    const oldEmit = Vue.prototype.$emit
    component.$emit = function emit(type, ...args) {
      const args2Pass = formatter(args)
      oldEmit.apply(component, [type, ...args2Pass])
    }
  }
  Vue.directive(name, {
    bind: hook,
    update: hook,
    componentUpdated: hook
  })
}
