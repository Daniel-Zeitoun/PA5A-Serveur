'use strict'

const Keylog = require('../models/Keylog')
const { QueryTypes, col, json } = require('sequelize')

const keylogsDao = {
    insertOne: async function ({clientId, datetime, path, application, logs }) {

        const keylogs = await Keylog.create({
            clientId: clientId,
            datetime: datetime,
            path: path,
            application: application,
            logs: logs
        })
        return keylogs
    }
}

module.exports = keylogsDao