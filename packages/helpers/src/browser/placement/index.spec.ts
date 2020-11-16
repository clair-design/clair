import { calcPopoverPosition } from './index'

it('should work as expected', () => {
  // @ts-ignore
  HTMLElement.prototype.getBoundingClientRect = jest.fn(function () {
    // @ts-ignore
    if ((this as HTMLElement).className === 'reference') {
      return {
        width: 600,
        height: 400,
        top: 300,
        left: 500,
        bottom: 0,
        right: 0
      }
    }
    return {
      width: 320,
      height: 50,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  })
  const ref = document.body.appendChild(document.createElement('div'))
  const tip = document.body.appendChild(document.createElement('div'))
  ref.className = 'reference'

  const { top, left } = calcPopoverPosition(ref, tip, 'bottom-end')
  expect(top).toEqual(700)
  expect(left).toEqual(780)
})
