export const getDecimalsCount = number => {
  if (Math.floor(number) === number) return 0
  return number.toString().split('.')[1].length || 0
}

export const updateValueByStep = (event, value1, value2) => {
  if (['ArrowLeft', 'ArrowDown'].includes(event.code)) {
    return value1 - value2
  }

  if (['ArrowRight', 'ArrowUp'].includes(event.code)) {
    return value1 + value2
  }
}

export const getPropertyNameByMode = (horizontalField, verticalField, mode) => {
  return {
    horizontal: horizontalField,
    vertical: verticalField
  }[mode]
}
