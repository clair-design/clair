import { isNumber } from './isNumber'

it('should return true when called with real numbers', () => {
  expect(isNumber(12345)).toBe(true)
  expect(isNumber(12345.6789)).toBe(true)
})

it('should return false when called with other values', () => {
  expect(isNumber('12345')).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber({})).toBe(false)
})
