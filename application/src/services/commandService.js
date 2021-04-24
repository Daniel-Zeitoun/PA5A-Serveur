'use strict'

const Command = require('../models/Command')
const commandDao = require('../dao/commandDao')
//const { now } = require('sequelize/types/lib/utils')

const commandService = {
    
    getCommands: async function (uuid) {

        //Appeler la couche DAO pour voir les commandes en attente pour le UUID
        return commandDao.findPendingCommandsByUuid(uuid)
    },
    addCommand: async function (uuid, cmd) {

        // Permet d'ajouter une commande à la liste des commandes en attente

        // Check si déjà une commande en attente (keylogs)
        const commands = commandDao.findPendingCommandsByUuid(uuid)

        // Si oui, alors message erreur sur le front 
        if (commands.includes(cmd))
            return null
        // Si non, on ajoute à la liste d'attente
        return commandDao.insertOne()
    }
}

module.exports = commandService