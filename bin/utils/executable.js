import { Package } from './package'
import { spawn } from './spawn'

async function run(script) {
  const [command, ...rest] = script.split(' ')
  return spawn(command, rest, {
    stdio: 'inherit',
    shell: true
  })
}

export class Executable {
  constructor(pkg) {
    if (!this.checkPackage(pkg)) {
      throw new Error('Argument is not an instance of Package')
    }

    /**
     * @type {Package}
     */
    this.package = pkg
  }

  checkPackage(pkg) {
    return pkg instanceof Package
  }

  get name() {
    return this.package.name
  }

  hasScript(scriptName) {
    return scriptName in this.package.scripts
  }

  normalizeScript(...args) {
    let scriptName = ''
    let argsToBePassed = ''
    if (args.length === 1) {
      const [script, ...restArgs] = args[0].split(' ')
      scriptName = script
      argsToBePassed = restArgs.join(' ')
    } else {
      ;[scriptName, argsToBePassed] = args
    }
    return [scriptName, argsToBePassed]
  }

  generateCommand(command) {
    return `yarn workspace ${this.name} ${command}`
  }

  // run('taskName --flag props')
  // run('taskName', '--flag props')
  async run(...args) {
    const [scriptName, argsToBePassed] = this.normalizeScript(...args)
    if (!this.hasScript(scriptName)) {
      throw new Error(`There is no [${scriptName}] script for ${this.name}`)
    }
    const command = this.generateCommand(`${scriptName} ${argsToBePassed}`)
    return run(command)
  }
}

export const executableBuilder = packageName => {
  const pkg = new Package(packageName)
  return new Executable(pkg)
}
