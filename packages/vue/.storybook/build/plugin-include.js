const vfile = require('to-vfile')
const unified = require('unified')
const markdown = require('remark-parse')
const toHast = require('mdast-util-to-hast')

/**
 * Whether the node is an include directive
 * An include directive is written as a paragraph:
 * !include path/to/file.md
 */
function isIncludeDirective(node) {
  const isParagraph = node && node.tagName === 'p'
  if (!isParagraph) return false

  const text = node.children[0].value || ''
  return text.startsWith('!include')
}

/**
 * Replace aliases in path
 * @param {string} path
 * @param {object} aliases
 * @return {string}
 */
function normalizePath(path, aliases) {
  return Object.keys(aliases).reduce((p, alias) => {
    return p.replace(alias, aliases[alias])
  }, path)
}

/**
 * An unified.js plugin to include files in markdown
 * @see https://unifiedjs.com
 */
module.exports = function includeMarkdown(
  options = {
    aliases: {}
  }
) {
  return function transformer(node) {
    if (!node) return
    const children = node.children || []
    children.filter(isIncludeDirective).forEach(node => {
      const text = node.children[0].value
      const [rawPath] = text.split(/\s+/).reverse()
      const path = normalizePath(rawPath, options.aliases)

      // load markdown as AST
      const tree = unified().use(markdown).parse(vfile.readSync(path))
      const newNodes = toHast(tree).children

      // replace node
      const index = children.indexOf(node)
      children.splice(index, 1, ...newNodes)
    })
  }
}
