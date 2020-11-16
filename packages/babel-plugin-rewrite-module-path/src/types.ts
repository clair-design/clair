import * as babel from '@babel/core'
import { NodePath } from '@babel/core'
import { ExportDeclaration, ImportDeclaration } from 'babel-types'

export interface RewriteParameters<
  Declaration = ImportDeclaration | ExportDeclaration
> {
  t: typeof babel.types
  path: Declaration extends ImportDeclaration
    ? NodePath<ImportDeclaration>
    : NodePath<ExportDeclaration>
  from: string
  fileName: string
}

export interface RewriteImportParameters
  extends RewriteParameters<ImportDeclaration> {
  named: {
    imported: string
    local: string
  }[]
  namespace: {
    local: string
  }[]
}

export interface RewriteExportParameter
  extends RewriteParameters<ExportDeclaration> {
  named: {
    exported: string
    local?: string
  }[]
  all: string[]
}

export type RewriteImport = (parameters: RewriteImportParameters) => any
export type RewriteExport = (parameters: RewriteExportParameter) => any
export type Extensions = string[]

export interface RewriteImportPathOption {
  rewriteImport?: RewriteImport
  rewriteExport?: RewriteExport
  extensions?: Extensions
}
