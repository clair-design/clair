import { KEYS } from './const'

export default {
  getDeltaAfterKeydown(code, num) {
    let delta
    if (code === KEYS.LEFT) {
      delta = -1
    } else if (code === KEYS.RIGHT) {
      delta = 1
    } else if (code === KEYS.UP) {
      delta = -num
    } else if (code === KEYS.DOWN) {
      delta = num
    }
    return delta
  },
  getCurrentCellIndex(data) {
    return (data.find(d => d.isCurrent) || {}).index
  }
}
