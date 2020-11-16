// The reason why not using `babel.config.js` as filename is that
// rollup-plugin-babel seems to use the file-relative configuration
// see https://babeljs.io/docs/en/config-files#file-relative-configuration
// and https://github.com/rollup/rollup-plugin-babel for keyword `.babelrc`
// For now, `babel.config.js` is not working with rollup

module.exports = {
  presets: [
    // SEE https://github.com/vuejs/jsx/blob/master/packages/babel-preset-jsx/README.md

    ['@vue/babel-preset-jsx'],
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
}
