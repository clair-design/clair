/**
 * this method is much too simple.
 */
export function isNumber(num: any): num is number {
  return typeof num === 'number'
}
