'use strict'

const { Model, DataTypes } = require('sequelize')

class IP_Addresses extends Model { }

IP_Addresses.initialize = function (sequelize) {
    IP_Addresses.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        firstPingDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        lastPingDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        intern: { type: DataTypes.BOOLEAN, allowNull: false, unique: false },
        country: { type: DataTypes.TEXT, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'IP_Addresses'
        })
}

module.exports = IP_Addresses