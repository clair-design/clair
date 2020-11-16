import { CSSPosition } from './types'
import { ParsedPlacement } from './parsePlacement'
import { RectCollection } from './nodeCollection'

type OffsetResult = ['left' | 'top', number]

type OffsetParameter = {
  placement: ParsedPlacement
  rectCollection: RectCollection
}

export function calcMainDirectionOffset({
  placement,
  rectCollection
}: OffsetParameter): OffsetResult {
  const { selfRect, refRect, parentRect } = rectCollection
  const { mainDirection, isVertical } = placement
  const p = isVertical ? 'top' : 'left'
  const d = isVertical ? 'height' : 'width'
  let offset = 0

  switch (mainDirection) {
    case 'top':
    case 'left':
      offset = refRect[p] - selfRect[d] - parentRect[p]
      break
    case 'bottom':
    case 'right':
      offset = refRect[p] + refRect[d] - parentRect[p]
      break
  }

  return [p, offset]
}

export function calcAlignmentOffset({
  placement,
  rectCollection
}: OffsetParameter): OffsetResult {
  const { selfRect, refRect, parentRect } = rectCollection
  const { alignment, isVertical } = placement
  const p = isVertical ? 'left' : 'top'
  const d = isVertical ? 'width' : 'height'
  let offset = 0

  switch (alignment) {
    case 'start':
      offset = refRect[p] - parentRect[p]
      break
    case 'center':
      offset = refRect[p] + refRect[d] / 2 - selfRect[d] / 2 - parentRect[p]
      break
    case 'end':
      offset = refRect[p] - parentRect[p] + refRect[d] - selfRect[d]
      break
  }

  return [p, offset]
}

// TODO: append 到div & div自身有滚动且div设置了position的case 计算需要考虑scroll
export function calcOffset({
  placement,
  rectCollection
}: OffsetParameter): CSSPosition {
  const [p1, v1] = calcMainDirectionOffset({
    placement,
    rectCollection
  })
  const [p2, v2] = calcAlignmentOffset({
    placement,
    rectCollection
  })

  return {
    [p1]: v1,
    [p2]: v2
  }
}
