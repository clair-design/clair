import { isNil } from './isNil'

it('should return true with null', () => {
  expect(isNil(null)).toBe(true)
})
it('should return true with undefined', () => {
  expect(isNil(undefined)).toBe(true)
})

it('should return false with any other values', () => {
  ;[1, '', Symbol(), {}].forEach(val => {
    expect(isNil(val)).toBe(false)
  })
})
