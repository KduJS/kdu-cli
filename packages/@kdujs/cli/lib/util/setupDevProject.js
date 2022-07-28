// dev only

const path = require('path')
const { linkBin } = require('./linkBin')

module.exports = function setupDevProject (targetDir) {
  return linkBin(
    require.resolve('@kdujs/cli-service/bin/kdu-cli-service'),
    path.join(targetDir, 'node_modules', '.bin', 'kdu-cli-service')
  )
}
