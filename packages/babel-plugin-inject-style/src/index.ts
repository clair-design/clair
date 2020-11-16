import { NodePath } from '@babel/traverse'
import { ImportDeclaration, ImportSpecifier } from 'babel-types'
import * as babel from '@babel/core'
export default function clairStyleLoader({ types: t }: typeof babel) {
  return {
    visitor: {
      ImportDeclaration(path: NodePath<ImportDeclaration>, state: any) {
        const { opts: option = {} } = state
        // get options
        const {
          packageName = '@clair/vue',
          stylePackageName = '@clair/theme-default',
          getStylePath,
          extension = '.scss'
        } = option
        // import xxx from "value"
        const { value } = path.node.source
        if (packageName !== value) {
          return
        }
        // analyze component name
        const componentNames: string[] = path.node.specifiers
          .map(specifier => {
            const {
              local: { name: componentName = '' } = {},
              imported: { name: realComponentName = '' } = {}
            } = specifier as ImportSpecifier
            return realComponentName || componentName
          })
          .filter(Boolean)
        let stylePaths: string[] = []
        // user defined function
        if (typeof getStylePath === 'function') {
          stylePaths = componentNames.map(getStylePath)
        } else {
          componentNames.forEach(componentName => {
            let styleName2Use = ''
            // camel to kebab case
            const styleName = componentName
              .replace(/([A-Z])/g, match => `-${match.toLowerCase()}`)
              .replace(/^-/, '')
            // component-a-b -> ['component-a-b', 'component-a', 'component']
            const start2EndPossibleStyleNames = styleName
              .split('-')
              .reduce((acc: string[], item: string) => {
                const { length, [length - 1]: last } = acc
                if (!last) {
                  return acc.concat(item)
                }
                return acc.concat(`${last}-${item}`)
              }, [])
              .reverse() // try the more detailed one first
            // component-a-b -> ['component-a-b', 'a-b', 'b']
            const end2StartPossibleStyleNames = styleName
              .split('-')
              .reverse()
              .reduce((acc: string[], item: string) => {
                const { length, [length - 1]: last } = acc
                if (!last) {
                  return acc.concat(item)
                }
                return acc.concat(`${item}-${last}`)
              }, [])
              .reverse()
              .slice(1) // the full length one already exist in start2End
            const possibleStyleNames = [
              ...new Set([
                ...start2EndPossibleStyleNames,
                ...end2StartPossibleStyleNames
              ])
            ]
            for (const name of possibleStyleNames) {
              try {
                require.resolve(
                  `${stylePackageName}/styles/${name}${extension}`
                )
                styleName2Use = name
                break
              } catch (e) {
                // nothing
              }
            }
            if (styleName2Use && !stylePaths.includes(styleName2Use)) {
              stylePaths.push(
                `${stylePackageName}/styles/${styleName2Use}${extension}`
              )
            }
          })
        }
        // inject import declaration of style files
        if (stylePaths.length) {
          path.insertAfter(
            stylePaths.map(stylePath => {
              return t.importDeclaration([], t.stringLiteral(stylePath))
            })
          )
        }
      }
    }
  }
}
