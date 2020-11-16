import { resolve } from 'path'
import { readdirSync, existsSync } from 'fs'

export const PACKAGE_NAME_MAP = {
  react: '@clair/react',
  vue: '@clair/vue'
}

export const ROOT = resolve(__dirname, '../..')

export const PACKAGE_DIR = resolve(ROOT, 'packages')

export const PACKAGES = readdirSync(PACKAGE_DIR)

export const PACKAGE_JSONS = PACKAGES.map(dir => {
  const absDir = resolve(PACKAGE_DIR, dir)
  const packageJsonPath = resolve(absDir, 'package.json')
  if (existsSync(packageJsonPath)) {
    return require(packageJsonPath)
  }
  return null
}).filter(Boolean)
