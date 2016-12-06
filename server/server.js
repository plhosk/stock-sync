require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const path = require('path')
const favicon = require('serve-favicon')

const app = express()

app.use(favicon(path.join(__dirname, '/../public/favicon.ico')))

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)


app.set('port', process.env.PORT || 3000)


app.use(express.static('public'))


// handle api paths here
// app.use('/api/github', require('./api/github'))

// default route for single-page app
app.use('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port')) // eslint-disable-line
})
