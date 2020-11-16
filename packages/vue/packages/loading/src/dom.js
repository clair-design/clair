import Vue from 'vue'
import LoadingVue from './loading'
const LoadingComponent = /*@__PURE__*/ Vue.extend(LoadingVue)

// keys used to save data on Element
const elementKeyMap = {
  loadingComponent: Symbol.for('loadingComponent'),
  promise: Symbol.for('promise'),
  mounted: Symbol.for('mounted'),
  resolve: Symbol.for('resolve')
}

class ElementState {
  constructor(el) {
    this.el = el
    // could use `Object.defineProperty`, but the readability and
    // code auto complement/jump would suffer
  }

  set loadingComponent(value) {
    this.el[elementKeyMap.loadingComponent] = value
  }

  get loadingComponent() {
    return this.el[elementKeyMap.loadingComponent]
  }

  set promise(value) {
    this.el[elementKeyMap.promise] = value
  }

  get promise() {
    return this.el[elementKeyMap.promise]
  }

  set mounted(value) {
    this.el[elementKeyMap.mounted] = value
  }

  get mounted() {
    return this.el[elementKeyMap.mounted]
  }

  set resolve(value) {
    this.el[elementKeyMap.resolve] = value
  }

  get resolve() {
    return this.el[elementKeyMap.resolve]
  }
}

export const wrapElement = el => {
  const state = new ElementState(el)

  // singleton
  if (!state.loadingComponent) {
    state.loadingComponent = new Vue(LoadingComponent)
  }
  if (!state.promise) {
    state.promise = new Promise(resolve => {
      state.resolve = resolve
    })
  }
  return {
    value: el,
    loadingComponent: state.loadingComponent,
    mount(callback) {
      // support async callback by default
      if (state.mounted) {
        return
      }
      state.mounted = true
      Promise.resolve(callback(state.resolve)).then(state.resolve)
    },
    get mountedAsync() {
      return state.promise
    }
  }
}
