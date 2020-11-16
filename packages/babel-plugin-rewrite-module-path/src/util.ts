import { NodePath } from 'babel__core'
import { ExportDeclaration, ImportDeclaration } from 'babel-types'

export function getFileName(
  path: NodePath<ExportDeclaration> | NodePath<ImportDeclaration>
) {
  const {
    parserOpts: { sourceFileName } = { sourceFileName: '' },
    generatorOpts: { filename } = { filename: '' }
  } = path.hub.file.opts
  return sourceFileName ?? filename
}
