module.exports = (api, options) => {
  api.injectImports(api.entryFile, `import store from './store'`)
  api.injectRootOptions(api.entryFile, `store`)
  api.extendPackage({
    dependencies: {
      kdux: '^3.6.2'
    }
  })
  api.render('./template')

  if (api.invoking && api.hasPlugin('typescript')) {
    /* eslint-disable-next-line node/no-extraneous-require */
    const convertFiles = require('@kdujs/cli-plugin-typescript/generator/convert')
    convertFiles(api)
  }
}
