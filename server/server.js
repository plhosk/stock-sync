require('es6-promise').polyfill()
require('isomorphic-fetch')
require('dotenv').config()
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIo(server)

const oneDay = 1000 * 60 * 60 * 24

app.use(favicon(path.join(__dirname, '/../public/favicon.ico')))

function getStaticAssets() {
  return (process.env.NODE_ENV !== 'production')
    ? require('./hot-reload') // eslint-disable-line
    : express.static('public', { maxAge: oneDay })
}
app.use(getStaticAssets())
app.use('/', express.static('public', { maxAge: oneDay }))


console.log(`NODE_ENV=${process.env.NODE_ENV}`) //eslint-disable-line

app.set('port', process.env.PORT || 3000)

server.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port')) // eslint-disable-line
})

// Handle redux actions through socket connection
const chartsReducer = require('./serverChartsReducer')
const log = require('debug')('chart-sync-socket')

const initialState = {
  byId: {},
  allIds: [],
}
let state = initialState

io.on('connection', (socket) => {
  log(`Socket connected: ${socket.id}`)
  socket.on('action', (action) => {
    log(`received action: ${action.type}`)
    state = chartsReducer(state, action, io)
    io.emit('action', {
      type: 'CHARTS_REPLACE_ALL',
      payload: state,
    })
  })
})
