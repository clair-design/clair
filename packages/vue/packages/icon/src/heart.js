import { makeIconComponent } from './utils/icon-wrapper'
import { Heart } from '@clair/icons'

export const IconHeart = /*@__PURE__*/ makeIconComponent({
  name: 'CIconHeart',
  template: Heart,
  props: {
    filledOnly: true
  },
  style: {
    strokeWidth: 0
  }
})
