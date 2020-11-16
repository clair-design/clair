import { Tree } from '../utils/tree'
import { AsyncMap } from '../utils/asyncMap'

export class Builder {
  constructor(packageName) {
    this.tree = new Tree(packageName)
    // low level deps first
    this.graph = this.reverseGraph().filter(deps => deps.length > 0)
  }

  reverseGraph() {
    return this.tree.graph.slice().reverse()
  }

  serial(callback) {
    this.graph.forEach(callback)
  }

  async asyncSerial(callback) {
    return AsyncMap.of(callback).map(this.graph)
  }

  execute(callback) {
    callback(this.graph)
  }
}
