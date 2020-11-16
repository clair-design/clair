const { transformFileAsync } = require('@babel/core')
const { resolve } = require('path')

transformFileAsync(resolve(__dirname, 'source/foo.js'), {
  plugins: [
    '@babel/plugin-syntax-jsx',
    [
      require('../dist/index.js'),
      {
        rewrite(option, defaultRewrite) {
          defaultRewrite(option)
        },
        extensions: ['.ts', '.jsx', '.js']
      }
    ]
  ]
}).then(({ code }) => {
  console.log('result')
  console.log(code)
})
