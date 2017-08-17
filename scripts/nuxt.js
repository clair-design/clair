/* eslint-disable no-console */
const { Nuxt, Builder } = require('nuxt')
const app = require('express').createServer()
const isProd = (process.env.NODE_ENV === 'production')

// eslint-disable-next-line no-magic-numbers
const port = process.env.PORT || 3000

// We instantiate nuxt.js with the options
const config = require('../nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

// Listen the server
app.listen(port, '0.0.0.0')
console.log(`Server listening on localhost: ${port}`)
