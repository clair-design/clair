const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackConfig = {
  entry: require.resolve('../runtime/core.js'),
  output: {
    filename: `runtimeCore.js`,
    path: require('path').resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  mode: 'production',
  optimization: {
    minimize: false
  },
  externals: [/^[a-z]/i],
  resolve: {
    extensions: ['.js', '.mjs', '.jsx', '.json', '.vue', '.scss', '.css']
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules'],
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: require.resolve('../loaders/markdown-vue-loader.js'),
            options: {}
          }
        ]
      }
    ]
  }
}

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true // Shows colors in the console
    })
  )
})
