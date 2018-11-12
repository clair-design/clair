module.exports = {
  root: true,
  plugins: ['jest'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    node: true,
    jest: true,
    browser: true,
    'jest/globals': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // wrapper for `plugin:vue/essential` and `standard`
    // SEE https://github.com/clair-design/eslint-config-clair
    'clair'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  globals: {
    page: true,
    browser: true,
    jestPuppeteer: true
  }
}
