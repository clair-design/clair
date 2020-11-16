import { Placement, Direction } from './types'
import {
  parsePlacement,
  getModifiedDirectionIfChanged,
  getPlacementMarginOffset
} from './parsePlacement'
import { calcOffset } from './calcOffset'
import { displayElement } from './displayElement'
import { NodeCollection } from './nodeCollection'

function getLogicalOffsetParent(self: HTMLElement) {
  // SEE https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  const { recover } = displayElement(self)
  let parent = self.offsetParent ?? document.documentElement
  const isParentBody = parent === document.body
  if (isParentBody) {
    if (getComputedStyle(document.body).position === 'static') {
      parent = document.documentElement
    }
  }
  recover()
  return parent as HTMLElement
}

/**
 * @param reference DOM of tooltip trigger
 * @param self DOM of tooltip
 * @param position position of tooltip
 */
export function calcPopoverPosition(
  reference: HTMLElement,
  self: HTMLElement,
  position: Placement
): {
  top: number
  left: number
  direction: Direction
} {
  const parent = getLogicalOffsetParent(self)
  const nodeCollection = new NodeCollection(self, reference, parent)

  const placement = parsePlacement(position)

  const marginOffset = getPlacementMarginOffset(self, placement.mainDirection)

  const direction = getModifiedDirectionIfChanged({
    direction: placement.mainDirection,
    marginOffset,
    nodeCollection
  })

  placement.mainDirection = direction
  const offset = calcOffset({
    placement,
    rectCollection: nodeCollection
  })

  return {
    top: <number>offset.top,
    left: <number>offset.left,
    direction
  }
}
