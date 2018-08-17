import objectAssign from 'object-assign'

if ('assign' in Object === false) {
  Object.defineProperty(Object, 'assign', {
    value: objectAssign,
    configurable: true,
    enumerable: false,
    writable: true
  })
}
