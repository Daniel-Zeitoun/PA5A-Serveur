'use strict'

const { Model, DataTypes } = require('sequelize')

class IP_Address extends Model { }

IP_Address.initialize = function (sequelize) {
    IP_Address.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        ipAddress: { type: DataTypes.INET, allowNull: false, unique: false },
        isPrivate: { type: DataTypes.BOOLEAN, allowNull: false, unique: false },
        firstPing: { type: DataTypes.DATE, allowNull: false, unique: false },
        lastPing: { type: DataTypes.DATE, allowNull: false, unique: false },
        country: { type: DataTypes.TEXT, allowNull: true, unique: false },
        fk_clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'IP_Address',
            tableName: 'IP_Addresses'
        })
}

IP_Address.associate = function (models) {

    IP_Address.belongsTo(models.Client, { foreignKey: 'fk_client' })
}

module.exports = IP_Address