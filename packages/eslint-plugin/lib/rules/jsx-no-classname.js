module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'jsx in vue should not use `className` but `class`'
    }
  },
  create: function (context) {
    return {
      JSXAttribute: function (node) {
        if (node.name.name === 'className') {
          const { range } = node.name
          context.report({
            node,
            message: 'Use `class` instead of `className`',
            fix: fixer => {
              return fixer.replaceTextRange(range, 'class')
            }
          })
        }
      }
    }
  }
}
