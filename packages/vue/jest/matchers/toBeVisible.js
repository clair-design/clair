// Simplified implementation.
// SEE https://github.com/testing-library/jest-dom/blob/master/src/to-be-visible.js
const toBeVisible = element => {
  if (!element) {
    return {
      pass: false,
      message: `You need to provide an Element! Got an ${typeof element}`
    }
  }
  const { getComputedStyle } = element.ownerDocument.defaultView
  const getVisibility = el => {
    const { display, opacity, visibility } = getComputedStyle(el)
    const isStyleInvisible =
      display === 'none' || opacity === '0' || visibility === 'hidden'
    const hasHiddenAttr = el.hasAttribute('hidden')

    return !isStyleInvisible && !hasHiddenAttr
  }
  let visible = true
  let el = element
  // recursively bubble up
  while (el) {
    visible = getVisibility(el)
    if (!visible) {
      break
    }
    el = el.parentElement
  }
  return {
    pass: visible,
    message: () => {
      if (!visible) {
        return `Element is invisible!`
      }
      return `Element is visible!`
    }
  }
}

exports.toBeVisible = toBeVisible
