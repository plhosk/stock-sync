const path = require('path')
const webpack = require('webpack') // eslint-disable-line

const srcPath = path.join(__dirname, '/app')
const buildPath = path.join(__dirname, '/public')

const prod = process.argv.indexOf('-p') !== -1

const config = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './app/App.jsx',
  ],
  output: {
    path: buildPath,
    filename: './bundle.js',
    // publicPath: 'http://localhost:8080/',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // exclude: /(node_modules)/,
        include: srcPath,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['es2015', { modules: false }], 'stage-0', 'react'],
            plugins: ['react-hot-loader/babel'],
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          configFile: './.eslintrc.json',
        },
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  plugins: [],
}

if (prod) {
  // config.devtool = 'cheap-module-source-map'

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // eslint-disable-line
    }))
} else {
  // config.devtool = 'inline-source-map'
  config.devtool = 'eval'

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(''), // eslint-disable-line
    }))
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
