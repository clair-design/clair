// from https://github.com/ymzuiku/mix-color/blob/master/src/index.lib.js
function parseColor(str) {
  const col = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
  if (str.search(/#/) === 0) {
    str = str.replace(/#/, '')
    if (str.length === 3) {
      col.r = parseInt(str[0] + str[0], 16)
      col.g = parseInt(str[1] + str[1], 16)
      col.b = parseInt(str[2] + str[2], 16)
    } else if (str.length === 6) {
      col.r = parseInt(str[0] + str[1], 16)
      col.g = parseInt(str[2] + str[3], 16)
      col.b = parseInt(str[4] + str[5], 16)
    } else {
      col.r = parseInt(str[0] + str[1], 16)
      col.g = parseInt(str[2] + str[3], 16)
      col.b = parseInt(str[4] + str[5], 16)
      col.a = parseInt(str[6] + str[7], 16) / 255
    }
  } else if (str.search(/rgba\(/) === 0) {
    str = str.replace(/rgba\(|\)|\s+/g, '')
    const arr = str.split(',')
    col.r = Number(arr[0])
    col.g = Number(arr[1])
    col.b = Number(arr[2])
    col.a = Number(arr[3])
  } else if (str.search(/rgb\(/) === 0) {
    str = str.replace(/rgb\(|\)|\s+/g, '')
    const arr = str.split(',')
    col.r = Number(arr[0])
    col.g = Number(arr[1])
    col.b = Number(arr[2])
  }
  return col
}

function fixColor(a, b, t) {
  const fix = a + (b - a) * t
  let n = a !== b ? fix : a
  n = n > 255 ? 255 : n
  return Math.floor(n)
}

function fixAlpha(a, b, t) {
  t = 1 - t < 0 ? 0 : 1 - t
  let n
  if (a * b === 1) {
    n = 1
  } else if (a === 0) {
    n = b * t
  } else if (b === 0) {
    n = a * t
  } else if (t === 0) {
    n = a * b
  } else {
    n = a * b * t
  }
  n = n > 1 ? 1 : n
  n = n < 0 ? 0 : n
  return (+n.toFixed(4) * 10000) / 10000
}

export default function mix(from, to, point = 1) {
  const fromCol = parseColor(from)
  const toCol = parseColor(to)
  const r = fixColor(fromCol.r, toCol.r, point)
  const g = fixColor(fromCol.g, toCol.g, point)
  const b = fixColor(fromCol.b, toCol.b, point)
  const a = fixAlpha(fromCol.a, toCol.a, point)
  return toHex(r, g, b, a)
}

function toHex(r, g, b, a) {
  const hex = ((r << 16) + (g << 8) + b).toString(16).toUpperCase()
  const rgb = `000000${hex}`.slice(-6)

  if (a >= 1) {
    return `#${rgb}`
  }

  return `#${`0${a.toString(16)}`.slice(-2)}${rgb}`
}
