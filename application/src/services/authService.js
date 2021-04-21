'use strict'

const User = require('../models/User')
const userDao = require('../dao/userDao')
const crypto = require('crypto')
const { now } = require('sequelize/types/lib/utils')

const authService = {

    login: async function ({ username, password }) {

        const user = await userDao.findOneByUsername(username)

        if (!(user instanceof User))
            return null

        const hash = crypto.createHash('sha256')
        hash.update(password)

        if (hash.digest('hex') !== user.password)
            return null

        user.lastLogin = now()
        user.save()

        return user
    }
}

module.exports = authService