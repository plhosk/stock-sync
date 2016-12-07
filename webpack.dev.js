const path = require('path')
const webpack = require('webpack') // eslint-disable-line

// const srcPath = path.join(__dirname, '/app')
const buildPath = path.join(__dirname, '/public')

const config = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './app/App.jsx',
  ],
  output: {
    path: buildPath,
    pathinfo: true,
    filename: './bundle.js',
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
        exclude: /(node_modules)/,
        // include: srcPath,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // eslint-disable-line
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval',
}

module.exports = config
