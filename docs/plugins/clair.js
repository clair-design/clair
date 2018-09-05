if (process.env.NODE_ENV === 'production') {
  require('../../dist/clair.css')
} else {
  require('../../src/styles/entry.css')
}

module.exports = process.env.NODE_ENV === 'production'
  ? require('../../dist/clair.cjs')
  : require('../../src/entry')
