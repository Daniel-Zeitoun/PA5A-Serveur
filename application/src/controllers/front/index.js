'use strict'

const express = require('express')
const escapingFunctions = require('../middlewares/escaping')
const createHttpError = require('http-errors')
const User = require('../../models/User')

const router = express.Router()
router.use(escapingFunctions)

router.use((req, res, next) => {
    res.locals.documentBase = `${req.protocol}://${req.hostname}/`
    next()
})

router.get('/', (req, res, next) => {

    if (typeof req.session.user === 'undefined' || req.session.user === null) {
        res.render('pages/login')
    }
    else {
        res.render('pages/index', { ...res.locals.connectedUser })
    }
})

router.get('/logout', (req, res, next) => {
    res.render('pages/logout')
})

module.exports = router