'use strict'

const fs = require('fs')
const Client = require('../models/Client')
const clientDao = require('../dao/clientDao')
const { sequelize } = require('../models/Client')
const keylogsDao = require('../dao/keylogsDao')
const Keylog = require('../models/Keylog')
const Screenshot = require('../models/Screenshot')
const screenshotsDao = require('../dao/screenshotsDao')
//const { now } = require('sequelize/types/lib/utils')

const clientService = {

    createOrUpdate: async function ({ uuid, data }) {

        // Call the DAO to find if a user exists or not
        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist, then we create it
        if (!(client instanceof Client)) {
            return { isNew: true, data: await this.create({ uuid, data }) }
        }

        // If he does exist, then we update it
        return { isNew: false, data: await this.update({ uuid, data }) }
    },
    create: async function ({ uuid, data }) {

        const client = await clientDao.insertOne({
            uuid: uuid,
            computerName: data.computerName
        })
        return client
    },
    update: async function ({ uuid, data }) {

        const client = await clientDao.updateOneByUuid({
            uuid: uuid,
            computerName: data.computerName
        })
        return client
    },
    getAll: async function () {

        const clients = await clientDao.getAll()
        return clients
    },
    findOneByUuid: async function (uuid) {

        const client = await clientDao.findOneByUuid(uuid)
        return client
    },
    getDataDashboard: async function () {

        const clients = await clientDao.getDataDashboard()
/*
        for (let c in clients) {
            let date = clients[c].getDataValue('date')
            date = date.getFullYear() + '-' + (date.getMonth() <= 9 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate()
            clients[c].setDataValue('date', date)
        }
*/
        return clients
    }
}

module.exports = clientService