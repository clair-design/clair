import { Rect } from './types'
import { parsePlacement } from './parsePlacement'
import { calcMainDirectionOffset, calcAlignmentOffset } from './calcOffset'
import { RectCollection } from './nodeCollection'
const parentRect = <Rect>{
  top: 0,
  left: 0,
  width: 0,
  height: 0
}
let rc: RectCollection

it('should calc offsets as expected #01', () => {
  const placement = parsePlacement('top-end')
  const tipRect = <Rect>{
    width: 160,
    height: 50
  }
  const refRect = <Rect>{
    top: 120,
    left: 330,
    width: 200,
    height: 400
  }
  rc = {
    selfRect: tipRect,
    refRect,
    parentRect
  }
  const result = calcMainDirectionOffset({
    placement,
    rectCollection: rc
  })
  expect(result[0]).toBe('top')
  expect(result[1]).toBe(70)

  const result2 = calcAlignmentOffset({
    placement,
    rectCollection: rc
  })
  expect(result2[0]).toBe('left')
  expect(result2[1]).toBe(370)
})

it('should calc offsets as expected #02', () => {
  const placement = parsePlacement('right-start')
  const tipRect = <Rect>{
    width: 160,
    height: 50
  }
  const refRect = <Rect>{
    top: 120,
    left: 330,
    width: 200,
    height: 400
  }
  rc = {
    selfRect: tipRect,
    refRect,
    parentRect
  }
  const result = calcMainDirectionOffset({
    placement,
    rectCollection: rc
  })
  expect(result[0]).toBe('left')
  expect(result[1]).toBe(530)

  const result2 = calcAlignmentOffset({
    placement,
    rectCollection: rc
  })
  expect(result2[0]).toBe('top')
  expect(result2[1]).toBe(120)
})

it('should compensate for positioned parent', () => {
  const placement = parsePlacement('top')
  const positionedParentRect = <Rect>{
    left: 100,
    top: 10
  }

  const selfRect = <Rect>{
    width: 160,
    height: 50
  }
  const refRect = <Rect>{
    top: 120,
    left: 330,
    width: 200,
    height: 400
  }
  rc = {
    selfRect,
    refRect,
    parentRect: positionedParentRect
  }
  const [p, num] = calcMainDirectionOffset({
    placement,
    rectCollection: rc
  })
  expect(p).toBe('top')
  expect(num).toBe(120 - 50 - 10)

  const [secondP, secondNum] = calcAlignmentOffset({
    placement,
    rectCollection: rc
  })
  expect(secondP).toBe('left')
  expect(secondNum).toBe(330 + 200 / 2 - 160 / 2 - 100)
})
