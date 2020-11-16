import { convertLengthValue, getFixedStyle } from '../src/utils'

describe('[Table utils]', () => {
  it('convertLengthValue can handle multiple length format', () => {
    expect(convertLengthValue(100)).toBe('100px')
    expect(convertLengthValue('100')).toBe('100px')
    expect(convertLengthValue('100px')).toBe('100px')
    expect(convertLengthValue('.1px')).toBe('.1px')
  })

  it('should return correct col style', () => {
    const columns = [
      {
        width: 100
      },
      { width: 200 }
    ]

    expect(getFixedStyle(columns, 1, 'left')).toMatchObject({ left: '100px' })
    expect(getFixedStyle(columns, 1, 'right')).toMatchObject({ right: '0px' })

    const columnsWithString = [
      {
        width: 100
      },
      {
        width: '100px'
      },
      {
        width: '10%'
      }
    ]

    expect(getFixedStyle(columnsWithString, 1, 'left')).toMatchObject({
      left: '100px'
    })
    expect(getFixedStyle(columnsWithString, 2, 'left')).toMatchObject({
      left: 'calc(100px + 100px)'
    })
    expect(getFixedStyle(columnsWithString, 1, 'right')).toMatchObject({
      right: '10%'
    })
  })
})
