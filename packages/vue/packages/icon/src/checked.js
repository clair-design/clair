import { Checked, CheckedCircle, CheckedCircleFill } from '@clair/icons'
import { makeIconComponent } from './utils/icon-wrapper'

export const IconChecked = /*@__PURE__*/ makeIconComponent({
  name: 'CIconChecked',
  template: Checked
})

export const IconCheckedCircleStroke = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCheckedCircleStroke',
  template: CheckedCircle
})

export const IconCheckedCircleFill = /*@__PURE__*/ makeIconComponent({
  name: 'CIconCheckedCircleFill',
  template: CheckedCircleFill
})
