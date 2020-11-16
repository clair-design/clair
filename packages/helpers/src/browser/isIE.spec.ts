import { isIE } from './isIE'
it('should return true', () => {
  expect(isIE('aaaaaMSIEaaaa')).toBe(true)
  expect(isIE('aaaaTrident/aaaaa')).toBe(true)
})

it('should return false', () => {
  expect(isIE('MSIe')).toBe(false)
  expect(isIE('Trident')).toBe(false)
  expect(isIE('chrome')).toBe(false)
  expect(isIE('firefox')).toBe(false)
})
