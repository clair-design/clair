import { tuple, ElementOf } from './tuple'

it('should', () => {
  const t = tuple(1, 2, 3, 4)
  const one: ElementOf<typeof t> = 1
  expect(t).toEqual([1, 2, 3, 4])
  expect(one).toEqual(1)
})
