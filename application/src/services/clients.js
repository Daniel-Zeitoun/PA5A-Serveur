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
    }
}