module.exports = (api, {
  classComponent,
  tsLint,
  lintOn = [],
  convertJsToTs,
  allowJs
}, _, invoking) => {
  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(',')
  }

  api.extendPackage({
    devDependencies: {
      typescript: '~3.5.3'
    }
  })

  if (classComponent) {
    api.extendPackage({
      dependencies: {
        'kdu-class-component': '^7.0.2',
        'kdu-property-decorator': '^8.1.0'
      }
    })
  }

  if (tsLint) {
    api.extendPackage({
      scripts: {
        lint: 'kdu-cli-service lint'
      }
    })

    if (!lintOn.includes('save')) {
      api.extendPackage({
        kdu: {
          lintOnSave: false
        }
      })
    }

    if (lintOn.includes('commit')) {
      api.extendPackage({
        devDependencies: {
          'lint-staged': '^9.4.2'
        },
        gitHooks: {
          'pre-commit': 'lint-staged'
        },
        'lint-staged': {
          '*.ts': ['kdu-cli-service lint', 'git add'],
          '*.kdu': ['kdu-cli-service lint', 'git add']
        }
      })
    }

    // lint and fix files on creation complete
    api.onCreateComplete(() => {
      return require('../lib/tslint')({}, api, true)
    })
  }

  // late invoke compat
  if (invoking) {
    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@kdujs/cli-plugin-eslint/generator').applyTS(api)
    }
  }

  api.render('./template', {
    isTest: process.env.KDU_CLI_TEST || process.env.KDU_CLI_DEBUG,
    hasMocha: api.hasPlugin('unit-mocha'),
    hasJest: api.hasPlugin('unit-jest')
  })

  require('./convert')(api, { tsLint, convertJsToTs })
}
