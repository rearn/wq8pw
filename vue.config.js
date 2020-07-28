module.exports = {
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  }
}
