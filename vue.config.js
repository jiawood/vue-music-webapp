const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('plugins', resolve('src/plugins'))
      .set('router', resolve('src/router'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee'

            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          }
        }
      }
    }
  }
}

// module.exports = {
//   // outputDir: 'dist',
//   // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',

// }
