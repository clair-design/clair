const { alias } = require('../build/alias')

module.exports = ({ config }) => {
  config.output.pathinfo = false
  // remove original markdown rule (raw loader)
  config.module.rules = config.module.rules.filter(rule => {
    return rule.test.source !== /\.md$/.source
  })

  const jsLoader = config.module.rules.find(
    rule => rule.test.source === /\.(mjs|jsx?)$/.source
  )
  jsLoader.use = ['cache-loader'].concat(jsLoader.use)

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: ['node_modules']
          },
          implementation: require('sass'),
          sourceMap: true
        }
      }
    ]
  })

  config.module.rules.push({
    test: /\.md$/,
    use: [
      'cache-loader',
      {
        loader: require('path').resolve(
          __dirname,
          './loaders/markdown-vue-loader.js'
        ),
        options: {}
      }
    ]
  })

  config.resolve.extensions.push('scss')

  config.resolve.alias = {
    ...config.resolve.alias,
    ...alias
  }

  return config
}
