module.exports = (api, options) => {
  require('@kdujs/cli-plugin-router/generator')(api, {
    historyMode: options.routerHistoryMode
  })
}
