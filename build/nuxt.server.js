module.exports = function ({
  port
}) {
  /* eslint-disable no-console */
  const { Nuxt, Builder } = require('nuxt')
  const app = require('express')()
  const isProd = (process.env.NODE_ENV === 'production')

  // We instantiate nuxt.js with the options
  const config = require('./nuxt.config.js')
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
  app.listen(port, '127.0.0.1')
  console.log(`Server listening on localhost: ${port}`)
}
