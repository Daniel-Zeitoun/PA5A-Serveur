'use strict'

const path = require('path')
const fs = require('fs');
const http = require('http')
const https = require('https')
const express = require('express')
const api = require('../controllers/api')
const front = require('../controllers/front')

const sequelize = require('../constants/sequelize')

const app = express()
const rootDir = path.resolve(__dirname)

const key = fs.readFileSync(path.join(rootDir, '../key.pem'))
const cert = fs.readFileSync(path.join(rootDir, '../cert.pem'))

const httpsServer = https.createServer({ key: key, cert: cert }, app)
const httpServer = http.createServer(app);

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