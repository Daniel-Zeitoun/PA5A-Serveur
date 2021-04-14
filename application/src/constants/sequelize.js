'use strict'

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('pa5a', 'postgres', 'pa5a', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
    logging: false,
    dialectOptions: {
        multipleStatements: true
    }
})

module.exports = sequelize