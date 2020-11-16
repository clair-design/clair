import { spawn } from '../utils/spawn'
import { ROOT, preBuild } from '../preBuild'

const runBuild = async packageName => {
  const script = `lerna run build --stream --scope ${packageName}`
  return spawn('yarn', script.split(' '), {
    stdio: 'inherit',
    cwd: ROOT,
    shell: true
  })
}

const buildSingle = async packageName => {
  return preBuild(packageName).then(({ entry: entryPackage }) => {
    return runBuild(entryPackage.name)
  })
}

const buildMultiple = async packageNames => {
  return preBuild(packageNames).then(entries => {
    return Promise.all(
      entries.map(({ entry: entryPackage }) => {
        return runBuild(entryPackage.name)
      })
    )
  })
}

export const build = async packageName => {
  if (Array.isArray(packageName)) {
    return buildMultiple(packageName)
  }
  return buildSingle(packageName)
}
