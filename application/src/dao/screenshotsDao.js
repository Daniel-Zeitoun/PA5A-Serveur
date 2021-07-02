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
                [Sequelize.fn('count', Sequelize.col('id')), 'nb'],
                [Sequelize.fn('to_char', Sequelize.col('createdAt'), 'yyyy-mm-dd'), 'date']
            ],
            group: ['date'],
            order: [
                [Sequelize.fn('to_char', Sequelize.col('createdAt'), 'yyyy-mm-dd'), 'ASC']
            ]
        })
        
        return screenshots
    }
}

module.exports = screenshotsDao