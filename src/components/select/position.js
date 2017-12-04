/**
 * get absolute position relative to another element
 */
export function getPosition (el, refEl) {
  const refRect = refEl.getBoundingClientRect()
  return {
    top: refRect.top + window.pageYOffset,
    left: refRect.left + window.pageXOffset
  }
}

export default { getPosition }
