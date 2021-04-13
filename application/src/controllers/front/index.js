'use strict'

const express = require('express')
const router = express.Router()
const createHttpError = require('http-errors')

router.get('/', (req, res, next) => {
    res.render('pages/index')
})

module.exports = router