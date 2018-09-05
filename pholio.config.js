module.exports = {
  plugins: 'docs/plugins',
  layouts: 'docs/layouts',
  assetPath: 'docs/static',
  pages: ['docs/content/**/*.md', 'src/components/**/index.md'],
  output: '.site',

  // fallback page, usually a 404 page or error page
  errorRedirect: '/404',

  // md2vue configuration
  md2vue: {
    gistInjection: '<vue-demo-tools></vue-demo-tools>'
  },

  // external links
  // support CSS and JavaScript urls
  externals: [
    'https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://lib.baomitu.com/babel-polyfill/6.26.0/polyfill.min.js',
    'https://lib.baomitu.com/fetch/2.0.3/fetch.min.js'
  ]
}
