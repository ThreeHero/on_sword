const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

const miniCssLoader = isDEV ? 'style-loader' : MiniCssExtractPlugin.loader

// 全局的样式文件
// const globalStyleLoader = {
//   loader: 'style-resources-loader',
//   options: {
//     patterns: path.resolve(__dirname, '../src/mdStyles/variable.less')
//   }
// }

const cssModulesLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: false,
    // 开启 CSS Modules
    modules: {
      mode: 'local',
      localIdentName: '[name]__[local]--[hash:base64:8]',
      exportLocalsConvention: 'dashes'
    }
  }
}

const publicCssLoader = {
  loader: 'css-loader',
  options: {
    // 禁止使用es导出 导出为字符串
    esModule: false,
    exportType: 'string'
  }
}

const publicCssRules = [
  {
    test: /\.css$/,
    include: /public/,
    use: [publicCssLoader, 'postcss-loader']
  },
  {
    test: /\.less$/,
    include: /public/,
    use: [publicCssLoader, 'postcss-loader', 'less-loader']
  },
  {
    test: /\.s[ac]ss$/,
    include: /public/,
    use: [publicCssLoader, 'postcss-loader', 'sass-loader']
  }
]

module.exports = [
  {
    test: /\.([jt]sx?)$/,
    exclude: /node_modules/,
    use: ['thread-loader', 'babel-loader']
  },
  ...publicCssRules,
  {
    test: /\.css$/,
    include: /node_modules/,
    use: [miniCssLoader, 'css-loader', 'postcss-loader']
  },
  {
    test: /\.css$/,
    exclude: [/node_modules/, /public/],
    oneOf: [
      {
        // 配合auto-css-modules
        resourceQuery: /css-modules/,
        use: [miniCssLoader, cssModulesLoader, 'postcss-loader']
      },
      {
        use: [miniCssLoader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  {
    test: /\.less$/,
    exclude: [/node_modules/, /public/],
    oneOf: [
      {
        resourceQuery: /css-modules/,
        use: [miniCssLoader, cssModulesLoader, 'postcss-loader', 'less-loader']
      },
      {
        use: [miniCssLoader, 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024 // 小于10kb转base64位
      }
    },
    generator: {
      filename: 'static/images/[name][ext]' // 文件输出目录和命名
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024 // 小于10kb转base64位
      }
    },
    generator: {
      filename: 'static/medias/[name][ext]' // 文件输出目录和命名
    }
  },
  { test: /\.svg$/i, type: 'asset' },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024 // 小于10kb转base64位
      }
    },
    generator: {
      filename: 'static/fonts/[name][ext]' // 文件输出目录和命名
    }
  },
  {
    test: /\.txt/,
    type: 'asset/source',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024 // 小于10kb转base64位
      }
    },
    generator: {
      filename: 'static/texts/[name][ext]' // 文件输出目录和命名
    }
  }
]
