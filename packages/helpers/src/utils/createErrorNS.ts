/**
 * errCode is just the general info about the error
 * [Clair]: Invalid content! Component only accept content in string type
 * `Invalid content!` is the errCode
 */
export const createErrorNS = (namespace: string = 'Clair') => (
  errCode: string,
  errMessage: string
): Error => {
  if (!errCode) {
    throw new Error('Clair error needs to contain an error code')
  }
  if (!errMessage) {
    throw new Error('Clair error needs to contain an error message')
  }
  return new Error(`[${namespace}]: ${errCode} ${errMessage}`)
}
