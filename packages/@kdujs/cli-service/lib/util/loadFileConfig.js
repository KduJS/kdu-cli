const fs = require('fs')
const path = require('path')

const isFileEsm = require('is-file-esm')
const { loadModule } = require('@kdujs/cli-shared-utils')

module.exports = function loadFileConfig (context) {
  let fileConfig, fileConfigPath

  const possibleConfigPaths = [
    process.env.KDU_CLI_SERVICE_CONFIG_PATH,
    './kdu.config.js',
    './kdu.config.cjs',
    './kdu.config.mjs'
  ]
  for (const p of possibleConfigPaths) {
    const resolvedPath = p && path.resolve(context, p)
    if (resolvedPath && fs.existsSync(resolvedPath)) {
      fileConfigPath = resolvedPath
      break
    }
  }

  if (fileConfigPath) {
    const { esm } = isFileEsm.sync(fileConfigPath)

    if (esm) {
      fileConfig = import(fileConfigPath)
    } else {
      fileConfig = loadModule(fileConfigPath, context)
    }
  }

  return {
    fileConfig,
    fileConfigPath
  }
}
