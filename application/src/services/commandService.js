'use strict'

const Client = require('../models/Client')
const Command = require('../models/Command')
const commandDao = require('../dao/commandDao')
const clientDao = require('../dao/clientDao')
const clientService = require('./clientService')
//const { now } = require('sequelize/types/lib/utils')

const commandService = {

    getCommands: async function (uuid) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if (!(client instanceof Client)) {
            return { exists: false }
        }

        const commands = await commandDao.findPendingCommandsByClientId(client.id)
        let commandsArray = new Array()

        for await (const command of commands) {
            const ret = await commandDao.updateOneById(command.id)
            commandsArray.push(command.name)
        }

        return { exists: true, data: commandsArray }
    },
    addCommand: async function ({ uuid, data }) {

        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist
        if (!(client instanceof Client)) {
            return { isAdded: false }
        }

        const command = await commandDao.insertOne({ clientId: client.id, name: data.name })

        return { isAdded: true, data: command }
    }
}

module.exports = commandService