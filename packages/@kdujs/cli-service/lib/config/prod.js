/** @type {import('@kdujs/cli-service').ServicePlugin} */
module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig
        .mode('production')
        .devtool(options.productionSourceMap ? 'source-map' : false)

      // disable optimization during tests to speed things up
      if (process.env.KDU_CLI_TEST && !process.env.KDU_CLI_TEST_MINIMIZE) {
        webpackConfig.optimization.minimize(false)
      }
    }
  })
}
