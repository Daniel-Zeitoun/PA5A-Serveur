'use strict'

const Client = require('../models/Client')
const Screenshot = require('../models/Screenshot')
const { QueryTypes, col, json } = require('sequelize')

const screenshotsDao = {
    insertOne: async function ({ clientId, filename }) {

        const screenshot = await Screenshot.create({
            clientId: clientId,
            filename: filename
        })
        return screenshot
    },
    findAllByClientId: async function (clientId) {
        const screenshots = await Screenshot.findAll({
            where: { clientId: clientId },
            order: [
                ['id', 'DESC']
            ]
        })
        
        return screenshots
    }
}

module.exports = screenshotsDao