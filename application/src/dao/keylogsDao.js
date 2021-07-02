'use strict'

const Keylog = require('../models/Keylog')
const { QueryTypes, col, json, Sequelize } = require('sequelize')

const keylogsDao = {
    insertOne: async function ({clientId, datetime, path, application, logs }) {

        const keylogs = await Keylog.create({
            clientId: clientId,
            datetime: datetime,
            path: path,
            application: application,
            logs: logs
        })
        return keylogs
    },
    findAllByClientId: async function (clientId) {
        const keylogs = await Keylog.findAll({
            where: { clientId: clientId },
            order: [
                ['id', 'DESC']
            ]
        })
        
        return keylogs
    },
    getDataDashboard: async function () {
        const keylogs = await Keylog.findAll({
            attributes: [
                [Sequelize.fn('count', Sequelize.col('id')), 'nb'],
                [Sequelize.fn('to_char', Sequelize.col('datetime'), 'yyyy-mm-dd'), 'date']
            ],
            group: ['date'],
            order: [
                [Sequelize.fn('to_char', Sequelize.col('datetime'), 'yyyy-mm-dd'), 'ASC']
            ]
        })
        
        return keylogs
    }
}

module.exports = keylogsDao