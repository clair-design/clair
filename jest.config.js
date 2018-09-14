module.exports = {
  'moduleFileExtensions': [
    'js',
    'vue'
  ],
  'modulePaths': [
    '<rootDir>/src',
    '<rootDir>/node_modules'
  ],
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  'moduleNameMapper': {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  'snapshotSerializers': [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
