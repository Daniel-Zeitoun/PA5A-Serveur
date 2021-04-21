'use strict'

const { Model, DataTypes } = require('sequelize')

class Log extends Model { }

Log.initialize = function (sequelize) {
    Log.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        jsonData: { type: DataTypes.JSON, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'Log'
        })
}

Log.associate = function (models) {
    
    Log.belongsTo(models.Client, {
        foreignKey: 'clientId'
    })
}

module.exports = Log