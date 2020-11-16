const stack = []
const transitionKey = Symbol()
const bindTransitionVMToElement = (el, vm) => {
  el[transitionKey] = vm
}
const getTransitionVMFromElement = el => el?.[transitionKey]
export const transition = {
  name: 'TestTransition',
  methods: {
    beforeEnter() {
      this.$emit('beforeEnter')
    },
    beforeLeave() {
      this.$emit('beforeLeave')
    },
    beforeAppear() {
      this.$emit('beforeAppear')
    },
    enter() {
      this.$emit('enter')
    },
    leave() {
      this.$emit('leave')
    },
    afterEnter() {
      this.$emit('afterEnter')
    },
    afterLeave() {
      this.$emit('afterLeave')
    },
    afterAppear() {
      this.$emit('afterAppear')
    },
    enterCancelled() {
      this.$emit('enterCancelled')
    },
    leaveCancelled() {
      this.$emit('leaveCancelled')
    },
    appearCancelled() {
      this.$emit('appearCancelled')
    },
    emitEvents(events) {
      events.forEach(event => this.$emit(event))
    },
    show() {
      this.emitEvents(['beforeEnter', 'enter', 'afterEnter'])
    },
    hide() {
      this.emitEvents(['beforeLeave', 'leave', 'afterLeave'])
    }
  },
  created() {
    stack.push(this)
  },
  mounted() {
    bindTransitionVMToElement(this.$el, this)
  },
  beforeDestroy() {
    const index = stack.indexOf(this)
    if (index > -1) {
      stack.splice(index, 1)
    }
  },
  render() {
    return <div>{this.$scopedSlots.default()}</div>
  }
}

// TODO: override v-if
export const registerVShow = Vue => {
  const vShow = (el, binding) => {
    const { value } = binding
    if (value) {
      el.style.display = 'block'
    } else {
      el.style.display = 'none'
    }
    Vue.nextTick(() => {
      const { parentElement } = el
      if (parentElement) {
        const transitionVM = getTransitionVMFromElement(parentElement)
        const action = value ? 'show' : 'hide'
        transitionVM?.[action]?.()
      }
    })
  }
  Vue.directive('show', vShow)
}

// for manually trigger transition event
export const transitionManager = {
  peek(step = -1) {
    return stack[stack.length + step]
  }
}

export const overrideTransition = Vue => {
  Vue.component('transition', transition)
  registerVShow(Vue)
}
