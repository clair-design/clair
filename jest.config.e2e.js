const jestConfig = require('./jest.config.js')

module.exports = {
  ...jestConfig,
  preset: 'jest-puppeteer',
  testMatch: ['**/__tests__/e2e/**/*.spec.js?(x)'],
  coverageDirectory: 'coverage/e2e'
}
