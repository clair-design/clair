/**
 * 检查值是否为空
 */
export function isEmpty (value) {
  if (value === null || value === void 0) return true
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'boolean') return !value
  if (typeof value === 'number') return false
  if (typeof value === 'object') return Object.keys(value).length === 0
}

/**
 * 获取变量的字符串值
 */
export function toString (value) {
  return value === void 0 || value === null
    ? ''
    : value.toString().trim()
}

/**
 * 是否 Promise
 */
export function isPromise (p) {
  return typeof p === 'object' && typeof p.then === 'function'
}
