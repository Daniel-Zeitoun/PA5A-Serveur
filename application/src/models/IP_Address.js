'use strict'

const { Model, DataTypes } = require('sequelize')

class IP_Address extends Model { }

IP_Address.initialize = function (sequelize) {
    IP_Address.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        ipPublic: { type: DataTypes.INET, allowNull: false, unique: false },
        ipPrivate: { type: DataTypes.INET, allowNull: false, unique: false },
        fk_clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        firstPingDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        lastPingDate: { type: DataTypes.DATE, allowNull: false, unique: false },
        country: { type: DataTypes.TEXT, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'IP_Address'
        })
}

IP_Address.associate = function (models) {

    IP_Address.belongsTo(models.Client, {
        foreignKey: 'fk_clientId'
    })
}

module.exports = IP_Address