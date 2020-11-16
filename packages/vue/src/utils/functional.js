/**
 * @typedef {import('vue').VNode} VNode
 * @typedef {import('vue').RenderContext} RenderContext
 */

/**
 * @param {RenderContext} context
 * @param {String} slotName
 * @returns {VNode}
 */
export function getContextSlot(context, slotName) {
  const { scopedSlots } = context
  if (scopedSlots[slotName]) {
    return scopedSlots[slotName]()
  }

  return context.slots()[slotName]
}

/**
 *
 * @param {RenderContext} context
 * @param  {...String} slotNames
 * @returns {Array<VNode>}
 */
export function getContextSlots(context, ...slotNames) {
  return slotNames.map(slotName => getContextSlot(context, slotName))
}
