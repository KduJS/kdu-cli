exports.config = (api, preset, rootOptions = {}) => {
  const config = {
    root: true,
    env: { node: true },
    extends: ['plugin:kdu/essential'],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
      'no-console': makeJSOnlyValue(`process.env.NODE_ENV === 'production' ? 'warn' : 'off'`),
      'no-debugger': makeJSOnlyValue(`process.env.NODE_ENV === 'production' ? 'warn' : 'off'`)
    }
  }

  if (api.hasPlugin('babel') && !api.hasPlugin('typescript')) {
    config.parserOptions = {
      parser: '@babel/eslint-parser'
    }
  }

  if (preset === 'airbnb') {
    config.extends.push('@kdujs/airbnb')
  } else if (preset === 'standard') {
    config.extends.push('@kdujs/standard')
  } else if (preset === 'prettier') {
    config.extends.push(...['eslint:recommended', 'plugin:prettier/recommended'])
  } else {
    // default
    config.extends.push('eslint:recommended')
  }

  if (api.hasPlugin('typescript')) {
    // typically, typescript ruleset should be appended to the end of the `extends` array
    // but that is not the case for prettier, as there are conflicting rules
    if (preset === 'prettier') {
      config.extends.pop()
      config.extends.push(...['@kdujs/typescript/recommended', 'plugin:prettier/recommended'])
    } else {
      config.extends.push('@kdujs/typescript/recommended')
    }
  }

  if (rootOptions.kduVersion === '3') {
    const updateConfig = cfg =>
      cfg.replace(
        /plugin:kdu\/(essential|recommended|strongly-recommended)/gi,
        'plugin:kdu/kdu3-$1'
      )
    config.extends = config.extends.map(updateConfig)
  }

  return config
}

// __expression is a special flag that allows us to customize stringification
// output when extracting configs into standalone files
function makeJSOnlyValue (str) {
  const fn = () => {}
  fn.__expression = str
  return fn
}

const baseExtensions = ['.js', '.jsx', '.kdu']
exports.extensions = api => api.hasPlugin('typescript')
  ? baseExtensions.concat('.ts', '.tsx')
  : baseExtensions
