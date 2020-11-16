import { createErrorNS } from './createErrorNS'

describe('createError', () => {
  it('should allow custom namespace', () => {
    const namespace = 'my namespace'
    const { message } = createErrorNS(namespace)('code', 'message')
    expect(message.includes(namespace)).toBe(true)
  })

  it('should throw error if missing error code', () => {
    expect(createErrorNS()).toThrow()
  })

  it('should throw error if missing error message', () => {
    expect(createErrorNS().bind(null, 'code')).toThrow()
  })

  it('should contain error code and message in final error', () => {
    const errorCode = 'code'
    const errorMessage = 'message'
    const error = createErrorNS()(errorCode, errorMessage)
    const { message } = error
    expect(message.includes(errorCode)).toBe(true)
    expect(message.includes(errorMessage)).toBe(true)
  })
})
