'use strict'

const Client = require('../models/Client')
const Screenshot = require('../models/Screenshot')
const { QueryTypes, col, json } = require('sequelize')

const screenshotsDao = {
    insertOne: async function ({ clientId, filename }) {

        const screenshot = await Screenshot.create({
            filename: filename,
            fk_clientId: clientId
        })
        return screenshot
    }
}

module.exports = screenshotsDao