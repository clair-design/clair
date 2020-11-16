const { RuleTester } = require('eslint')
const rule = require('../../lib/rules/jsx-no-classname')

const rt = new RuleTester({
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
})

rt.run('jsx-no-classname', rule, {
  valid: [{ code: '<div class="name"></div>' }],
  invalid: [
    {
      code: '<div className="name"></div>',
      errors: [{ message: 'Use `class` instead of `className`' }],
      output: '<div class="name"></div>'
    }
  ]
})
