import * as babel from 'babel__core'
import { NodePath, types } from 'babel__core'
import { ExportDeclaration, ImportDeclaration } from 'babel-types'
import { RewriteExportParameter, RewriteImportPathOption } from './types'
import { ImportRewriteTask, ExportRewriteTask } from './rewrite'
import { getFileName } from './util'

const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx']
const DEFAULT_IMPORT_SPECIFIER = 'ImportDefaultSpecifier'
const NAMED_IMPORT_SPECIFIER = 'ImportSpecifier'
const NAMESPACE_IMPORT_SPECIFIER = 'ImportNamespaceSpecifier'
const DEFAULT_EXPORT_DECL = 'ExportDefaultDeclaration'
const NAMED_EXPORT_DECL = 'ExportNamedDeclaration'
const ALL_EXPORT_DECL = 'ExportAllDeclaration'

export default function rewriteImportPath({ types: t }: typeof babel) {
  return {
    visitor: {
      ExportDeclaration(path: NodePath<ExportDeclaration>, state: any) {
        if (path.node.type === DEFAULT_EXPORT_DECL) {
          return
        }
        const from = path.node.source?.value
        // named export but without `from` keyword
        if (!from) {
          return
        }
        const options: RewriteImportPathOption = state.opts
        const { extensions = DEFAULT_EXTENSIONS, rewriteExport } = options
        const output: RewriteExportParameter = {
          t,
          path,
          from,
          all: [],
          named: [],
          fileName: getFileName(path)
        }

        if (path.node.type === NAMED_EXPORT_DECL) {
          output.named = path.node.specifiers.map(node => {
            return {
              exported: node.exported.name,
              local: node.local?.name
            }
          })
        }
        if (path.node.type === ALL_EXPORT_DECL) {
          output.all.push('*')
        }
        const exportRewriteTask = ExportRewriteTask.of(output, extensions)
        const defaultRewriteExport = exportRewriteTask.execute.bind(
          exportRewriteTask
        )
        const rewriteExportFunction = rewriteExport ?? defaultRewriteExport
        rewriteExportFunction?.(output)
      },
      ImportDeclaration(path: NodePath<ImportDeclaration>, state: any) {
        const { opts } = state
        const options: RewriteImportPathOption = opts
        const { extensions = DEFAULT_EXTENSIONS } = options
        // get file location
        const fileName = getFileName(path)
        if (!fileName) {
          return
        }
        // get module id
        // `import a from 'module'`, the 'module' part
        const from = path.node.source.value
        // collect specifiers
        const nonNamespaceSpecifiers = [
          DEFAULT_IMPORT_SPECIFIER,
          NAMED_IMPORT_SPECIFIER
        ]
        const named = path.node.specifiers
          .filter(node => nonNamespaceSpecifiers.includes(node.type))
          .map(node => {
            const importedName =
              node.type === NAMED_IMPORT_SPECIFIER
                ? node.imported.name
                : 'default'
            return {
              imported: importedName,
              local: node.local?.name
            }
          })
        const namespace = path.node.specifiers
          .filter(node => node.type === NAMESPACE_IMPORT_SPECIFIER)
          .map(node => {
            return {
              local: node.local?.name
            }
          })
        const parameter = {
          fileName,
          named,
          namespace,
          path,
          from,
          t
        }
        const importRewriteTask = ImportRewriteTask.of(parameter, extensions)
        const defaultRewrite = importRewriteTask.execute.bind(importRewriteTask)
        const rewriteFunction = options?.rewriteImport ?? defaultRewrite
        // also pass `defaultRewrite` to user
        rewriteFunction?.({
          fileName,
          named,
          namespace,
          path,
          from,
          t
        })
      }
    }
  }
}
