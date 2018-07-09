import objectAssign from 'object-assign'

if (typeof Object.assign !== 'function') {
  Object.assign = objectAssign
}
