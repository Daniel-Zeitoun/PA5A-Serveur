'use strict'

const Client = require('../models/Client')
const clientDao = require('../dao/clientDao')
//const { now } = require('sequelize/types/lib/utils')

const clientService = {
    
    createOrUpdate: async function (uuid) {
        
        // Call the DAO to find if a user exists or not
        const client = await clientDao.findOneByUuid(uuid)

        // If he doesn't exist, then we create it
        if (!(client instanceof Client)) {
            return this.create()
        }
        
        // If he does exist, then we update it
        return this.update(client)
    },
    create: async function () {
        
        const client = await clientDao.insertOne()
        
        return client
    },
    update: async function (client) {
        
        // Do updating operations ...
        
        return client
    }
}

module.exports = clientService