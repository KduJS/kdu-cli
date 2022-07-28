const pluginDevDeps = require('../package.json').devDependencies

module.exports = (
  api,
  { classComponent, skipLibCheck = true, convertJsToTs, allowJs },
  rootOptions,
  invoking
) => {
  const isKdu3 = rootOptions && rootOptions.kduVersion === '3'

  api.extendPackage({
    devDependencies: {
      typescript: pluginDevDeps.typescript
    }
  })

  if (classComponent) {
    if (isKdu3) {
      api.extendPackage({
        dependencies: {
          'kdu-class-component': '^6.1.2-alpha.0'
        }
      })
    } else {
      api.extendPackage({
        dependencies: {
          'kdu-class-component': pluginDevDeps['kdu-class-component'],
          'kdu-property-decorator': pluginDevDeps['kdu-property-decorator']
        }
      })
    }
  }

  // late invoke compat
  if (invoking) {
    // if (api.hasPlugin('unit-mocha')) {
    //   // eslint-disable-next-line node/no-extraneous-require
    //   require('@kdujs/cli-plugin-unit-mocha/generator').applyTS(api)
    // }
    //
    // if (api.hasPlugin('unit-jest')) {
    //   // eslint-disable-next-line node/no-extraneous-require
    //   require('@kdujs/cli-plugin-unit-jest/generator').applyTS(api)
    // }

    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@kdujs/cli-plugin-eslint/generator').applyTS(api)
    }

    // if (api.hasPlugin('e2e-webdriverio')) {
    //   // eslint-disable-next-line node/no-extraneous-require
    //   require('@kdujs/cli-plugin-e2e-webdriverio/generator').applyTS(api)
    // }
  }

  api.render('./template', {
    skipLibCheck,
    hasMocha: api.hasPlugin('unit-mocha'),
    hasJest: api.hasPlugin('unit-jest'),
    hasWebDriverIO: api.hasPlugin('e2e-webdriverio')
  })

  if (isKdu3) {
    api.render('./template-kdu3')

    // In Kdu 3, TSX interface is defined
    // So no need to manually add a shim.
    api.render((files) => delete files['src/shims-tsx.d.ts'])
  }

  require('./convert')(api, { convertJsToTs })
}

module.exports.after = '@kdujs/cli-plugin-router'
