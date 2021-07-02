'use strict'

const express = require('express')
const escapingFunctions = require('../middlewares/escaping')
const router = express.Router()
const clientService = require('../../services/clientService')


router.get('/shell/:uuid', async (req, res, next) => {
    try {
        const clients = await clientService.getAll()

        //res.locals.clients = clients
        //console.log(res.locals.clients)

        res.render('pages/reverse_shell')
    } catch (e) { next(e) }
})

module.exports = router