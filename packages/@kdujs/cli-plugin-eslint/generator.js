module.exports = (api, { config, lintOn = [] }, _, invoking) => {
  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(',')
  }

  const eslintConfig = require('./eslintOptions').config(api)

  const pkg = {
    scripts: {
      lint: 'kdu-cli-service lint'
    },
    eslintConfig,
    devDependencies: {}
  }

  if (config === 'airbnb') {
    eslintConfig.extends.push('@kdujs/airbnb')
    Object.assign(pkg.devDependencies, {
      '@kdujs/eslint-config-airbnb': '^3.0.0'
    })
  } else if (config === 'standard') {
    eslintConfig.extends.push('@kdujs/standard')
    Object.assign(pkg.devDependencies, {
      '@kdujs/eslint-config-standard': '^3.0.0'
    })
  } else if (config === 'prettier') {
    eslintConfig.extends.push('@kdujs/prettier')
    Object.assign(pkg.devDependencies, {
      '@kdujs/eslint-config-prettier': '^3.0.0'
    })
  } else {
    // default
    eslintConfig.extends.push('eslint:recommended')
  }

  if (!lintOn.includes('save')) {
    pkg.kdu = {
      lintOnSave: false // eslint-loader configured in runtime plugin
    }
  }

  if (lintOn.includes('commit')) {
    Object.assign(pkg.devDependencies, {
      'lint-staged': '^7.2.0'
    })
    pkg.gitHooks = {
      'pre-commit': 'lint-staged'
    }
    pkg['lint-staged'] = {
      '*.js': ['kdu-cli-service lint', 'git add'],
      '*.kdu': ['kdu-cli-service lint', 'git add']
    }
  }

  api.extendPackage(pkg)

  // typescript support
  if (api.hasPlugin('typescript')) {
    applyTS(api)
  }

  // lint & fix after create to ensure files adhere to chosen config
  if (config && config !== 'base') {
    api.onCreateComplete(() => {
      require('./lint')({ silent: true }, api)
    })
  }
}

const applyTS = module.exports.applyTS = api => {
  api.extendPackage({
    eslintConfig: {
      extends: ['@kdujs/typescript'],
      parserOptions: {
        parser: 'typescript-eslint-parser'
      }
    },
    devDependencies: {
      '@kdujs/eslint-config-typescript': '^3.0.0'
    }
  })
}
