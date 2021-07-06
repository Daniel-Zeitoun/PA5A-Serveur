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
    insertOne: async function ({ ipAddress, isPrivate, lastPing, country, clientId }) {

        const ip_address = await IP_Address.create({
            ipAddress: ipAddress,
            isPrivate: isPrivate,
            lastPing: lastPing,
            country: country,
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
    },
    findLastPublicIPByClientId: async function (clientId) {

        const ip_address = await IP_Address.findOne({
            where: {
                [Op.and]: [
                    { isPrivate: false },
                    { clientId: clientId }
                ]
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        })
        return ip_address
    }
}

module.exports = ipAddressDao