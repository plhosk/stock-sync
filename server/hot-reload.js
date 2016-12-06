/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const express = require('express')
const webpackMiddleware = require('webpack-dev-middleware')
const debug = require('debug')

const webpackConfig = require('../webpack.dev')

const log = {
  pack: debug('webpack'),
  hot: debug('hot-reload'),
}

const compiler = webpack(webpackConfig)

const hotRouter = new express.Router()

hotRouter.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    reasons: false,
  },
}))

hotRouter.use(require('webpack-hot-middleware')(compiler, {
  log: log.pack,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}))

module.exports = hotRouter
