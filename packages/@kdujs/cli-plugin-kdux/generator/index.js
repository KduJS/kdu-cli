module.exports = (api, options = {}, rootOptions = {}) => {
  api.injectImports(api.entryFile, `import store from './store'`)

  if (rootOptions.kduVersion === '3') {
    api.transformScript(api.entryFile, require('./injectUseStore'))
    api.extendPackage({
      dependencies: {
        kdux: '^4.0.0'
      }
    })
    api.render('./template-kdu3', {})
  } else {
    api.injectRootOptions(api.entryFile, `store`)

    api.extendPackage({
      dependencies: {
        kdux: '^3.6.2'
      }
    })

    api.render('./template', {})
  }

  if (api.invoking && api.hasPlugin('typescript')) {
    /* eslint-disable-next-line node/no-extraneous-require */
    const convertFiles = require('@kdujs/cli-plugin-typescript/generator/convert')
    convertFiles(api)
  }
}
