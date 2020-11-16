import { getScrollBarSize } from './scrollbar'

it('should return a number indicating the window scrollbar width', () => {
  expect(typeof getScrollBarSize()).toBe('number')
})
