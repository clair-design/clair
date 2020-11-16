import {
  Extensions,
  RewriteImportParameters,
  RewriteExportParameter,
  RewriteParameters
} from './types'
import { dirname, resolve, basename, extname } from 'path'
import { readdirSync } from 'fs'
const { cwd } = process
const root = cwd()

interface Task {
  parameters: RewriteParameters
  extensions: Extensions
  depsSet: Set<string>
  setExtensions(extensions: Extensions): Task
  execute(): any
  updateFromPath(index: string): any
  getIndexFileName(dir: string, fileName: string): string | undefined
  updateIndexFromDir(from: string, fromFile: string): string
  updateIndexFromFile(from: string, fromFile: string): string
  getIndex(): string | undefined
}

class RewriteTask implements Task {
  public extensions!: Extensions

  constructor(public parameters: RewriteParameters) {}

  setExtensions(extensions: Extensions) {
    this.extensions = extensions
    return this
  }

  get depsSet() {
    const packageJsonLocation = resolve(root, 'package.json')
    const packageJson = require(packageJsonLocation)
    const dependencies = Object.keys(packageJson.dependencies ?? {})
    const devDependencies = Object.keys(packageJson.devDependencies ?? {})
    return new Set([...dependencies, ...devDependencies])
  }

  getIndexFileName = (dir: string, fileName: string) => {
    const indexFiles = readdirSync(dir).filter(file => {
      const bareFileName = basename(file, extname(file))
      return (
        bareFileName === fileName && this.extensions.includes(extname(file))
      )
    })
    let indexFile!: string | undefined
    // extensions order matter
    for (let extension of this.extensions) {
      indexFile = indexFiles.find(file => extname(file) === extension)
      if (indexFile) {
        break
      }
    }
    return indexFile
  }

  updateIndexFromDir(from: string, fromFile: string) {
    return `${from}/${this.getIndexFileName(fromFile, 'index')}`
  }

  updateIndexFromFile(from: string, fromFile: string) {
    const fromDir = dirname(fromFile)
    const fromFileName = basename(fromFile)
    const indexFileName = this.getIndexFileName(fromDir, fromFileName)
    const fromSegments = from.split('/')
    const lastSegment = fromSegments.pop()
    fromSegments.push(indexFileName ?? `${lastSegment}.js`)
    return fromSegments.join('/')
  }

  getIndex() {
    if (this.depsSet.has(this.parameters.from)) {
      return
    }
    const { fileName, from } = this.parameters
    const ext = extname(from)
    if (ext) {
      return
    }
    const fileDir = dirname(fileName)
    // the absolute path from current file
    let fromFile = resolve(fileDir, from)
    let fromFileName = basename(fromFile)
    let index: string | undefined
    try {
      const fromDir = dirname(fromFile)
      const files = readdirSync(fromDir)
      let isDir = files.some(file => file === fromFileName)
      if (isDir) {
        index = this.updateIndexFromDir(from, fromFile)
      } else {
        index = this.updateIndexFromFile(from, fromFile)
      }
    } catch (e) {
      console.log(e)
    }
    return index
  }

  /**
   * @override
   */
  updateFromPath(index: string): any {}

  /**
   * @override
   */
  execute(): any {}
}

export class ImportRewriteTask extends RewriteTask {
  static of(parameters: RewriteImportParameters, extensions: Extensions) {
    return new ImportRewriteTask(parameters).setExtensions(extensions)
  }

  constructor(public parameters: RewriteImportParameters) {
    super(parameters)
  }

  updateFromPath(index: string) {
    const { named, t, path, namespace } = this.parameters
    // filter out default import
    // leave the syntax untouched
    // for importing file other than javascript-like, for instance, css
    const defaultImportSpecifier = []
    const defaultImportIndex = named.findIndex(
      ({ imported }) => imported === 'default'
    )
    if (defaultImportIndex > -1) {
      const defaultImport = named[defaultImportIndex]
      // no longer keep in named import
      named.splice(defaultImportIndex, 1)
      defaultImportSpecifier.push(
        t.importDefaultSpecifier(t.identifier(defaultImport.local))
      )
    }
    path.replaceWith(
      t.importDeclaration(
        [
          ...defaultImportSpecifier,
          ...named.map(({ local, imported }) =>
            t.importSpecifier(t.identifier(local), t.identifier(imported))
          ),
          ...namespace.map(({ local }) =>
            t.importNamespaceSpecifier(t.identifier(local))
          )
        ],
        t.stringLiteral(index)
      )
    )
  }

  execute(): any {
    const index = this.getIndex()
    if (typeof index === 'string') {
      this.updateFromPath(index)
    }
  }
}

export class ExportRewriteTask extends RewriteTask {
  static of(parameters: RewriteExportParameter, extensions: Extensions) {
    return new ExportRewriteTask(parameters).setExtensions(extensions)
  }

  constructor(public parameters: RewriteExportParameter) {
    super(parameters)
  }

  execute(): any {
    const index = this.getIndex()
    if (typeof index === 'string') {
      this.updateFromPath(index)
    }
  }

  updateFromPath(index: string): any {
    const { named, all, path, t } = this.parameters
    if (named.length) {
      return path.replaceWith(
        t.exportNamedDeclaration(
          null,
          named.map(({ exported, local }) => {
            const isNamespace = !local
            if (isNamespace) {
              return t.exportNamespaceSpecifier(t.identifier(exported))
            } else {
              return t.exportSpecifier(
                t.identifier(local!),
                t.identifier(exported)
              )
            }
          }),
          t.stringLiteral(index)
        )
      )
    } else if (all.length) {
      return path.replaceWith(t.exportAllDeclaration(t.stringLiteral(index)))
    }
  }
}
