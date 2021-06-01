'use strict'

const { Model, DataTypes } = require('sequelize')

class Command extends Model { }

Command.initialize = function (sequelize) {
    Command.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        commandName: { type: DataTypes.TEXT, allowNull: false, unique: false },
        pending: { type: DataTypes.BOOLEAN, allowNull: false, unique: false },
        fk_client: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        fk_user: { type: DataTypes.INTEGER, allowNull: true, unique: false }////////////////////////:
    },
        {
            sequelize,
            modelName: 'Command',
            tableName: 'Commands'
        })
}

Command.associate = function (models) {

    Command.belongsTo(models.Client, { foreignKey: 'fk_client' })
    Command.belongsTo(models.User, { foreignKey: 'fk_user' })
}

module.exports = Command