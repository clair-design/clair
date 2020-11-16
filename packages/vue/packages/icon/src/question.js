import { Question, QuestionCircle, QuestionCircleFill } from '@clair/icons'
import { makeIconComponent } from './utils/icon-wrapper'
import { lineAndDotMixins } from './utils/mixins'

export const IconQuestion = /*@__PURE__*/ makeIconComponent({
  name: 'CIconQuestion',
  template: Question,
  mixins: /*@__PURE__*/ [...lineAndDotMixins]
})

export const IconQuestionCircleStroke = /*@__PURE__*/ makeIconComponent({
  name: 'CIconQuestionCircleStroke',
  template: QuestionCircle,
  mixins: /*@__PURE__*/ [...lineAndDotMixins]
})

export const IconQuestionCircleFill = /*@__PURE__*/ makeIconComponent({
  name: 'CIconQuestionCircleFill',
  template: QuestionCircleFill
})
