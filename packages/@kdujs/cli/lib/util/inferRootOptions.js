// Infer rootOptions for individual generators being invoked
// in an existing project.
const { semver, isPlugin } = require('@kdujs/cli-shared-utils')
module.exports = function inferRootOptions (pkg) {
  const rootOptions = {}
  const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies)

  // projectName
  rootOptions.projectName = pkg.name

  if ('kdu' in deps) {
    const kdu2Range = new semver.Range('^2.5.13-alpha.0', { includePrerelease: true })
    const kdu3Range = new semver.Range('^3.1.5-alpha.1', { includePrerelease: true })

    const depKduVersion = semver.minVersion(new semver.Range(deps.kdu))

    if (semver.satisfies(depKduVersion, kdu3Range)) {
      rootOptions.kduVersion = '3'
    } else if (semver.satisfies(depKduVersion, kdu2Range)) {
      rootOptions.kduVersion = '2'
    }
  }

  // router
  if ('kdu-router' in deps) {
    rootOptions.router = true
  }

  // kdux
  // if ('kdux' in deps) {
  //   rootOptions.kdux = true
  // }

  // cssPreprocessors
  if ('sass' in deps) {
    rootOptions.cssPreprocessor = 'sass'
  } else if ('less-loader' in deps) {
    rootOptions.cssPreprocessor = 'less'
  } else if ('stylus-loader' in deps) {
    rootOptions.cssPreprocessor = 'stylus'
  }

  rootOptions.plugins = Object.keys(deps)
    .filter(isPlugin)
    .reduce((plugins, name) => {
      plugins[name] = {}
      return plugins
    }, {})

  return rootOptions
}
