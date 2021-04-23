'use strict'

const Client = require('../models/Client')
const { QueryTypes } = require('sequelize')

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

        const sql = `SELECT * FROM "${Client.tableName}" WHERE uuid = '${uuid}'`

        const client = await Client.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: Client
        })

        return client
    },

    insertOne: async function ({ uuid }) {

        const sql = `INSERT INTO "${Client.tableName}" (uuid, createdAt, updatedAt) ` +
            `VALUES ('${uuid}', now(), now())`

        await Client.sequelize.query(sql, {
            type: QueryTypes.INSERT
        })
    },
}

module.exports = clientDao