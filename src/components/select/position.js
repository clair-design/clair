/**
 * get absolute position relative to another element
 */
export const POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom'
}
export function getPosition (el, refEl, pos = POSITION.TOP) {
  const refRect = refEl.getBoundingClientRect()
  const refTop = refRect.top + window.pageYOffset
  const refLeft = refRect.left + window.pageXOffset
  const left = refLeft
  const top = pos === POSITION.TOP ? refTop : refTop + refEl.clientHeight
  return { left, top }
}

export default { getPosition }
