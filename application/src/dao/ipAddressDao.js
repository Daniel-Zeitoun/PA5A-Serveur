'use strict'

const IP_Address = require('../models/IP_Address')
const { Op } = require('sequelize')

const ipAddressDao = {
    findAllByClientId: async function (clientId) {

        const ip_addresses = await IP_Address.findAll({
            where: {
                clientId: clientId
            }
        })
        return ip_addresses
    },
    findOneByIPAndClientId: async function (ip, clientId) {

        const ip_address = await IP_Address.findOne({
            where: {
                [Op.and]: [
                    { ipAddress: ip },
                    { clientId: clientId }
                ]
            }
        })

        return ip_address
    },
    insertOne: async function ({ ipAddress, isPrivate, lastPing, clientId }) {

        const ip_address = await IP_Address.create({
            ipAddress: ipAddress,
            isPrivate: isPrivate,
            lastPing: lastPing,
            clientId: clientId
        })
        return ip_address
    },
    updateOneByIPAndClientId: async function ({ ipAddress, lastPing, clientId }) {

        const ip_address = await IP_Address.update({
            lastPing: lastPing
        },
            {
                where: {
                    [Op.and]: [
                        { ipAddress: ipAddress },
                        { clientId: clientId }
                    ]
                },
                returning: true,
                plain: true
            }
        )
        return ip_address
    },
    getAll: async function () {
        const ip_addresses = await IP_Address.findAll({
            order: [
                ['id', 'ASC']
            ]
        })

        return ip_addresses
    }
}

module.exports = ipAddressDao