import Vue from 'vue'
const map = new Map()
const symbol = Symbol.for('create-portal')
const serverDetector = /*@__PURE__*/ new Vue()

export const createPortal = (render, containerComponent, target) => {
  // `this` in render seems to be proxied
  // not the same as `this` in destroyed hook
  if (!containerComponent[symbol]) {
    containerComponent[symbol] = Symbol('portal-key')
  }
  const key = containerComponent[symbol]
  if (map.has(key)) {
    const vm = map.get(key)
    // target may change
    // then move vm.$el
    if (target && vm.$el.parentElement !== target) {
      target.appendChild(vm.$el)
    }
    vm.$forceUpdate()
    return null
  } else if (serverDetector.$isServer) {
    return null
  }
  const parent = target || document.body
  const vm = new Vue({
    name: 'CPortalFn',
    parent: containerComponent,
    data() {
      return {
        isRoot: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (!containerComponent.$el?.nodeType !== Node.ELEMENT_NODE) {
          this.isRoot = true
          this.invokeLifecycleHook('mounted')
        }
      })
    },
    beforeDestroy() {
      this.invokeLifecycleHook('beforeDestroy')
    },
    destroyed() {
      this.$el?.parentElement?.removeChild(this.$el)
      this.invokeLifecycleHook('destroyed')
    },
    methods: {
      invokeLifecycleHook(lifecycleName) {
        if (!this.isRoot) return
        containerComponent[lifecycleName]?.()
      }
    },
    render
  }).$mount()
  const dom = vm.$el
  parent.appendChild(dom)
  map.set(key, vm)
  return null
}

export const destroyPortal = containerComponent => {
  const key = containerComponent[symbol]
  if (!map.has(key)) return
  const vm = map.get(key)
  vm.$destroy()
  map.delete(key)
}
