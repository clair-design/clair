import { Alignment, Direction, Placement } from './types'
import { NodeCollectionType } from './nodeCollection'

export interface ParsedPlacement {
  mainDirection: Direction
  alignment: Alignment
  isVertical: boolean
}

export function parsePlacement(p: Placement): ParsedPlacement {
  let [mainDirection, align = 'center'] = p.split('-')
  const isVertical = mainDirection === 'top' || mainDirection === 'bottom'
  const alignment = normalizeAlignment(align, isVertical)

  return {
    mainDirection: <Direction>mainDirection,
    alignment,
    isVertical
  }
}

function normalizeAlignment(align: string, vertical: boolean): Alignment {
  if (vertical) {
    switch (align) {
      case 'left':
        return 'start'
      case 'right':
        return 'end'
      default:
        return <Alignment>align
    }
  }

  switch (align) {
    case 'top':
      return 'start'
    case 'bottom':
      return 'end'
    default:
      return <Alignment>align
  }
}

interface PlacementHorizontal {
  isLeftSpaceEnough: boolean
  isRightSpaceEnough: boolean
}
interface PlacementVertical {
  isBottomSpaceEnough: boolean
  isTopSpaceEnough: boolean
}
const placementStrategy = {
  top({ isTopSpaceEnough, isBottomSpaceEnough }: PlacementVertical) {
    return !isTopSpaceEnough && isBottomSpaceEnough ? 'bottom' : 'top'
  },
  bottom({ isTopSpaceEnough, isBottomSpaceEnough }: PlacementVertical) {
    return isTopSpaceEnough && !isBottomSpaceEnough ? 'top' : 'bottom'
  },
  left({ isLeftSpaceEnough, isRightSpaceEnough }: PlacementHorizontal) {
    return !isLeftSpaceEnough && isRightSpaceEnough ? 'right' : 'left'
  },
  right({ isLeftSpaceEnough, isRightSpaceEnough }: PlacementHorizontal) {
    return isLeftSpaceEnough && !isRightSpaceEnough ? 'left' : 'right'
  }
}
interface ModifiedDirectionParams {
  direction: Direction
  marginOffset: number
  nodeCollection: NodeCollectionType
}
export function getModifiedDirectionIfChanged({
  direction,
  marginOffset,
  nodeCollection
}: ModifiedDirectionParams): Direction {
  const { clientHeight, clientWidth } = document.documentElement
  const { parent, selfRect, refRect, parentRect } = nodeCollection

  // 计算offsetParent与可视窗口相交部分的宽高
  const parentHeightInView =
    parentRect.top >= 0
      ? Math.min(clientHeight - parentRect.top, parentRect.height)
      : Math.min(clientHeight, parentRect.height + parentRect.top)

  const parentWidthInView =
    parentRect.left >= 0
      ? Math.min(clientWidth - parentRect.left, parentRect.width)
      : Math.min(clientWidth, parentRect.width + parentRect.left)

  // self的offsetParent为body或documentElement
  const isSelfParentBody =
    parent === document.documentElement || parent === document.body

  // ref 距离顶部的值
  const delta = isSelfParentBody ? 0 : 1
  const offsetTop = refRect.top - parentRect.top * delta
  const offsetLeft = refRect.left - parentRect.left * delta
  const refOffsetTop = Math.min(offsetTop, refRect.top)
  const refOffsetLeft = Math.min(offsetLeft, refRect.left)

  const isBottomSpaceEnough =
    refOffsetTop + refRect.height + marginOffset + selfRect.height <
    parentHeightInView
  const isTopSpaceEnough = marginOffset + selfRect.height < refOffsetTop
  const isLeftSpaceEnough = marginOffset + selfRect.width < refOffsetLeft
  const isRightSpaceEnough =
    refOffsetLeft + refRect.width + marginOffset + selfRect.width <
    parentWidthInView

  return placementStrategy[direction]({
    isBottomSpaceEnough,
    isTopSpaceEnough,
    isLeftSpaceEnough,
    isRightSpaceEnough
  })
}

export function getPlacementMarginOffset(
  element: Element,
  direction: Direction
) {
  let dir = 'top'
  if (direction === 'left' || direction === 'right') {
    dir = 'left'
  }
  return Math.abs(
    parseInt(getComputedStyle(element).getPropertyValue(`margin-${dir}`))
  )
}
