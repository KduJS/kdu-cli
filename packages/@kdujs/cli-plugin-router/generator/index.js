module.exports = (api, options = {}, rootOptions = {}) => {
  const isKdu3 = (rootOptions.kduVersion === '3')

  api.injectImports(api.entryFile, `import router from './router'`)

  if (isKdu3) {
    api.transformScript(api.entryFile, require('./injectUseRouter'))
    api.extendPackage({
      dependencies: {
        'kdu-router': '^4.0.16'
      }
    })
  } else {
    api.injectRootOptions(api.entryFile, `router`)

    api.extendPackage({
      dependencies: {
        'kdu-router': '^3.5.4'
      }
    })
  }

  api.render('./template', {
    historyMode: options.historyMode,
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript'),
    hasTypeScript: api.hasPlugin('typescript')
  })

  if (isKdu3) {
    api.render('./template-kdu3', {
      historyMode: options.historyMode,
      doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript'),
      hasTypeScript: api.hasPlugin('typescript')
    })
  }

  if (api.invoking) {
    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@kdujs/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
