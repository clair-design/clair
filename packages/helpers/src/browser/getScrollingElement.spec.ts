import { getScrollingElement } from './getScrollingElement'

it('should return `document.scrollingElement` or `document.body`', () => {
  const el = getScrollingElement()
  if (document.scrollingElement) {
    expect(el).toBe(document.scrollingElement)
  } else {
    expect(el).toBe(document.body)
  }
})
