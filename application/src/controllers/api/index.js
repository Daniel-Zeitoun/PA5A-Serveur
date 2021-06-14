'use strict'

const express = require('express')
const router = express.Router()
const createHttpError = require('http-errors')

const clientsApi = require('./clients')
const authApi = require('./auth')


router.use('/clients', clientsApi)
router.use('/auth', authApi)

//Page not found
router.all('*', (req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'))
})

//Error handler
router.use((err, req, res, next) => {

    if (createHttpError.isHttpError(err)) {
        res.status(err.statusCode).json({
            error: err.expose ? err.message : 'Internal server error'
        })

        return
    }
    if (err instanceof Error) {
        res.status(500).json({
            error: err.message
        })
        return
    }

    res.status(500).json({
        error: 'Internal server error'
    })
})
module.exports = router
