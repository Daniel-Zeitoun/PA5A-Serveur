'use strict'

const User = require('../models/User')
const { QueryTypes } = require('sequelize')

const userDao = {

    findOneById: async function (id) {

        const user = await User.findOne({
            where: {
                id: id
            }
        })
        
        return user
    },
    findOneByUsername: async function (username) {

        const user = await User.findOne({
            where: {
                username: username
            }
        })
        return user
    },
    insertOne: async function ({ username, password }) {

        const user = await User.create({
            username: username,
            password: password
        })
        return user
    }
}

module.exports = userDao