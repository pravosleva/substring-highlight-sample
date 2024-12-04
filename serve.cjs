const dotenv = require('dotenv')
const { check, serve } = require('reserve')

const dotEnvTypes = ['.production', '']

;['.local', ''].forEach((dotenvClass) => {
  dotEnvTypes.forEach((dotenvType) => {
    dotenv.config({ path: '.env' + dotenvType + dotenvClass })
  })
})

// Exactly AFTER dotenv configuration
const config = require('./serve.config')

check(config).then((configuration) =>
  serve(configuration).on('ready', (cfg) => {
    console.log(`Server running at ${new URL(cfg.url).origin}${process.env.PUBLIC_URL}`)
  })
)
