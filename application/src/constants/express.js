'use strict'

const path = require('path')
const fs = require('fs');
const http = require('http')
const https = require('https')
const express = require('express')
const session = require('express-session')
const SessionStore = require('connect-session-sequelize')(session.Store)
const api = require('../controllers/api')
const front = require('../controllers/front')
const sequelize = require('../constants/sequelize')
const deserializeUser = require('../controllers/middlewares/deserializeUser')

const app = express()
const rootDir = path.resolve(__dirname)

const key = fs.readFileSync('/certs/server.key')
const cert = fs.readFileSync('/certs/server.cert')

const httpsServer = https.createServer({ key: key, cert: cert }, app)
const httpServer = http.createServer(app);

const store = new SessionStore({
    db: sequelize
})
app.use(session({
    resave: false,
	saveUninitialized: true,
    store,
    secret: 'this should be in .env and kept secret'
}))
app.use(deserializeUser)

for (const [key, value] of Object.entries({
    'view engine': 'ejs',
    'views': path.resolve(rootDir, '../views'),
    'x-powered-by': false
})) app.set(key, value)

for (const [key, value] of Object.entries({
    '/api': api,
    '/app': front,
    '/static': express.static(path.join(rootDir, '../static'))
})) app.use(key, value)

app.all('*', (req, res, next) => res.redirect('/app'))

module.exports = {
    httpServer,
    httpsServer
}