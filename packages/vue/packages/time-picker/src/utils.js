export const Digit = 2
export const HOURS_PER_DAY = 24
export const MINUTES_PER_HOUR = 60
export const SECONDS_PER_MINUTE = 60
export const MAX_TIME_NUMBER =
  HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE +
  MINUTES_PER_HOUR * SECONDS_PER_MINUTE +
  SECONDS_PER_MINUTE

export function splitTo2Character(value) {
  return `0${value}`.slice(-Digit)
}

export function hasTimeWithFormat(format) {
  return {
    hasHour: format.toLowerCase().includes('h'),
    hasMinute: format.toLowerCase().includes('m'),
    hasSecond: format.toLowerCase().includes('s')
  }
}

export function checkFormat(value, format) {
  const reg = new RegExp(
    `^${format
      .split(':')
      .map(item => '\\d{2}')
      .join(':')}$`
  )
  return reg.test(value)
}

export function getTimeNum(value, format) {
  let [hour, minute, second] = getSplitTime(value, format)
  hour = hour ? hour * MINUTES_PER_HOUR * SECONDS_PER_MINUTE : 0
  minute = minute ? minute * SECONDS_PER_MINUTE : 0
  second = second ? second : 0
  return hour + minute + second
}

export function checkInTimeRange({ value, minTime, maxTime, format }) {
  /**
   * 通过时间乘积进行计算对比
   * hour*60*60 + minute*60 + second
   */
  const currentTimeNum = getTimeNum(value, format)
  const minTimeNum = minTime ? getTimeNum(minTime, format) : 0
  const maxTimeNum = maxTime ? getTimeNum(maxTime, format) : MAX_TIME_NUMBER
  return currentTimeNum >= minTimeNum && currentTimeNum <= maxTimeNum
}

export function checkTime({ value, format, minTime, maxTime }) {
  const { hasHour, hasMinute, hasSecond } = hasTimeWithFormat(format)
  if (!checkFormat(value, format)) return { valid: false }
  const timeLimitValid = checkInTimeRange({ value, minTime, maxTime, format })
  const [hour, minute, second] = getSplitTime(value, format)
  const isHourValid = (0 <= hour && hour < HOURS_PER_DAY) || !hasHour
  const isMinuteValid = (0 <= minute && minute < MINUTES_PER_HOUR) || !hasMinute
  const isSecondValid =
    (0 <= second && second < SECONDS_PER_MINUTE) || !hasSecond
  return {
    valid: isHourValid && isMinuteValid && isSecondValid && timeLimitValid,
    hour,
    minute,
    second
  }
}

export function getSplitTime(value, format) {
  const { hasHour, hasMinute, hasSecond } = hasTimeWithFormat(format)
  const timeArr = value
    ? value.split(':').map(item => parseInt(item))
    : ['', '', '']
  let hour = '',
    minute = '',
    second = ''
  switch (timeArr.length) {
    case 3:
      ;[hour, minute, second] = timeArr
      break
    case 2:
      if (hasHour) {
        ;[hour] = timeArr
        minute = hasMinute ? timeArr[1] : ''
      } else {
        minute = hasMinute ? timeArr[0] : ''
      }
      second = hasSecond ? timeArr[1] : ''
      break
    default:
      hour = hasHour ? timeArr[0] : ''
      minute = hasMinute ? timeArr[0] : ''
      second = hasSecond ? timeArr[0] : ''
      break
  }
  return [hour, minute, second]
}

export function createArr(N, step = 1) {
  const length = N / step
  return Array.from(new Array(length), (val, index) =>
    splitTo2Character(index * step)
  )
}
