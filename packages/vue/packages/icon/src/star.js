import { makeIconComponent } from './utils/icon-wrapper'
import { Star, StarFilled } from '@clair/icons'

export const IconStar = /*@__PURE__*/ makeIconComponent({
  name: 'CIconStar',
  template: Star
})

export const IconStarFilled = /*@__PURE__*/ makeIconComponent({
  name: 'CIconStarFilled',
  template: StarFilled
})
