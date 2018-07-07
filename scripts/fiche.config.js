const { resolve } = require('path')
const abs = path => resolve(__dirname, path)

module.exports = {
  layouts: abs('../docs/layouts/*.vue'),
  plugins: abs('../docs/plugins/*.js'),
  documents: [
    abs('../docs/content/**/*.md'),
    abs('../src/components/**/index.md')
  ],
  styles: [abs('../docs/styles/main.css')],
  output: abs('../.site')
}
