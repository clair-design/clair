// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-for': {},
    'postcss-each': {},
    'postcss-cssnext': {
      warnForDuplicates: false
    }
  }
}
