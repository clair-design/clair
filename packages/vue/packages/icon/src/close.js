import { Close, CloseCircle, CloseCircleFill } from '@clair/icons'
import { makeIconComponent } from './utils/icon-wrapper'

export const IconClose = /*@__PURE__*/ makeIconComponent({
  name: 'CIconClose',
  template: Close
})

export const IconCloseCircleStroke = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCloseCircleStroke',
  template: CloseCircle
})

export const IconCloseCircleFill = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCloseCircleFill',
  template: CloseCircleFill
})
