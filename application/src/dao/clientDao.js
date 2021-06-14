'use strict'

const Client = require('../models/Client')
const Keylog = require('../models/Keylog')
const { QueryTypes, col, json } = require('sequelize')

const clientDao = {
    findOneById: async function (id) {

        const client = await Client.findOne({
            where: {
                id: id
            }
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
    updateOneByUuid: async function ({ uuid, computerName }) {

        const client = await Client.update({
            uuid: uuid,
            computerName: computerName
        },
            {
                where: { uuid: uuid },
                returning: true,
                plain: true
            }
        )
        return client
    },
    getAll: async function () {

        const clients = await Client.findAll()
        return clients
    }
}

module.exports = clientDao