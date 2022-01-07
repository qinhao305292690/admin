const path = require('path')
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,  // 生产环境的 source map
  chainWebpack: config => config.output.filename('[name].[hash:16].js').end(),
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
  },
  publicPath: '/static/dist',
  //抛出全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/utils/index.less'),
      ],
    }
  },
}
