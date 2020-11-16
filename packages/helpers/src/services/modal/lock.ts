import { getScrollBarSize } from '../../browser/scrollbar'

type HTMLBodyStyle = {
  overflow: string | null
  paddingRight: string | null
}

const memo: HTMLBodyStyle = {
  overflow: null,
  paddingRight: null
}

let locked = false

export function lock() {
  const style = document.body.style

  // cache
  memo.overflow = style.overflow
  memo.paddingRight = style.paddingRight

  // take scrollbar size into account,
  // avoid page flashing...
  if (document.documentElement.clientWidth < window.innerWidth) {
    style.paddingRight = `${getScrollBarSize()}px`
  }

  // always make `body` hidden when modal shown
  style.overflow = 'hidden'

  locked = true
}

export function unlock() {
  locked = false
  Object.assign(document.body.style, memo)
}

export function isLocked() {
  return locked
}
