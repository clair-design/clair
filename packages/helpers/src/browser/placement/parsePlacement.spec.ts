import { parsePlacement } from './parsePlacement'
import { Placement } from './types'

const expected: Record<Placement, any> = {
  top: {
    mainDirection: 'top',
    alignment: 'center',
    isVertical: true
  },
  'top-center': {
    mainDirection: 'top',
    alignment: 'center',
    isVertical: true
  },

  'top-start': {
    mainDirection: 'top',
    alignment: 'start',
    isVertical: true
  },
  'top-left': {
    mainDirection: 'top',
    alignment: 'start',
    isVertical: true
  },

  'top-end': {
    mainDirection: 'top',
    alignment: 'end',
    isVertical: true
  },
  'top-right': {
    mainDirection: 'top',
    alignment: 'end',
    isVertical: true
  },

  bottom: {
    mainDirection: 'bottom',
    alignment: 'center',
    isVertical: true
  },
  'bottom-center': {
    mainDirection: 'bottom',
    alignment: 'center',
    isVertical: true
  },

  'bottom-start': {
    mainDirection: 'bottom',
    alignment: 'start',
    isVertical: true
  },
  'bottom-left': {
    mainDirection: 'bottom',
    alignment: 'start',
    isVertical: true
  },

  'bottom-end': {
    mainDirection: 'bottom',
    alignment: 'end',
    isVertical: true
  },
  'bottom-right': {
    mainDirection: 'bottom',
    alignment: 'end',
    isVertical: true
  },

  left: {
    mainDirection: 'left',
    alignment: 'center',
    isVertical: false
  },
  'left-center': {
    mainDirection: 'left',
    alignment: 'center',
    isVertical: false
  },

  'left-start': {
    mainDirection: 'left',
    alignment: 'start',
    isVertical: false
  },
  'left-top': {
    mainDirection: 'left',
    alignment: 'start',
    isVertical: false
  },

  'left-end': {
    mainDirection: 'left',
    alignment: 'end',
    isVertical: false
  },
  'left-bottom': {
    mainDirection: 'left',
    alignment: 'end',
    isVertical: false
  },

  right: {
    mainDirection: 'right',
    alignment: 'center',
    isVertical: false
  },
  'right-center': {
    mainDirection: 'right',
    alignment: 'center',
    isVertical: false
  },

  'right-start': {
    mainDirection: 'right',
    alignment: 'start',
    isVertical: false
  },
  'right-top': {
    mainDirection: 'right',
    alignment: 'start',
    isVertical: false
  },

  'right-end': {
    mainDirection: 'right',
    alignment: 'end',
    isVertical: false
  },
  'right-bottom': {
    mainDirection: 'right',
    alignment: 'end',
    isVertical: false
  }
}

it('should parse placements as expected', () => {
  for (let [key, value] of Object.entries(expected)) {
    expect(parsePlacement(<Placement>key)).toEqual(value)
  }
})
