const { resolve } = require('path')

module.exports = {
  output: resolve(__dirname, "trimmed"),
  folder: resolve(__dirname, "src/svg"),
  tsFolder: resolve(__dirname, "icons")
}
