'use strict'

const { Model, DataTypes } = require('sequelize')

class Command extends Model { }

Command.initialize = function (sequelize) {
    Command.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        commandName: { type: DataTypes.TEXT, allowNull: false, unique: false },
        pending: { type: DataTypes.BOOLEAN, allowNull: false, unique: false },
        fk_clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        fk_userId: { type: DataTypes.INTEGER, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Command'
        })
}

Command.associate = function (models) {

    Command.belongsTo(models.Client, {
        foreignKey: 'fk_clientId'
    })

    Command.belongsTo(models.User, {
        foreignKey: 'fk_userId'
    })
}

module.exports = Command