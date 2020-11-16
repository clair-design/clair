import { resolve } from 'path'

const root = resolve(__dirname, '../..')
export const env = {
  root,
  packages: resolve(root, 'packages'),
  port: 3001
}
