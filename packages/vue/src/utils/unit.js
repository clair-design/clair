import { isNumber } from '@clair/helpers'

/**
 * Automatically append an unit literal (`px` by default)
 * if the value is a number.
 *
 * @export
 * @param {String | Number} val value to transform
 * @param {string} [unit='px']  default unit literal
 * @returns CSS Length Value
 */
export function toCSSLengthValue(val, unit = 'px') {
  if (isNumber(val)) {
    return `${val}${unit}`
  }
  return val
}
