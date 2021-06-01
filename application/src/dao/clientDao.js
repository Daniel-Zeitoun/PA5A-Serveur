'use strict'

const Client = require('../models/Client')
const { QueryTypes, col } = require('sequelize')

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
    insertOne: async function ({ uuid, pcName }) {

        const client = await Client.create({
            uuid: uuid,
            pcName: pcName
        })
        return client.dataValues
    },
    updateOne: async function ({ uuid, pcName }) {

        const client = await Client.update(
            { uuid: uuid, pcName: pcName },
            { where: { uuid: uuid }, returning: true, plain: true }
        )
        return client[1].dataValues
    }
}

module.exports = clientDao