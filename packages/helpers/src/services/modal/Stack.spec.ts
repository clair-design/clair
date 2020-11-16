import { Stack } from './Stack'

describe('Stack', () => {
  it('should return the real size with `size` property', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.size).toBe(3)
  })

  it('should return the last item with `peek`', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    expect(stack.peek).toBe(2)
  })

  it('should remove item properly', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    stack.remove(1)
    expect(stack.size).toBe(1)
    expect(stack.peek).toBe(2)
    stack.remove(3)
    expect(stack.size).toBe(1)
    expect(stack.peek).toBe(2)
  })

  it('should return the correct emptiness with `isEmpty`', () => {
    const stack = new Stack<number>()
    expect(stack.isEmpty).toBe(true)
    stack.push(1)
    expect(stack.isEmpty).toBe(false)
  })
})
