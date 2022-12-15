// this file is for cases where we need to access the
// webpack config as a file when using CLI commands.

let service = process.KDU_CLI_SERVICE

if (!service || process.env.KDU_CLI_API_MODE) {
  const Service = require('./lib/Service')
  service = new Service(process.env.KDU_CLI_CONTEXT || process.cwd())
  service.init(process.env.KDU_CLI_MODE || process.env.NODE_ENV)
}

module.exports = service.resolveWebpackConfig()
