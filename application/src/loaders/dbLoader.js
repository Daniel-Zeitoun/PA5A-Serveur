'use strict'

const sequelize = require('../constants/sequelize')
const Client = require('../models/Client')
const IP_Address = require('../models/IP_Address')
const Log = require('../models/Log')
const Role = require('../models/Role')
const Screenshot = require('../models/Screenshot')
const User = require('../models/User')

const databaseLoader = async () => {

    const models = [
        Client,
        IP_Address,
        Log,
        Role,
        Screenshot,
        User
    ]

    for (const model of models)
        if (typeof model.initialize === 'function')
            model.initialize(sequelize)

    for (const model of models)
        if (typeof model.associate === 'function')
            model.associate(Object.fromEntries(models.map(m => [m.name, m])))

    await sequelize.sync()
}

module.exports = databaseLoader