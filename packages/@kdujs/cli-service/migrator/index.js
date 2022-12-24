module.exports = (api) => {
  if (api.hasPlugin('kdu-next')) {
    api.extendPackage({
      devDependencies: {
        'kdu-cli-plugin-kdu-next': null
      }
    },
    {
      prune: true
    })

    api.exitLog('kdu-cli-plugin-kdu-next is removed because Kdu 3 support has been built into the core plugins.')
  }

  // TODO: lint-staged update
}
