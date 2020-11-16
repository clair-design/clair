const zIndexKey = Symbol.for('mask-z-index')
interface ZIndexHash {
  [zIndexKey]: string
}
type ElementWithZIndexHash = Element & ZIndexHash
const linkMaskZIndexToModalDOM = (modalDOM: Element, zIndex: string) => {
  ;(<ElementWithZIndexHash>modalDOM)[zIndexKey] = zIndex
  return modalDOM
}

const retrieveMaskZIndexFromModalDOM = (modalDOM: Element) => {
  return (<ElementWithZIndexHash>modalDOM)?.[zIndexKey]
}

export const maskZIndexTracker = {
  linkMaskZIndexToModalDOM,
  retrieveMaskZIndexFromModalDOM
}
