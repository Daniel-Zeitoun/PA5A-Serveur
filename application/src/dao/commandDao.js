'use strict'

const Command = require('../models/Command')
const Client = require('../models/Client')
const { QueryTypes } = require('sequelize')
const commandService = require('../services/commandService')

const commandDao = {

    findPendingCommandsByClientId: async function (clientId) {
        const commands = await Command.findAll({
            where: {
                clientId: clientId,
                pending: true
            }
        })
        return commands
    },
    insertOne: async function ({ clientId, name }) {

        const command = await Command.create({
            name: name,
            pending: true,
            clientId: clientId
        })
        return command
    },
    updateOneById: async function (id) {

        const command = await Command.update({
            pending: false
        },
            {
                where: { id: id },
                returning: true,
                plain: true
            }
        )
        return command
    }
}

module.exports = commandDao