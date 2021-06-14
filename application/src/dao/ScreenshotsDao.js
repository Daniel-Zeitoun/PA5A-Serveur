'use strict'

const Client = require('../models/Client')
const Screenshot = require('../models/Screenshot')
const { QueryTypes, col, json } = require('sequelize')

const screenshotsDao = {
    insertOne: async function (clientId, { filename }) {

        const screenshot = await Screenshot.create({
            clientId: clientId,
            filename: path
        })
        return screenshot
    }
}

module.exports = screenshotsDao