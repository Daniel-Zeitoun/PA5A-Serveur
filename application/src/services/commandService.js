'use strict'

const Command = require('../models/Command')
const commandDao = require('../dao/commandDao')
const clientDao = require('../dao/clientDao')
const clientService = require('./clientService')
//const { now } = require('sequelize/types/lib/utils')

const commandService = {

    getCommands: async function (uuid) {

        //Appeler la couche DAO pour voir les commandes en attente pour le UUID
        return await commandDao.findPendingCommandsByUuid(uuid)
    },
    addCommand: async function (uuid, cmd) {

        // Permet d'ajouter une commande à la liste des commandes en attente

        const commands = await commandDao.findPendingCommandsByUuid(uuid)
        let alreadyExists = false

        commands.forEach(element => {
            console.log(element + " == " + cmd)
            if (element === cmd) {
                alreadyExists = true
            }
        });
        if (alreadyExists) {
            console.log("Command already exists")
            return { isAdded: false }
        }

        const client = await clientDao.findOneByUuid(uuid)

        console.log(uuid)
        const command = await commandDao.insertOne(client.dataValues.id, cmd)
        return { isAdded: true, data: command }
    }
}

module.exports = commandService