'use strict'

const sequelize = require('../constants/sequelize')
const Client = require('../models/Client')
const Command = require('../models/Command')
const IP_Address = require('../models/IP_Address')
const Keylog = require('../models/Keylog')
const Role = require('../models/Role')
const Screenshot = require('../models/Screenshot')
const User = require('../models/User')


const databaseLoader = async () => {

    const models = [
        Client,
        Command,
        IP_Address,
        Keylog,
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