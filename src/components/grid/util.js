/**
 * multiply a quantity (with unit)
 */
export function multiply (quatity, times) {
  const [, num, unit] = /(-?\d+(?:\.\d+)?)(.*)/.exec(quatity) || []
  const timedNum = parseFloat(num) * times
  return `${timedNum}${unit}`
}

export default { multiply }
