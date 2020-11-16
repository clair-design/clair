import { spawn as sp } from 'child_process'

export const spawn = async (...options) => {
  return new Promise((resolve, reject) => {
    const cp = sp(...options)
    cp.on('exit', resolve)
    cp.on('error', reject)
  })
}
