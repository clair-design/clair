import { ROOT } from '../utils/const'
import { Builder } from './builder'
import { spawn } from '../utils/spawn'

export { Builder, ROOT }

class BuildCache {
  constructor() {
    this.cache = new Map()
  }

  get(packageName) {
    const result = this.cache.get(packageName)
    if (!result) {
      return Promise.resolve()
    }
    return result
  }

  set(packageName, buildPromise) {
    if (this.cache.has(packageName)) {
      return
    }
    this.cache.set(packageName, buildPromise)
  }

  has(packageName) {
    return this.cache.has(packageName)
  }

  delete(packageName) {
    return this.cache.delete(packageName)
  }
}

// share built package
const cache = new BuildCache()

const preBuildSingle = async packageName => {
  const builder = new Builder(packageName)
  return new Promise((resolve, reject) => {
    try {
      const entry = builder.graph.pop()
      builder
        .asyncSerial(deps => {
          const buildableDeps = deps
            .filter(dep => dep.buildable)
            .map(dep => dep.name)
          const depsBeenBuilt = []
          const depsNeedToBeBuilt = []
          for (let packageName of buildableDeps) {
            if (cache.has(packageName)) {
              depsBeenBuilt.push(packageName)
            } else {
              depsNeedToBeBuilt.push(packageName)
            }
          }
          let buildPromise = Promise.resolve()
          if (depsNeedToBeBuilt.length) {
            const scope = depsNeedToBeBuilt
              .map(pkgName => `--scope ${pkgName}`)
              .join(' ')
            const script = `lerna run build --stream --parallel ${scope}`
            buildPromise = spawn('yarn', script.split(' '), {
              stdio: 'inherit',
              cwd: ROOT,
              shell: true
            })
            // update cache
            depsNeedToBeBuilt.forEach(dep => {
              cache.set(dep, buildPromise)
            })
          }

          return Promise.all(
            [buildPromise].concat(
              depsBeenBuilt.map(packageName => cache.get(packageName))
            )
          )
        })
        .then(() => {
          // recover, not very meaningful
          builder.graph.push(entry)
          resolve({
            entry: entry[0],
            builder
          })
        })
    } catch (e) {
      reject(e)
    }
  })
}

const preBuildMultiple = async packageNames => {
  return Promise.all(
    packageNames.map(packageName => preBuildSingle(packageName))
  )
}

export const preBuild = async packageName => {
  if (Array.isArray(packageName)) {
    return preBuildMultiple(packageName)
  }
  return preBuildSingle(packageName)
}
