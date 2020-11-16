import {
  Exclamation,
  ExclamationCircle,
  ExclamationCircleFill
} from '@clair/icons'
import { makeIconComponent } from './utils/icon-wrapper'
import { lineAndDotMixins } from './utils/mixins'

export const IconExclamation = /*@__PURE__*/ makeIconComponent({
  name: 'CIconExclamation',
  template: Exclamation,
  mixins: /*@__PURE__*/ [...lineAndDotMixins]
})

export const IconExclamationCircleStroke = /*@__PURE__*/ makeIconComponent({
  name: 'CIconInfoCircleStroke',
  template: ExclamationCircle
})

export const IconExclamationCircleFill = /*@__PURE__*/ makeIconComponent({
  name: 'CIconInfoCircleFill',
  template: ExclamationCircleFill
})
