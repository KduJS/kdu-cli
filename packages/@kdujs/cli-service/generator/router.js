module.exports = (api, options) => {
  require('@kdujs/cli-plugin-kdux/generator')(api, {
    historyMode: options.routerHistoryMode
  })
}
