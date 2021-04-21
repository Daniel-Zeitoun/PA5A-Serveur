'use strict'

const express = require('express')
const createHttpError = require('http-errors')

const router = express.Router()

router.use((req, res, next) => {
    res.locals.documentBase = `${req.protocol}://${req.hostname}/`
    next()
})

router.get('/', (req, res, next) => {
    res.render('pages/index')
})

router.get('/login', (req, res, next) => {
    res.render('pages/login')
})

router.get('/logout', (req, res, next) => {
    res.render('pages/logout')
})

module.exports = router