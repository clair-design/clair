const positioning = require('stylelint-config-rational-order/groups/positioning')
const boxModel = require('stylelint-config-rational-order/groups/boxModel')
const typography = require('stylelint-config-rational-order/groups/typography')
const visual = require('stylelint-config-rational-order/groups/visual')
const animation = require('stylelint-config-rational-order/groups/animation')
const misc = require('stylelint-config-rational-order/groups/misc')

const order = {
  positioning,
  boxModel: boxModel({ border: true }),
  typography,
  visual: visual({ border: true }),
  animation,
  misc
}

module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-prettier'],
  rules: {
    // 2019-05-29
    // 直接使用 stylelint-config-rational-order 会导致 vs code 的 stylelint 插件报错
    // 所以手动使用规则
    'order/properties-order': [
      ...order.positioning,
      ...order.boxModel,
      ...order.typography,
      ...order.visual,
      ...order.animation,
      ...order.misc
    ],
    // https://github.com/bjankord/stylelint-config-sass-guidelines/issues/5
    'order/properties-alphabetical-order': null,
    'function-parentheses-space-inside': null,
    // 全局变量使用 `$--#{word}-#{word}` 格式
    // 局部变量则使用 `$#{word}-#{word}` 格式
    'scss/dollar-variable-pattern': [/^--/, { ignore: 'local' }],
    // 选择器示例 `.c-button__icon--success`
    'selector-class-pattern': [/^[a-z]+-[a-z]+([-_]{2}[a-z]+)*/, {}],
    'declaration-property-value-blacklist': {
      except: {
        border: 'none'
      }
    },
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['supports', 'media']
      }
    ],
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute']
      }
    ]
  }
}
