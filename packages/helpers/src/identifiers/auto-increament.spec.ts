import { AutoIncreasingCounter } from './auto-increament'

it('should return auto increasing result each time `.next` called', () => {
  const counter = new AutoIncreasingCounter()
  expect(counter.next()).toBe(1)
  expect(counter.next()).toBe(2)
})

it('should accept an initial value when instantiating', () => {
  const counter = new AutoIncreasingCounter(2019)
  expect(counter.next()).toBe(2020)
  expect(counter.next()).toBe(2021)
})
