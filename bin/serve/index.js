import { executableBuilder } from '../utils/executable'

const IS_VUE = process.argv.some(arg => arg === 'vue')
const [party = 'uxc'] = process.argv
  .filter(arg => /^--party=/.test(arg))
  .map(party => party.replace(/^--party=/, ''))

const framework = IS_VUE ? 'vue' : 'react'
const executable = executableBuilder('sites')
executable.run(`start dev:${party}-${framework}`).catch(console.error)
