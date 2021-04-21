'use strict'

const User = require('../models/User')
const { QueryTypes } = require('sequelize')

const userDao = {

    findOneById: async function (id) {

        const sql = `SELECT * FROM ${User.tableName} WHERE id = "${id}"`

        const user = await User.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: User
        })

        return user
    },

    findOneByUsername: async function (username) {

        const sql = `SELECT * FROM ${User.tableName} WHERE username = "${username}"`

        const user = await Users.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            plain: true,
            mapToModel: true,
            model: User
        })

        return user
    },

    insertOne: async function ({ id, username, password }) {

        const sql = `INSERT INTO ${User.tableName} (username, password, createdAt, updatedAt) ` +
            `VALUES ("${username}", "${password}", now(), now())`

        await User.sequelize.query(sql, {
            type: QueryTypes.INSERT
        })
    },
}

module.exports = userDao