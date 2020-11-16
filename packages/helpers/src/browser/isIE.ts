// target: IE 6-11
export const isIE = (ua: string): boolean =>
  /MSIE/.test(ua) || /Trident\//.test(ua)
