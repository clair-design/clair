import ruleset from './ruleset'
import { isEmpty, isPromise } from './util'

export default { validate }

/**
 * 验证 value 是否符合规则
 * @param value {String} 要验证的值
 * @param rules {Object} 规则
 * @return {Object} 结果对象，有valid和msg两个字段
 */
function validate (value, rules = {}) {
  // msg 为自定义错误信息
  const { msg } = rules
  const pass = { valid: true }
  const isValueEmpty = isEmpty(value)

  // 非必填项且没有填写时，不进行校验
  if (!rules.required && isValueEmpty) return pass

  const results = Object.keys(rules)
    .filter(ruleName => canValidate(ruleName, rules[ruleName]))
    .map(ruleName => checkSingleRule(ruleName, rules[ruleName], value, msg))

  const hasAsync = results.some(isPromise)
  const getResult = results => {
    const failedResult = results.find(result => !result.valid)
    return failedResult || pass
  }

  if (hasAsync) return Promise.all(results).then(getResult)
  return getResult(results)
}

/**
 * 验证单条规则
 */
function checkSingleRule (ruleName, param, value, msg) {
  const validFunction = typeof param === 'function' ? param : ruleset[ruleName]
  const result = validFunction(value, param)
  if (!result.valid && msg) { // 验证不通过且有自定义消息
    if (typeof msg === 'string') { // 自定义消息为字符串时直接使用
      result.msg = msg
    } else if (msg[ruleName]) { // 自定义消息为对象时，取出该类错误的消息
      result.msg = msg[ruleName]
    }
  }
  return result
}

/**
 * 给出的规则是否可验证
 * 条件：
 * 1. 非保留字，'msg' 用来指定自定义提示
 * 2. 内置或自定义规则
 */
function canValidate (ruleName, param) {
  const isReservedWord = ruleName === 'msg'
  const isBuiltinRule = typeof ruleset[ruleName] === 'function'
  const isCustomRule = typeof param === 'function'
  return !isReservedWord && (isBuiltinRule || isCustomRule)
}
