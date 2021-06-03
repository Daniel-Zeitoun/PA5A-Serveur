'use strict'

const Client = require('../models/Client')
const Keylog = require('../models/Keylog')
const { QueryTypes, col, json } = require('sequelize')

const clientDao = {

    findOneById: async function (id) {

        const sql = `SELECT * FROM "${Client.tableName}" WHERE id = '${id}'`

        const client = await Client.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: Client
        })

        return client
    },



    findOneByUuid: async function (uuid) {

        const client = await Client.findOne({
            where: {
                uuid: uuid
            }
        })
        return client
    },
    insertOne: async function ({ uuid, computerName }) {

        const client = await Client.create({
            uuid: uuid,
            computerName: computerName
        })
        return client
    },
    updateOne: async function ({ uuid, computerName }) {

        const client = await Client.update(
            { uuid: uuid, computerName: computerName },
            { where: { uuid: uuid }, returning: true, plain: true }
        )
        return client
    },




    insertLogs: async function (clientId, jsonData) {

        const logs = await Keylog.create({
            jsonData: jsonData,
            fk_clientId: clientId
        })
        return logs.dataValues
    }
}

module.exports = clientDao