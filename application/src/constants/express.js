'use strict'

const path = require('path')
const fs = require('fs');
const http = require('http')
const https = require('https')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const SessionStore = require('connect-session-sequelize')(session.Store)
const api = require('../controllers/api')
const front = require('../controllers/front')
const sequelize = require('../constants/sequelize')
const deserializeUser = require('../controllers/middlewares/deserializeUser')
const WebSocket = require('ws')
const url = require('url')

const app = express()

const rootDir = path.resolve(__dirname)

const key = fs.readFileSync('/certs/server.key')
const cert = fs.readFileSync('/certs/server.cert')

//const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: key,
    cert: cert
}, app)

//expressWs(app, httpServer)
//expressWs(app, httpsServer)

/*const wsServer = new WebSocket.Server({
    server: httpsServer,
    path: '/rsfront',
    clientTracking: true,
    maxReceivedFrameSize: 131072,
    maxReceivedMessageSize: 10 * 1024 * 1024,
    autoAcceptConnections: false
})*/

const store = new SessionStore({
    db: sequelize
})
app.use(session({
    resave: false,
    saveUninitialized: true,
    store,
    secret: 'this should be in .env and kept secret',
    httpOnly: true
}))
app.use(deserializeUser)
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.text({ limit: '100mb' }))

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

/*httpServer.get('*', function (req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})*/

app.all('*', (req, res, next) => res.redirect('/app'))


// --------------------------------------------------
// WEBSOCKET SERVER
// --------------------------------------------------
const wsServerFront = new WebSocket.Server({ noServer: true });
const wsServerClient = new WebSocket.Server({ noServer: true });

module.exports = {
    //httpServer,
    httpsServer,
    wsServerFront,
    wsServerClient
}