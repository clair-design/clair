module.exports = {
  bail: true,
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json'],
  modulePaths: [
    '<rootDir>/src',
    '<rootDir>/packages',
    '<rootDir>/node_modules'
  ],
  transform: {
    '^.+\\.js$': './jest/babel-jest-wrapper.js'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^packages/(.*)$': '<rootDir>/packages/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/packages/**/*.spec.js?(x)',
    '<rootDir>/src/**/*.spec.js',
    '<rootDir>/e2e/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'packages/*/src/**/*.{js,jsx}',
    '!**/node_modules/**'
  ],
  transformIgnorePatterns: [`node_modules/(?!(date-fns|lodash-es|env))`],
  // TODO
  // https://docs.codeclimate.com/docs/configuring-test-coverage
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage/unit',
  setupFiles: ['./jest/setup.js'],
  setupFilesAfterEnv: ['./jest/setupAfterEnv.js']
}
