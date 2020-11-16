import { CaretUp, CaretRight, CaretDown, CaretLeft } from '@clair/icons'
import { makeIconComponent } from './utils/icon-wrapper'

export const IconCaretUp = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCaretUp',
  template: CaretUp,
  class: {
    'c-icon--svg-fill': true
  }
})

export const IconCaretRight = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCaretRight',
  template: CaretRight,
  class: {
    'c-icon--svg-fill': true
  }
})

export const IconCaretDown = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCaretDown',
  template: CaretDown,
  class: {
    'c-icon--svg-fill': true
  }
})

export const IconCaretLeft = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCaretLeft',
  template: CaretLeft,
  class: {
    'c-icon--svg-fill': true
  }
})
