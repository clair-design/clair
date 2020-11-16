export function isNil(arg: any): arg is null | undefined {
  return arg === null || arg === void 0
}
