module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-focus-visible')({
      preserve: false
    }),
    require('focus-within/postcss')(),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
