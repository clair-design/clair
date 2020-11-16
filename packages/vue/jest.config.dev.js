const component = process.argv[process.argv.length - 1]

module.exports = {
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
  testMatch: [`<rootDir>/packages/${component}/**/*.spec.js?(x)`],
  testPathIgnorePatterns: ['node_modules', 'e2e'],
  transformIgnorePatterns: [`node_modules/(?!(date-fns|lodash-es|env))`],
  collectCoverageFrom: [`packages/${component}/src/**/*.{js,jsx}`],
  coverageReporters: ['text-summary'],
  setupFiles: ['./jest/setup.js'],
  setupFilesAfterEnv: ['./jest/setupAfterEnv.js']
}
