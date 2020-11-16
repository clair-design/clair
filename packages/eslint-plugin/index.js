const rules = {
  'jsx-no-classname': require('./lib/rules/jsx-no-classname')
}

module.exports = {
  rules,
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  configs: {
    vue: {
      plugins: ['@clair'],
      rules: {
        '@clair/jsx-no-classname': 'error'
      }
    }
  }
}
