'use strict'

const IP_Address = require('../models/IP_Address')
const ipAddressDao = require('../dao/ipAddressDao')
//const { now } = require('sequelize/types/lib/utils')

const ipAddressService = {

    createOrUpdate: async function ({ ip, clientId }) {
       
        // Call the DAO to find if a user exists or not
        const ip_address = await ipAddressDao.findOneByIPAndClientId(ip, clientId)
        
        // If he doesn't exist, then we create it
        if (!(ip_address instanceof IP_Address)) {
            return { isNewIP: true, ip_address: await this.create({ ip, clientId }) }
        }

        // If he does exist, then we update it
        return { isNewIP: false, ip_address: await this.update({ ip, clientId }) }
    },
    create: async function ({ ip, clientId }) {

        const ip_address = await ipAddressDao.insertOne({
            ipAddress: ip,
            isPrivate: false,
            lastPing: Date.now(),
            clientId: clientId
        })
        return ip_address
    },
    update: async function ({ ip, clientId }) {

        const ip_address = await ipAddressDao.updateOneByIPAndClientId({
            ipAddress: ip,
            lastPing: Date.now(),
            clientId: clientId
        })
        return ip_address
    },
    getAll: async function () {

        const ip_addresses = await ipAddressDao.getAll()
        return ip_addresses
    },
    findAllByClientId: async function (clientId) {

        const ip_addresses = await ipAddressDao.findAllByClientId(clientId)
        return ip_addresses
    },
    findOnebyIPAndClientId: async function (ip, clientId) {

        const ip_address = await ipAddressDao.findOnebyIPAndClientId(ip, clientId)
        return ip_address
    }
}

module.exports = ipAddressService