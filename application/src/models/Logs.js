'use strict'

const { Model, DataTypes } = require('sequelize')

class Logs extends Model { }

Logs.initialize = function (sequelize) {
    Logs.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        jsonData: { type: DataTypes.JSON, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'Logs'
        })
}

module.exports = Logs