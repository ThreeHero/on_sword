const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const AntdMomentWebpackPlugin = require('@ant-design/moment-webpack-plugin')

const loaders = require('./loaders.js')

module.exports = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[hash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true, // 每次打包清空
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 自动查找后缀
    alias: {
      '@': path.join(__dirname, '../src'),
      '#': path.join(__dirname, '../public') // 静态资源
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new WebpackBar({ name: 'Threehero' }),
    new AntdMomentWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), // 模板取定义root节点的模板
      inject: true // 自动注入静态资源
    })
  ]
}
