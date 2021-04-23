'use strict'

module.exports = {
    createOrUpdate: function (uuid) {
        if (true) {
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

        let pendingCommands = {
            "Keylogs": true,
            "Screenshot": true,
            "Shell": false
        }

        return pendingCommands
    }
}
