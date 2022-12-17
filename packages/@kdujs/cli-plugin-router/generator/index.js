module.exports = (api, options = {}) => {
  api.injectImports(api.entryFile, `import router from './router'`)
  api.injectRootOptions(api.entryFile, `router`)

  api.extendPackage({
    dependencies: {
      'kdu-router': '^3.0.7'
    }
  })

  api.render('./template', {
    historyMode: options.historyMode,
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
  })

  if (api.invoking) {
    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@kdujs/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
