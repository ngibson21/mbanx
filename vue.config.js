const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: 'static',
      reportFilename: '../report.html',
      openAnalyzer: false
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    cacheId: 'mbanq-web',
    staticFileGlobs: ['dist/**/*.{js,html,css}'],
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/sw.js'
      // ...other Workbox options...
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  css: {
    extract: { ignoreOrder: true }
  }
}
