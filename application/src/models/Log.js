'use strict'

const { Model, DataTypes } = require('sequelize')

class Log extends Model { }

Log.initialize = function (sequelize) {
    Log.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        jsonData: { type: DataTypes.JSON, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'Log'
        })
}

module.exports = Log