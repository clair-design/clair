export const POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom'
}

/**
 * get absolute position relative to another element
 */
export function getPosition (el, refEl) {
  const { top, left, width, height } = refEl.getBoundingClientRect()
  const refTop = top + window.pageYOffset
  const refLeft = left + window.pageXOffset

  return {
    width,
    height,
    left: refLeft,
    top: refTop
  }
}

export default { getPosition }
