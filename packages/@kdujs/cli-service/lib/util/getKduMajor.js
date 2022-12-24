const { semver, loadModule } = require('@kdujs/cli-shared-utils')

/**
 * Get the major Kdu version that the user project uses
 * @param {string} cwd the user project root
 * @returns {2|3}
 */
module.exports = function getKduMajor (cwd) {
  const kdu = loadModule('kdu', cwd)
  // TODO: make Kdu 3 the default version
  const kduMajor = kdu ? semver.major(kdu.version) : 2
  return kduMajor
}
