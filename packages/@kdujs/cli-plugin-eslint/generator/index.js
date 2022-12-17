const fs = require('fs')
const path = require('path')

module.exports = (api, { config, lintOn = [] }, _, invoking) => {
  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(',')
  }

  const eslintConfig = require('../eslintOptions').config(api)

  const pkg = {
    scripts: {
      lint: 'kdu-cli-service lint'
    },
    eslintConfig,
    devDependencies: {
      'eslint': '^5.16.0',
      'eslint-plugin-kdu': '^5.0.0'
    }
  }

  if (!api.hasPlugin('typescript')) {
    pkg.devDependencies['babel-eslint'] = '^10.0.3'
  }

  if (config === 'airbnb') {
    eslintConfig.extends.push('@kdujs/airbnb')
    Object.assign(pkg.devDependencies, {
      '@kdujs/eslint-config-airbnb': '^5.0.0'
    })
  } else if (config === 'standard') {
    eslintConfig.extends.push('@kdujs/standard')
    Object.assign(pkg.devDependencies, {
      '@kdujs/eslint-config-standard': '^5.0.0'
    })
  } else if (config === 'prettier') {
    eslintConfig.extends.push('@kdujs/prettier')
    Object.assign(pkg.devDependencies, {
      '@kdujs/eslint-config-prettier': '^5.0.0',
      'eslint-plugin-prettier': '^3.1.1',
      prettier: '^1.18.2'
    })
    // prettier & default config do not have any style rules
    // so no need to generate an editorconfig file
  } else {
    // default
    eslintConfig.extends.push('eslint:recommended')
  }

  const editorConfigTemplatePath = path.resolve(__dirname, `./template/${config}/_editorconfig`)
  if (fs.existsSync(editorConfigTemplatePath)) {
    if (fs.existsSync(api.resolve('.editorconfig'))) {
      // Append to existing .editorconfig
      api.render(files => {
        const editorconfig = fs.readFileSync(editorConfigTemplatePath, 'utf-8')
        files['.editorconfig'] += `\n${editorconfig}`
      })
    } else {
      api.render(`./template/${config}`)
    }
  }

  if (!lintOn.includes('save')) {
    pkg.kdu = {
      lintOnSave: false // eslint-loader configured in runtime plugin
    }
  }

  if (lintOn.includes('commit')) {
    Object.assign(pkg.devDependencies, {
      'lint-staged': '^9.4.2'
    })
    pkg.gitHooks = {
      'pre-commit': 'lint-staged'
    }
    if (api.hasPlugin('typescript')) {
      pkg['lint-staged'] = {
        '*.{js,kdu,ts}': ['kdu-cli-service lint', 'git add']
      }
    } else {
      pkg['lint-staged'] = {
        '*.{js,kdu}': ['kdu-cli-service lint', 'git add']
      }
    }
  }

  api.extendPackage(pkg)

  // typescript support
  if (api.hasPlugin('typescript')) {
    applyTS(api)
  }
}

// In PNPM v4, due to their implementation of the module resolution mechanism,
// put require('../lint') in the callback would raise a "Module not found" error,
// But we cannot cache the file outside the callback,
// because the node_module layout may change after the "intall additional dependencies"
// phase, thus making the cached module fail to execute.
// FIXME: at the moment we have to catch the bug and silently fail. Need to fix later.
module.exports.hooks = (api) => {
  // lint & fix after create to ensure files adhere to chosen config
  api.afterAnyInvoke(() => {
    try {
      require('../lint')({ silent: true }, api)
    } catch (e) {}
  })
}

const applyTS = module.exports.applyTS = api => {
  api.extendPackage({
    eslintConfig: {
      extends: ['@kdujs/typescript'],
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    devDependencies: {
      '@kdujs/eslint-config-typescript': '^5.0.0'
    }
  })
}
