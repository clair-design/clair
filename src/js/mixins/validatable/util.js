/**
 * 获取变量的字符串值
 */
export function toString (value) {
  return value === void 0 || value === null
    ? ''
    : value.toString().trim()
}
