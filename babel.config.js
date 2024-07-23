const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式
const { extname } = require('path')
const suffix = ['.css', '.less']

const autoCssModule = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node
        const { value } = source
        if (specifiers.length > 0 && suffix.includes(extname(value))) {
          // 在路径末尾加上 css-modules 用于 webpack 匹配该文件
          source.value = `${value}?css-modules`
        }
      }
    }
  }
}

module.exports = {
  // 执行顺序由右往左,所以先处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ],
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    [
      '@babel/preset-typeScript',
      {
        isTSX: true,
        allExtensions: true
      }
    ]
  ],
  plugins: [
    isDEV && 'react-refresh/babel',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    autoCssModule
  ].filter(Boolean)
}
