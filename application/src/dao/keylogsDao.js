'use strict'

const Keylog = require('../models/Keylog')
const { QueryTypes, col, json } = require('sequelize')

const keylogsDao = {
    insertOne: async function ({ clientId, jsonData }) {

        const keylogs = await Keylog.create({
            jsonData: jsonData,
            fk_clientId: clientId
        })
        return keylogs
    }
}

module.exports = keylogsDao