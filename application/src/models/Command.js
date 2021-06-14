'use strict'

const { Model, DataTypes } = require('sequelize')

class Command extends Model { }

Command.initialize = function (sequelize) {
    Command.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.TEXT, allowNull: false, unique: false },
        pending: { type: DataTypes.BOOLEAN, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Command',
            tableName: 'Commands'
        })
}

Command.associate = function (models) {

    Command.belongsTo(models.Client, { foreignKey: 'clientId' })
    Command.belongsTo(models.User, { foreignKey: 'userId' })
}

module.exports = Command