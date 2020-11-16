import flatten from 'lodash/flatten'
import { Package } from './package'

export class Tree {
  constructor(packageName) {
    this.entry = new Package(packageName)
    // add entry to the graph
    this.graph = [[this.entry], ...this.getDepsArray(this.entry)]
  }

  getDepsArray(pkg = this.entry) {
    let ret = []
    if (pkg.deps.length) {
      ret.push(pkg.deps)
      const depArrayAtSameLevel = flatten(
        pkg.deps.map(dep => {
          return this.getDepsArray(dep)
        })
      )
      if (depArrayAtSameLevel.length) {
        ret.push(depArrayAtSameLevel)
      }
    }
    return ret
  }
}
