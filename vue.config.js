const path = require('path')
module.exports = {
  lintOnSave: false,
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
