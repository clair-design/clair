const { resolveAlias = {} } = require('./package.json')
const aliases = {}
Object.keys(resolveAlias).forEach(key => {
  const val = resolveAlias[key]
  aliases[`^${key}/(.*)$`] = `<rootDir>/${val}/$1`
})

module.exports = {
  bail: true,
  collectCoverage: false,
  moduleFileExtensions: ['js', 'vue', 'json'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    ...aliases
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  testMatch: ['**/__test__/unit/**/*.spec.js?(x)'],
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
  // TODO
  // https://docs.codeclimate.com/docs/configuring-test-coverage
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: 'coverage/unit'
}
