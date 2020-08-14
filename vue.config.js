module.exports = {
  pages: {
    index: {
      entry: 'src/main/main.ts',
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv',
    },
  },
};
