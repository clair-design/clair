import { Stack } from './Stack'
import { lock, unlock, isLocked } from './lock'
import { zIndexManager } from '../zIndexManager'
import { maskZIndexTracker } from './linkDomAndMask'

let mask: HTMLElement | null = null
const stack = /*@__PURE__*/ new Stack<string>()

const createElementIfNeeded = function () {
  mask = mask || document.body.appendChild(document.createElement('div'))
  return mask
}

export const onModalEnter = function (modalDOM: HTMLElement) {
  const mask = createElementIfNeeded()

  if (stack.isEmpty) {
    mask.className = 'c-mask c-mask-active'

    if (isLocked() === false) {
      lock()
    }
  }

  const zIndex = zIndexManager.next()
  stack.push(zIndex)

  mask.style.zIndex = zIndex
  modalDOM.style.zIndex = zIndexManager.next()
  maskZIndexTracker.linkMaskZIndexToModalDOM(modalDOM, zIndex)
}

export const onModalLeave = function (modalDOM: Element) {
  // Between enter and leave, there might be a time gap,
  // during which new modal(s) could enter
  // e.g.
  // - modal#1 enter
  // - modal#2 enter
  // - modal#1 leave
  // When modal#1 leave, if we simply pop out the last item of `stack`,
  // then what we pop is the z-index of mask linked to modal#2, not modal#1.
  // And the `stack.peek` would be the z-index of mask linked to modal#1.
  // This could be problematic the modal#2 is not the only thing become visible
  // during the time gap that is using `zIndexManager`. (Which is a rare case)
  // e.g.
  // - modal#1 enter
  // - item#1 enter
  // - modal#2 enter
  // - modal#1 leave
  // Item#1 would be on top of the mask, which is not idea nor correct.
  // The following codes try to handle such case.
  const zIndex = maskZIndexTracker.retrieveMaskZIndexFromModalDOM(modalDOM)
  if (typeof zIndex === 'string') {
    stack.remove(zIndex)
  } else {
    stack.pop()
  }

  if (mask) {
    // remove mask
    if (stack.isEmpty) {
      mask.className = 'c-mask c-mask-deactive'
    } else {
      // move mask down
      // @ts-ignore
      mask.style.zIndex = stack.peek
    }
  }
}

export const onModalLeaveDone = function () {
  // remove mask if no modal is present
  if (mask && stack.isEmpty) {
    document.body.removeChild(mask)
    mask = null

    if (isLocked() === true) {
      unlock()
    }
  }
}
