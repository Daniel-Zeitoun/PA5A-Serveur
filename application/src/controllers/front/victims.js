'use strict'

const express = require('express')
const escapingFunctions = require('../middlewares/escaping')
const router = express.Router()
const clientService = require('../../services/clientService')

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
        
        res.render('pages/single_victim', {single_client: single_client})
    } catch (e) { next(e) }
})

module.exports = router