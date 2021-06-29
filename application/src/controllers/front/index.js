'use strict'

const express = require('express')
const escapingFunctions = require('../middlewares/escaping')
const createHttpError = require('http-errors')
const User = require('../../models/User')

const router = express.Router()
const victims = require('./victims')
const cmd = require('./command')


router.use(escapingFunctions)

// No matter the URL, if we are not connected, the login page is returned
router.use((req, res, next) => {
    if ((typeof req.session.user === 'undefined' || req.session.user === null) && req.path !== '/login') {
        res.redirect('/app/login')
    }
    else {
        next()
    }
})


router.use('/victims', victims)
router.use('/command', cmd)

router.use((req, res, next) => {
    res.locals.documentBase = `${req.protocol}://${req.hostname}/`
    next()
})


router.get('/', (req, res, next) => {
    res.render('pages/index', { ...res.locals.connectedUser })
})

/*
router.get('/', (req, res, next) => {
    if (typeof req.session.user === 'undefined' || req.session.user === null) {
        res.render('pages/login')
    }
    else {
        res.render('pages/index', { ...res.locals.connectedUser })
    }
})
*/

router.get('/login', (req, res, next) => {
    res.render('pages/login')
})

router.get('/logout', (req, res, next) => {
    res.render('pages/logout')
})

router.get('/about', (req, res, next) => {
    res.render('pages/about')
})


module.exports = router