const webpack = require('webpack') //eslint-disable-line
const path = require('path')

// const srcPath = path.join(__dirname, 'app');
const buildPath = path.join(__dirname, 'public')

const prod = process.argv.indexOf('-p') !== -1

const config = {
  entry: ['babel-polyfill', './app/App.jsx'],
  output: {
    path: buildPath,
    filename: 'bundle.js',
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
            presets: [['es2015', { modules: false }], 'react', 'stage-0'],
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
  },
  plugins: [
  ],
}

if (prod) {
  config.devtool = 'cheap-module-source-map'

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"production"` // eslint-disable-line
      },
    }))
} else {
  config.devtool = 'inline-source-map'

  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `""` // eslint-disable-line
    },
  }))
}

module.exports = config
