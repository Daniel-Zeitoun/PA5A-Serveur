'use strict'

const express = require('express')
const path = require('path')
const api = require('./controllers/api')
const front = require('./controllers/front')

const app = express()
const port = 80
const rootDir = path.resolve(__dirname)

for (const [key, value] of Object.entries({
    'view engine': 'ejs',
    'views': path.resolve(rootDir, 'views'),
    'x-powered-by': false
})) app.set(key, value)

for (const [key, value] of Object.entries({
    '/api': api,
    '/app': front,
    '/static': express.static(path.join(rootDir, 'static'))
})) app.use(key, value)

app.get('*', (req, res) => {
    res.status(302).redirect('/app')
})

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`)
})