'use strict'

const Command = require('../models/Command')
const Client = require('../models/Client')
const { QueryTypes } = require('sequelize')
const commandService = require('../services/commandService')

const commandDao = {

    findPendingCommandsByUuid: async function (uuid) {
        const commands = await Command.findAll({
            include: [{
                model: Client,
                where: { uuid: uuid },
                required: true
            }]
        })

        let commandsArray = new Array
        commands.forEach(element => {
            commandsArray.push(element.commandName)
        });

        return commandsArray
    },

    insertOne: async function (clientId, commandName) {

        const command = await Command.create({
            commandName: commandName,
            pending: true,
            fk_client: clientId
        })

        return command.dataValues

        /*
                const sql = `INSERT INTO "${Command.tableName}" (commandName, pending, fk_clientId, fk_userId, createdAt, updatedAt) ` +
                    `VALUES ('${commandName}', true, '${fk_clientId}', '${fk_userId}' now(), now())`
        
                await Command.sequelize.query(sql, {
                    type: QueryTypes.INSERT
                })*/
    },
}

module.exports = commandDao