/**
 * 单位大小转换为文件字节
 */
export const sizeToByte = (size: string) => {
  const rate = 1024
  const regex = /^(\d+\.*\d*)\s*(\w+)$/gi
  const regExpExec = regex.exec(size)
  if (!regExpExec)
    throw new Error('size must be composed of numbers and units.')
  const [, num, unit]: Array<string> = regExpExec
  const n: number = Number(num)
  const unitLocaleUpperCase = unit.toLocaleUpperCase()

  switch (unitLocaleUpperCase) {
    case 'B':
      return n
    case 'KB':
      return n * rate
    case 'MB':
      return n * rate * rate
    case 'GB':
      return n * rate * rate * rate
    default:
      return 0
  }
}
