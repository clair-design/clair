module.exports = {
  generate: {
    dir: './site',
    minify: {
      decodeEntities: false
    }
  },
  srcDir: './document/',
  loading: false,
  head: {
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Clair Design，一套包含设计规范、Vue 组件和配套资源的设计系统。'
      }
    ]
  },
  plugins: ['~plugins/clair.js'],
  build: {
    publicPath: '/static/',
    postcss: [
      require('postcss-cssnext')({
        warnForDuplicates: false
      }),
      require('postcss-import')(),
      require('postcss-for')()
    ]
  }
}
