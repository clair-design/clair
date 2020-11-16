// trick to achieve tree-shake
// mimic immutable by default
export const assign = (...objects) => {
  return Object.assign({}, ...objects)
}
