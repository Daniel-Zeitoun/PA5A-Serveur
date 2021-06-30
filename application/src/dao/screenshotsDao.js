'use strict'

const Client = require('../models/Client')
const Screenshot = require('../models/Screenshot')
const { QueryTypes, col, json, Sequelize } = require('sequelize')

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
    },
    getDataDashboard: async function () {
        const screenshots = await Screenshot.findAll({
            attributes: [
                'id',
                [Sequelize.col('createdAt'), 'date']
            ],
            order: [
                ['id', 'ASC']
            ]
        })
        
        return screenshots
    }
}

module.exports = screenshotsDao