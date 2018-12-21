import { isEmpty, toString } from './util'

const ruleset = {

  /**
   * 必填(选)验证
   */
  required: function (value) {
    const valid = !isEmpty(value)
    const isCheckable = (Array.isArray(value) || typeof value === 'boolean')
    const errMsg = isCheckable ? '请选择' : '请填写此项'
    const msg = valid ? '' : errMsg
    return { valid, msg }
  },

  /**
   * 最小长度验证
   * @param param {String} 最少输入多少个字
   */
  minlength: function (value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    const valid = toString(value).length >= parseInt(param)
    const msg = valid ? '' : `请最少填写${param}个字`
    return { valid, msg }
  },

  /**
   * 最大长度验证， 主要针对 IE9 下 textarea 的 maxlength 无效的情况
   * @param param {String} 最多输入多少个字
   */
  maxlength: function (value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    const valid = toString(value).length <= parseInt(param)
    const msg = valid ? '' : `最多填写${param}个字`
    return { valid, msg }
  },

  /**
   * 验证输入是否某种指定类型的格式
   * @param param {String} 类型，比如email、tel等
   */
  type: function (value, param) {
    const method = `${param}Type`
    return ruleset[method](value)
  },

  /**
   * 邮箱格式验证
   */
  emailType: function (value) {
    const pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
    const valid = pattern.test(toString(value))
    const msg = valid ? '' : '邮箱格式不正确'
    return { valid, msg }
  },

  /**
   * 手机号码格式
   */
  mobileType: function (value) {
    const pattern = /^1[3|4|5|7|8]\d{9}$/
    const valid = pattern.test(toString(value))
    const msg = valid ? '' : '手机号码格式不正确'
    return { valid, msg }
  },

  /**
   * 固定电话格式
   */
  telType: function (value) {
    const pattern = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})(-[0-9]{1,4})?$/
    const valid = pattern.test(toString(value))
    const msg = valid ? '' : '固定电话号码格式不正确'
    return { valid, msg }
  },

  /**
   * 数字格式
   */
  numberType: function (value) {
    const valid = !isNaN(value)
    const msg = valid ? '' : '请输入数字'
    return { valid, msg }
  },

  /**
   * max格式
   */
  max: function (value, param) {
    let valid = !isNaN(value)
    let msg = valid ? '' : '请输入数字'
    if (!valid) return { valid, msg }
    valid = parseFloat(value) <= parseFloat(param)
    msg = valid ? '' : `输入值最大为${param}`
    return { valid, msg }
  },

  /**
   * min格式
   */
  min: function (value, param) {
    let valid = !isNaN(value)
    let msg = valid ? '' : '请输入数字'
    if (!valid) return { valid, msg }
    valid = parseFloat(value) >= parseFloat(param)
    msg = valid ? '' : `输入值最小为${param}`
    return { valid, msg }
  },
  /**
   * 整数格式
   */
  integerType: function (value, input) {
    const pattern = /^\d*$/
    const valid = pattern.test(toString(value))
    const msg = valid ? '' : '请输入整数'
    return { valid, msg }
  },

  /**
   * URL格式
   */
  urlType: function (value) {
    /* eslint-disable max-len, no-useless-escape */
    const pattern = /^(https?\:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}[\/\?\#]?([\/\?\#][\w|\:|\/|\.|\-|\#|\!|\~|\%|\&|\+|\=|\?|\$]+)?$/i
    const valid = pattern.test(toString(value))
    const msg = valid ? '' : 'URL 格式不正确'
    return { valid, msg }
  },

  /**
   * 自定义正则
   */
  pattern: function (value, param) {
    const valid = param.test(toString(value))
    const msg = valid ? '' : '格式不符合要求'
    return { valid, msg }
  }
}

export default ruleset
