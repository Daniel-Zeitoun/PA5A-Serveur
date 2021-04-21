'use strict'

const { Model, DataTypes } = require('sequelize')

class IP_Address extends Model { }

IP_Address.initialize = function (sequelize) {
    IP_Address.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        firstPingDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        lastPingDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        intern: { type: DataTypes.BOOLEAN, allowNull: false, unique: false },
        country: { type: DataTypes.TEXT, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'IP_Address'
        })
}

IP_Address.associate = function (models) {
    
    IP_Address.belongsTo(models.Client, {
        foreignKey: 'clientId'
    })
}

module.exports = IP_Address