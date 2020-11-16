import { sizeToByte } from './sizeToByte'

const consoleError = console.error

beforeAll(() => {
  console.error = () => void 0
})

afterAll(() => {
  console.error = consoleError
})

it('should return 1000 when param is 1kb|1KB|1Kb|1kB', () => {
  const input = ['1kb', '1KB', '1Kb', '1kB']

  input.forEach(item => {
    const byte = sizeToByte(item)
    expect(byte).toBe(1024)
  })
})

it('should return 2097152 when param is 2mb|2MB|2Mb|2mB', () => {
  const input = ['2mb', '2MB', '2Mb', '2mB']

  input.forEach(item => {
    const byte = sizeToByte(item)
    expect(byte).toBe(2097152)
  })
})

it('should return 2147483648 when param is 2gb|2GB|2Gb|2gB', () => {
  const input = ['2gb', '2GB', '2Gb', '2gB']

  input.forEach(item => {
    const byte = sizeToByte(item)
    expect(byte).toBe(2147483648)
  })
})

it('should throw error when param is kb', () => {
  expect(() => {
    sizeToByte('kb')
  }).toThrowError()
})

it('should return 1 when param is 1b', () => {
  expect(sizeToByte('1b')).toBe(1)
})
