const { default: traverse } = require('@babel/traverse')
const { parse } = require('@babel/parser')
const globby = require('globby')
const { resolve, relative, dirname, normalize } = require('path')
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs')

const iconsDir = resolve(__dirname, '../packages/icon')
const iconSourceDir = resolve(__dirname, '../../icons/icons')
const newIconsDir = resolve(__dirname, '../packages/icon/src')
const iconWrapperLocation = resolve(
  __dirname,
  '../packages/icon/src/icon-wrapper.js'
)
const relativePathToIconWrapper = relative(
  newIconsDir,
  dirname(iconWrapperLocation)
)
const iconEntry = resolve(iconsDir, 'index.js')
const usedTemplateSet = new Set()

const findUsedTemplate = content => {
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['jsx']
  })
  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value !== '@clair/icons') {
        return
      }
      const {
        node: { specifiers }
      } = path
      specifiers.forEach(node => {
        // record the template name
        usedTemplateSet.add(node.imported.name)
      })
    }
  })
}

const getExportedTemplate = content => {
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['typescript']
  })
  let exportNames = []
  traverse(ast, {
    ExportDeclaration(path) {
      exportNames = exportNames.concat(
        path.node.declaration.declarations.map(node => node.id.name)
      )
    }
  })
  return exportNames
}

const getIconSourcePromise = () =>
  globby('*.ts', {
    cwd: iconSourceDir
  }).then(tsFiles => {
    return tsFiles.reduce((acc, file) => {
      const tsLocation = resolve(iconSourceDir, file)
      const tsContent = readFileSync(tsLocation, 'utf-8')
      const exportNames = getExportedTemplate(tsContent)
      return [...acc, ...exportNames]
    }, [])
  })

const getUsedTemplateNamePromise = () =>
  globby('**/*.js', {
    cwd: iconsDir
  }).then(jsFiles => {
    jsFiles.forEach(file => {
      const fileLocation = resolve(iconsDir, file)
      const fileContent = readFileSync(fileLocation, 'utf-8')
      findUsedTemplate(fileContent)
    })
  })

const generateIconContent = iconName => {
  const from = normalize(`./${relativePathToIconWrapper}/icon-wrapper`)
  return `
  import { makeIconComponent } from './${from}'
  import { ${iconName} } from '@clair/icons'
  export const Icon${iconName} = makeIconComponent({
    name: 'CIcon${iconName}',
    template: ${iconName}
  })
  `
}

const getIconFileName = iconName =>
  iconName
    .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
    .replace(/^-/, '')

Promise.all([getIconSourcePromise(), getUsedTemplateNamePromise()]).then(
  ([iconSources]) => {
    const leftIcons = iconSources.filter(icon => !usedTemplateSet.has(icon))
    if (!leftIcons.length) {
      return
    }
    if (!existsSync(newIconsDir)) {
      mkdirSync(newIconsDir)
    }
    const iconFileNameAndComponentNameEntry = leftIcons.map(iconName => [
      getIconFileName(iconName),
      iconName
    ])
    iconFileNameAndComponentNameEntry.forEach(([iconFileName, iconName]) => {
      const iconContent = generateIconContent(iconName)
      writeFileSync(resolve(newIconsDir, `${iconFileName}.js`), iconContent)
    })
    const relativePathFromEntryToNewIcons = relative(
      dirname(iconEntry),
      newIconsDir
    )
    const newExportDeclaration = iconFileNameAndComponentNameEntry.reduce(
      (acc, [iconFileName, iconName]) => {
        return `${acc}export { Icon${iconName} } from './${relativePathFromEntryToNewIcons}/${iconFileName}'\n`
      },
      '\n'
    )
    const oldEntryContent = readFileSync(iconEntry, 'utf-8')
    writeFileSync(iconEntry, `${oldEntryContent}${newExportDeclaration}`)
  }
)
