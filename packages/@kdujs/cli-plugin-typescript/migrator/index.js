module.exports = (api, options, rootOptions) => {
  api.extendPackage(
    {
      devDependencies: {
        typescript: require('../package.json').devDependencies.typescript
      }
    },
    { warnIncompatibleVersions: false }
  )

  // update kdu 3 typescript shim
  if (rootOptions.kduVersion === 3) {
    api.transformScript('src/shims-kdu.d.ts', require('../codemods/migrateComponentType'))
  }
}
