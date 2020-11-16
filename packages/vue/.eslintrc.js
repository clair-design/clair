module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    require.resolve('eslint-config-prettier'),
    require.resolve('eslint-config-prettier/vue'),
    'plugin:@clair/vue'
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // SEE https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'none'
      }
    ],
    // SEE https://eslint.org/docs/rules/no-empty
    'no-empty': ['error', { allowEmptyCatch: true }],
    'getter-return': 'error',
    'no-await-in-loop': 'error',
    'no-template-curly-in-string': 'warn',
    'array-callback-return': 'warn',
    'class-methods-use-this': 'warn',
    complexity: ['error', 20],
    'default-case': 'warn',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'warn',
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-implicit-coercion': 'warn',
    'no-implicit-globals': 'warn',
    'no-loop-func': 'warn',
    'no-magic-numbers': [
      'warn',
      {
        ignore: [-1, 0, 1],
        ignoreArrayIndexes: true
      }
    ],
    'no-param-reassign': 'warn',
    'no-script-url': 'error',
    'no-useless-concat': 'warn',
    'no-useless-return': 'error',
    'array-bracket-newline': [
      'error',
      {
        multiline: true
      }
    ],
    'max-depth': ['error', 5],
    'max-len': 'warn',
    'max-lines': ['error', 1000],
    'max-nested-callbacks': ['error', 5],
    'max-params': ['error', 3],
    'max-statements': ['error', 100],
    'multiline-ternary': ['warn', 'always-multiline'],
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'nonblock-statement-body-position': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'error',
    'prefer-template': 'warn'
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
