'use strict'

const { Model, DataTypes } = require('sequelize')

class Client extends Model { }

Client.initialize = function (sequelize) {
    Client.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        uuid: { type: DataTypes.UUID, allowNull: false, unique: true },
        pcName: { type: DataTypes.TEXT, allowNull: false, unique: false },
        createdDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        lastPingDate: { type: DataTypes.DATE, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'Client'
        })
}

Client.associate = function (models) {
    
    Client.hasMany(models.IP_Address, {
        foreignKey: 'clientId'
    })

    Client.hasMany(models.Log, {
        foreignKey: 'clientId'
    })

    Client.hasMany(models.Screenshot, {
        foreignKey: 'clientId'
    })
}

module.exports = Client