const md2vue = require('md2vue')
const option = require('../build/md2vue-option')

module.exports = function md2vueLoader(content, map, meta) {
  if (this.cacheable) {
    this.cacheable()
  }

  const callback = this.async()
  const file = { path: this.resourcePath, contents: content }
  md2vue(file, option, (err, file) => {
    if (err) return callback(err)

    const data = file.data.frontmatter || {}

    const content = [
      file.contents,
      `module.exports.group = ${JSON.stringify(data.group)}`,
      `module.exports.description = ${JSON.stringify(data.heading)}`,
      `module.exports.toc = ${JSON.stringify(file.data.toc)}`
    ].join('\n')

    callback(null, content, map, meta)
  })
}
