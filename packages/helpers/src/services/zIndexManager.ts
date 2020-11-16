import { AutoIncreasingCounter } from '../identifiers/auto-increament'
import { createError, TYPE_ERROR } from '../utils/internal'

let start: number = 2000
let counter = /*@__PURE__*/ new AutoIncreasingCounter(start)

type Callback = (zIndex?: number) => any
let callbackList: Callback[] = []

export const zIndexManager = {
  next() {
    const result = counter.next()
    callbackList.forEach(callback => callback(result))
    return result.toString()
  },

  resetInitialZIndex(zIndex: number) {
    if (start !== zIndex) {
      start = zIndex
      counter = new AutoIncreasingCounter(start)
    }
  },

  addListener(callback: Callback) {
    if (typeof callback !== 'function') {
      throw createError(
        TYPE_ERROR,
        `Callback needs to be function. Now it is "${typeof callback}"`
      )
    }
    callbackList.push(callback)
    return {
      removeListener() {
        zIndexManager.removeListener(callback)
      }
    }
  },

  removeListener(callback: Callback) {
    const index = callbackList.indexOf(callback)
    if (index > -1) {
      callbackList.splice(index, 1)
    }
  },

  clear() {
    callbackList = []
  }
}
