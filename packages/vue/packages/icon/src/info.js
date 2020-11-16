import { Info, InfoCircle, InfoCircleFill } from '@clair/icons'
import { makeIconComponent } from './utils/icon-wrapper'
import { lineAndDotMixins } from './utils/mixins'

export const IconInfo = /*@__PURE__*/ makeIconComponent({
  name: 'CIconInfo',
  template: Info,
  mixins: /*@__PURE__*/ [...lineAndDotMixins]
})

export const IconInfoCircleStroke = /*@__PURE__*/ makeIconComponent({
  name: 'CIconInfoCircleStroke',
  template: InfoCircle
})

export const IconInfoCircleFill = /*@__PURE__*/ makeIconComponent({
  name: 'CIconInfoCircleFill',
  template: InfoCircleFill
})
