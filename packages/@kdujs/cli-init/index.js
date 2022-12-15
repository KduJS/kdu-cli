const execa = require('execa')
const binPath = require.resolve('kdu-cli/bin/kdu-init')

execa(
  binPath,
  process.argv.slice(process.argv.indexOf('init') + 1),
  { stdio: 'inherit' }
)
