import '../css/main.css'

// polyfill `Object.assign`
// SEE https://www.npmjs.com/package/object-assign
import objectAssign from 'object-assign'
Object.assign = Object.assign || objectAssign
