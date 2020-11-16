import { makeIconComponent } from './utils/icon-wrapper'
import { User, UserFill } from '@clair/icons'

export const IconUserFill = /*@__PURE__*/ makeIconComponent({
  name: 'CIconUserFill',
  template: UserFill
})

export const IconUser = /*@__PURE__*/ makeIconComponent({
  name: 'CIconUser',
  template: User
})
