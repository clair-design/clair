export default {
  methods: {
    fixZero (val, num = 2) {
      return (Array(num).join(0) + val).slice(-num)
    },
    updateMonth (year, month, num, type) {
      month = type === 'plus' ? parseInt(month) + num : parseInt(month) - num
      const maxMonth = 11
      const minMonth = 0
      if (month < minMonth) {
        year -= 1
      } else if (month > maxMonth) {
        year += 1
      }
      month = (month + 12) % 12
      return [
        year,
        month
      ]
    },
    isSelectedMonth (month) {
      return !((this.year === this.minYear && month < this.minMonth) ||
        (this.year === this.maxYear && month > this.maxMonth))
    },
    prevMonth () {
      if (!this.isPreMonthCanSelect) return false
      let month = parseInt(this.month) - 1
      const maxMonth = 11
      const minMonth = 0
      if (month < minMonth) {
        this.$emit('yearchange', this.year - 1)
      }
      month = month < minMonth ? maxMonth : month
      this.$emit('monthchange', month)
    },
    nextMonth () {
      if (!this.isNextMonthCanSelect) return false
      let month = this.month + 1
      const maxMonth = 11
      const minMonth = 0
      if (month > maxMonth) {
        this.$emit('yearchange', this.year + 1)
      }
      month = month > maxMonth ? minMonth : month
      this.$emit('monthchange', month)
    }
  }
}

/**
 * 格式化日期
 * @method format
 * @static
 * @param {Date} d 日期对象
 * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
 * @return {string}  返回format后的字符串
 * @example
 var d=new Date();
 alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
 */
/* eslint-disable no-extend-native */
Date.prototype.format = function (pattern) {
  /* eslint-disable no-param-reassign */
  pattern = pattern || 'yyyy-MM-dd hh:mm:ss'
  const y = this.getFullYear().toString()
  const o = {
    M: this.getMonth() + 1, // month
    d: this.getDate(), // day
    h: this.getHours(), // hour
    m: this.getMinutes(), // minute
    s: this.getSeconds() // second
  }
  pattern = pattern.replace(/(y+)/ig, function (a, b) {
    return y.substr(4 - Math.min(4, b.length))
  })
  /* eslint-disable */
  for (const i in o) {
    pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
      return o[i] < 10 && b.length > 1 ? '0' + o[i] : o[i]
    })
  }
  return pattern
}
