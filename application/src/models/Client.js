'use strict'

const { Model, DataTypes } = require('sequelize')

class Client extends Model { }

Client.initialize = function (sequelize) {
    Client.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        uuid: { type: DataTypes.UUID, allowNull: false, unique: true },
        pcName: { type: DataTypes.TEXT, allowNull: false, unique: false },
        lastPing: { type: DataTypes.DATE, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'Client',
            tableName: 'Clients'
        })
}

Client.associate = function (models) {

    Client.hasMany(models.IP_Address, { foreignKey: 'fk_client' })
    Client.hasMany(models.Log, { foreignKey: 'fk_client' })
    Client.hasMany(models.Screenshot, { foreignKey: 'fk_client' })
    Client.hasMany(models.Command, { foreignKey: 'fk_client' })
}

module.exports = Client