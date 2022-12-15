const fs = require('fs')
const path = require('path')
const execa = require('execa')
const resolve = require('resolve')

module.exports = function inspect (paths, args) {
  const cwd = process.cwd()
  let servicePath
  try {
    servicePath = resolve.sync('@kdujs/cli-service', { basedir: cwd })
  } catch (e) {
    const { error } = require('@kdujs/cli-shared-utils')
    error(
      `Failed to locate @kdujs/cli-service.\n` +
      `Note that \`kdu inspect\` is an alias of \`kdu-cli-service inspect\`\n` +
      `and can only be used in a project where @kdujs/cli-service is locally installed.`
    )
    process.exit(1)
  }
  const binPath = path.resolve(servicePath, '../../bin/kdu-cli-service.js')
  if (fs.existsSync(binPath)) {
    execa('node', [
      binPath,
      'inspect',
      ...(args.mode ? ['--mode', args.mode] : []),
      ...(args.rule ? ['--rule', args.rule] : []),
      ...(args.plugin ? ['--plugin', args.plugin] : []),
      ...(args.rules ? ['--rules'] : []),
      ...(args.plugins ? ['--plugins'] : []),
      ...(args.verbose ? ['--verbose'] : []),
      ...paths
    ], { cwd, stdio: 'inherit' })
  }
}
