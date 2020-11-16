import inquirer from 'inquirer'
import flattenDeep from 'lodash/flattenDeep'
import { spawn } from '../utils/spawn'
import { preBuild, Builder, ROOT } from '../preBuild'

const [packageName = 'vue'] = process.argv.slice(2)

const questions = [
  {
    name: 'preBuild',
    type: 'confirm',
    message: 'Prebuild dependencies?',
    default: false
  }
]

inquirer.prompt(questions).then(answers => {
  const { preBuild: runPreBuild } = answers
  const preBuilderPromise = runPreBuild
    ? preBuild(packageName)
    : Promise.resolve({ builder: new Builder(packageName) })
  preBuilderPromise.then(({ builder }) => {
    const flatGraph = flattenDeep(builder.graph)
    // Reason not using `--include-dependencies` is that
    // `--include-dependencies` await for signals from dependencies.
    // However, in watch mode, such signal will not be triggered.
    // Aka, entry package won't be started
    const startableDeps = flatGraph
      .filter(dep => dep.startable)
      .map(dep => dep.name)
    const scope = startableDeps.map(pkgName => `--scope ${pkgName}`).join(' ')
    const script = `lerna run start --stream --parallel ${scope}`
    return spawn('yarn', script.split(' '), {
      stdio: 'inherit',
      cwd: ROOT,
      shell: true
    })
  })
})
