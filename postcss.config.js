// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-easy-import': {},
    'postcss-for': {},
    'postcss-each': {},
    'postcss-reduce-idents': {
      keyframes: false
    },
    'postcss-cssnext': {
      warnForDuplicates: false
    }
  }
}
