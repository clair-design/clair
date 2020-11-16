const path = require('path')
const includeMarkdown = require('./plugin-include.js')

const option = {
  gistInjection: '<demo-tool></demo-tool>',
  extendProcessor(processor) {
    const hl = require('rehype-highlight')
    for (let i = 0; i < processor.attachers.length; i++) {
      const item = processor.attachers[i]
      if (item[0] === hl) {
        item[0] = require('@mapbox/rehype-prism')
      }
    }
    // support include markdown
    processor.use(includeMarkdown, {
      aliases: {
        '@vue': path.resolve(__dirname, '../../packages')
      }
    })
    return processor
  }
}

module.exports = option
