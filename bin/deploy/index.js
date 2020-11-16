import { build } from '../build'
import { executableBuilder } from '../utils/executable'

const IS_VUE = process.argv.some(arg => arg === 'vue')
const [party = 'uxc'] = process.argv
  .filter(arg => /^--party=/.test(arg))
  .map(party => party.replace(/^--party=/, ''))

const framework = IS_VUE ? 'vue' : 'react'
const executable = executableBuilder('sites')
build(framework)
  .then(() =>
    executable
      .run(`start build:${party}-${framework} --deploy`)
      .catch(console.error)
  )
  .catch(console.error)
