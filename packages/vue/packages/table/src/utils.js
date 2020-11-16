export function getFixedStyle(columns, index, direction) {
  if (!direction) {
    return {}
  }
  const widthList = columns.map(item => item.width)
  const start = direction === 'right' ? index + 1 : 0
  const end = direction === 'right' ? columns.length : index
  const range = widthList.slice(start, end)
  const isNumber = input => typeof input === 'number'
  const isAllNumber = range.every(isNumber)
  let result
  if (isAllNumber) {
    result = `${range.reduce((acc, width) => acc + width, 0)}px`
  } else if (range.length === 1) {
    ;[result] = range
  } else {
    const widthValueList = range.map(convertLengthValue)
    const calcValue = widthValueList.join(' + ')
    result = `calc(${calcValue})`
  }
  return {
    [direction]: result
  }
}

export function convertLengthValue(value) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  if (/^(?:(?:0|[1-9]\d*)?\.)?\d+$/.test(value)) {
    return `${value}px`
  }
  return value
}

export function generateCellClassName(item, index, $table) {
  const showShadowStrategy = {
    left: {
      'c-table__cell--sticky-left': $table.leftShadowShown
    },
    right: {
      'c-table__cell--sticky-right': $table.rightShadowShown
    }
  }
  return {
    'c-table__cell--sticky': item.fixed,
    ...showShadowStrategy[item.fixed],
    [`c-table__text--${item.align}`]: Boolean(item.align),
    [item.className]: Boolean(item.className)
  }
}

export function getUniqStr(length) {
  return (Date.now() + Math.random().toString(36).substr(2)).slice(0, length)
}
