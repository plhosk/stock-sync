const path = require('path')
const webpack = require('webpack') // eslint-disable-line

// const srcPath = path.join(__dirname, '/app')
const buildPath = path.join(__dirname, '/public')

const config = {
  entry: [
    'babel-polyfill',
    './app/App.jsx',
  ],
  output: {
    path: buildPath,
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
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['es2015', { modules: false }], 'stage-0', 'react'],
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }],
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // eslint-disable-line
    }),
  ],
}

module.exports = config
