export const LONG_PRESS_INTERVAL = 100
const DEFAULT_DELAY = 300
export const LONG_PRESS_DELAY = DEFAULT_DELAY - LONG_PRESS_INTERVAL

const useLongPress = () => {
  let pressTimer
  let delayTimer
  const start = (binding, e) => {
    if (e.button !== 0) {
      return
    }

    if (pressTimer !== null) {
      clearInterval(pressTimer)
      pressTimer = null
    }

    pressTimer = setInterval(() => {
      // 执行传递给指令的方法
      binding.value(e)
    }, LONG_PRESS_INTERVAL)
  }

  const cancel = () => {
    if (pressTimer !== null) {
      clearInterval(pressTimer)
      pressTimer = null
    }
  }

  // add some delay to distinguish slow click and long press
  const delayedStart = (binding, e) => {
    if (delayTimer) {
      clearTimeout(delayTimer)
    }
    delayTimer = setTimeout(() => {
      start(binding, e)
      delayTimer = null
    }, LONG_PRESS_DELAY)
  }
  const delayedCancel = () => {
    if (delayTimer) {
      clearTimeout(delayTimer)
    }
    cancel()
  }
  return [delayedStart, delayedCancel]
}

export const useDirectives = () => {
  /**
   * @typedef {[HTMLElement, EventListener]} HandlerItem
   */

  /**
   * This directive can be applied to multiple Elements.
   * In that case, each Element may have received not the same,
   * but different listeners.
   * When being unbound, event listeners need to be removed correctly.
   * Therefore, a hash map needs to be set between each Element and listeners
   * in order to achieve that.
   */
  /**
   * @type {{cancel: HandlerItem[], start: HandlerItem[]}}
   */
  const handlers = {
    start: [],
    cancel: []
  }
  const globalCancelEvents = [
    'mouseup',
    'touchend',
    'touchcancel',
    'wheel',
    'scroll'
  ]
  const targetCancelEvents = ['mouseleave']
  const startEvents = ['mousedown', 'touchstart']

  return {
    longpress: {
      bind(el, binding) {
        // bing binding to start
        const [start, cancel] = useLongPress()
        const startWithBinding = start.bind(null, binding)
        startEvents.forEach(event =>
          el.addEventListener(event, startWithBinding)
        )
        globalCancelEvents.forEach(event =>
          document.addEventListener(event, cancel)
        )
        targetCancelEvents.forEach(event => el.addEventListener(event, cancel))
        handlers.start.push([startWithBinding, el])
        handlers.cancel.push([cancel, el])
      },
      unbind(el) {
        const { start, cancel } = handlers
        const isMatched = ([, target]) => target === el
        const filterReduce = (last, listenerElementPair) => {
          const [matched, left] = last
          if (isMatched(listenerElementPair)) {
            matched.push(listenerElementPair)
          } else {
            left.push(listenerElementPair)
          }
          return [matched, left]
        }
        const [matchedStart, leftStart] = start.reduce(filterReduce, [[], []])
        const [matchedCancel, leftCancel] = cancel.reduce(filterReduce, [
          [],
          []
        ])

        startEvents.forEach(event => {
          matchedStart.forEach(([handler]) =>
            el.removeEventListener(event, handler)
          )
        })
        globalCancelEvents.forEach(event => {
          matchedCancel.forEach(([handler]) =>
            document.removeEventListener(event, handler)
          )
        })
        targetCancelEvents.forEach(event => {
          matchedCancel.forEach(([handler]) =>
            el.removeEventListener(event, handler)
          )
        })

        handlers.start = leftStart
        handlers.cancel = leftCancel
      }
    }
  }
}
