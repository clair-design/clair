/**
 * 检查值是否为空
 */
export function isEmpty (value) {
  if (value === null || value === void 0) return true
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'boolean') return !value
  if (typeof value === 'number') return value === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
}
